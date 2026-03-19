import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {LogbookFuelEntry} from "../../../../api/car-logbook";
import {TableModule} from "primeng/table";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, DatePickerModule, TableModule],
    templateUrl: './list-logbook-fuel-entries.component.html',
    styleUrls: ['./list-logbook-fuel-entries.component.css'],
})
export class ListLogbookFuelEntriesComponent implements OnInit {
    currentVehicleId: string;
    entries!: LogbookFuelEntry[];

    error = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        @Inject(LOCALE_ID) private locale: string
    ) {
        this.currentVehicleId = localStorage.getItem('currentVehicleId') as string;
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.apiService.getLogbookFuelEntries(this.currentVehicleId).subscribe({
            next: (res) => {
                console.log(res);
                this.entries = res;
            },
            error: () => {
                this.error = 'Error creating logbook entry';
            }
        });
    }

    onHome() {
        this.router.navigate(['/']);
    }
}
