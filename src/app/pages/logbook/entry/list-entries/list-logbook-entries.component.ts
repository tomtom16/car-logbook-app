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
    currentVehicleId: string;
    entries!: LogbookEntry[];

    error = '';

    private sub!: Subscription;

    constructor(
        private apiService: ApiService,
        private refreshService: UpdateService,
        private cdr: ChangeDetectorRef
    ) {
        this.currentVehicleId = localStorage.getItem('currentVehicleId') as string;
    }

    ngOnInit(): void {
        this.loadData();

        this.sub = this.refreshService.refreshDashboard$.subscribe(() => {
            this.loadData();
        });
    }

    loadData() {
        this.apiService.getLogbookEntries(this.currentVehicleId).subscribe({
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
