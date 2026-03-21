import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {LogbookEntry} from "../../../../api/car-logbook";
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
        let currentVehicleId = localStorage.getItem('currentVehicleId') as string;
        this.apiService.getLogbookEntries(currentVehicleId).subscribe({
            next: (res) => {
                console.log(res);
                this.entries = res;
                this.cdr.detectChanges();
            },
            error: () => {
                this.error = 'Error creating logbook entry';
            }
        });
    }

}
