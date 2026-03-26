import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {LogbookFuelEntry, SortDirection} from "../../../../api/car-logbook";
import {TableModule} from "primeng/table";
import {DatePipe, DecimalPipe} from "@angular/common";
import {APP_CONSTANTS} from "../../../../app.constants";
import {UpdateService} from "../../../../services/update.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, DatePickerModule, TableModule, DatePipe, DecimalPipe],
    templateUrl: './list-logbook-fuel-entries.component.html',
    styleUrls: ['./list-logbook-fuel-entries.component.css'],
})
export class ListLogbookFuelEntriesComponent implements OnInit {
    CONSTANTS = APP_CONSTANTS;
    entries!: LogbookFuelEntry[];

    error = '';

    first: number = 0;
    rows: number = 10;
    total: number = 0;

    private newLogbookFuelEntrySub!: Subscription;
    private currentVehicleIdChangedSub!: Subscription;

    constructor(
        private apiService: ApiService,
        private refreshService: UpdateService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.loadData();

        this.newLogbookFuelEntrySub = this.refreshService.newLogbookFuelEntryCreated$.subscribe(() => {
            this.loadData();
        });

        this.currentVehicleIdChangedSub = this.refreshService.currentVehicleIdChanged$.subscribe(() => {
            this.loadData();
        })
    }

    loadData() {
        this.pageChange({first: 0, rows: this.rows});
    }

    pageChange(event: any) {
        console.log(event);
        this.first = event.first;
        this.rows = event.rows;

        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID) as string;
        const page = event.first / event.rows; // 0-based page index
        const limit = event.rows;

        this.apiService.getLogbookFuelEntriesPaginated(currentVehicleId, page, limit, 'mileage', SortDirection.Desc, undefined).subscribe({
            next: (res) => {
                if (!!res && !!res.entries) {
                    this.entries = res.entries;
                }
                if (!!res && !!res.results) {
                    this.total = res.results;
                }
                this.cdr.detectChanges();
            },
            error: () => {
                console.log('error loading fuel entries paginated');
            }
        });
    }
}