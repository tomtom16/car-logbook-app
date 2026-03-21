import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {Message} from 'primeng/message';
import {InputNumber} from "primeng/inputnumber";
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {UpdateService} from "../../../../services/update.service";
import {formatDate} from "@angular/common";
import {LogbookEntry} from "../../../../api/car-logbook";
import {APP_CONSTANTS} from "../../../../app.constants";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, InputNumber, DatePickerModule],
    templateUrl: './create-logbook-entry.component.html',
    styleUrls: ['./create-logbook-entry.component.css'],
})
export class CreateLogbookEntryComponent implements OnInit {
    hourFormat: string = "24";
    startDate: Date = new Date();
    endDate: Date = new Date();
    kmStart: number | undefined;
    kmEnd: number | undefined;
    trip: number | undefined;
    route: string = '';
    comment: string = '';
    error = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private refreshService: UpdateService,
        @Inject(LOCALE_ID) private locale: string
    ) {}

    ngOnInit(): void {
        let currentVehicleId = localStorage.getItem('currentVehicleId') as string;
        this.apiService.getVehicle(currentVehicleId).subscribe({
            next: (res) => {
                console.log(res);
                if (!!res.currentMileage) {
                    this.kmStart = res.currentMileage;
                }
            },
            error: () => {
                console.log('Error loading current vehicle');
            }
        });

    }

    onCreate() {
        let vehicleId = localStorage.getItem('currentVehicleId') as string;

        let entryStartDate: string | undefined;
        if (!!this.startDate) {
            entryStartDate = formatDate(this.startDate, 'yyyy-MM-ddTHH:mm:ssZ', this.locale);
        }

        let entryEndDate: string | undefined;
        if (!!this.startDate) {
            entryEndDate = formatDate(this.endDate, 'yyyy-MM-ddTHH:mm:ssZ', this.locale);
        }

        let logbookEntry: LogbookEntry = {
            vehicle: vehicleId,
            startDate: entryStartDate,
            endDate: entryEndDate,
            kmStart: this.kmStart,
            kmEnd: this.kmEnd,
            trip: this.trip,
            route: this.route,
            comment: this.comment
        };

        this.apiService.createLogbookEntry(vehicleId, logbookEntry).subscribe({
            next: (res) => {
                //console.log(res);
                this.refreshService.triggerNewLogbookEntryCreated(res);
                this.router.navigate([APP_CONSTANTS.ROUTES.LOGBOOK.LIST]);
            },
            error: () => {
                this.error = 'Error creating logbook entry';
            }
        });
    }

    onHome() {
        this.router.navigate([APP_CONSTANTS.ROUTES.HOME]);
    }
}
