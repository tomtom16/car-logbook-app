import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {LogbookFuelEntry} from "../../../../api/car-logbook";
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
        let currentVehicleId = localStorage.getItem('currentVehicleId') as string;
        this.apiService.getLogbookFuelEntries(currentVehicleId).subscribe({
            next: (res) => {
                console.log(res);
                this.entries = res;
                this.cdr.detectChanges();
            },
            error: () => {
                this.error = 'Error loading logbook entries';
            }
        });
    }
}