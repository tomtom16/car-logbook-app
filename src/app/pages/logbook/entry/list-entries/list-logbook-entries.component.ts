import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {LogbookEntry} from "../../../../api/car-logbook";
import {TableModule} from "primeng/table";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, DatePickerModule, TableModule],
    templateUrl: './list-logbook-entries.component.html',
    styleUrls: ['./list-logbook-entries.component.css'],
})
export class ListLogbookEntriesComponent implements OnInit {
    currentVehicleId: string;
    entries!: LogbookEntry[];

    error = '';

    constructor(
        private apiService: ApiService,
        private cdr: ChangeDetectorRef
    ) {
        this.currentVehicleId = localStorage.getItem('currentVehicleId') as string;
    }

    ngOnInit(): void {
        this.loadData();
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
