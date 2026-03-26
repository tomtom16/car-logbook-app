import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {LogbookEntry, SortDirection} from "../../../../api/car-logbook";
import {TableModule} from "primeng/table";
import {DatePipe, DecimalPipe} from "@angular/common";
import {APP_CONSTANTS} from "../../../../app.constants";
import {Subscription} from "rxjs";
import {UpdateService} from "../../../../services/update.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, DatePickerModule, TableModule, DatePipe, DecimalPipe],
    templateUrl: './list-logbook-entries.component.html',
    styleUrls: ['./list-logbook-entries.component.css'],
})
export class ListLogbookEntriesComponent implements OnInit {
    CONSTANTS = APP_CONSTANTS;
    entries!: LogbookEntry[];

    error = '';

    first: number = 0;
    rows: number = 10;
    total: number = 0;

    private newLogbookEntrySub!: Subscription;
    private currentVehicleIdChangedSub!: Subscription;

    constructor(
        private apiService: ApiService,
        private refreshService: UpdateService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadData();

        this.newLogbookEntrySub = this.refreshService.newLogbookEntryCreated$.subscribe(() => {
            this.loadData();
        });

        this.currentVehicleIdChangedSub = this.refreshService.currentVehicleIdChanged$.subscribe(() => {
            this.loadData();
        })
    }

    loadData() {
        this.pageChange({ first: 0, rows: this.rows });
    }

    pageChange(event: any) {
        console.log(event);
        this.first = event.first;
        this.rows = event.rows;

        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID) as string;
        const page = event.first / event.rows; // 0-based page index
        const limit = event.rows;

        this.apiService.getLogbookEntriesPaginated(currentVehicleId, page, limit, 'endTime', SortDirection.Desc, undefined).subscribe({
            next: (res) => {
                if (!!res && !! res.entries) {
                    this.entries = res.entries;
                }
                if (!!res && !!res.results) {
                    this.total = res.results;
                }
                this.cdr.detectChanges();
            },
            error: () => {
                console.log('error loading logbook entries paginated');
            }
        })
    }

}
