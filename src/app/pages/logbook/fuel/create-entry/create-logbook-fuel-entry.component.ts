import {Component, Inject, LOCALE_ID} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {Message} from 'primeng/message';
import {Select} from "primeng/select";
import {InputNumber} from "primeng/inputnumber";
import {DatePickerModule} from "primeng/datepicker";
import {ApiService} from "../../../../services/api.service";
import {UpdateService} from "../../../../services/update.service";
import {LogbookFuelEntry, LogbookFuelEntryPrice} from "../../../../api/car-logbook";
import {formatDate} from "@angular/common";
import {APP_CONSTANTS} from "../../../../app.constants";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, Select, InputNumber, DatePickerModule],
    templateUrl: './create-logbook-fuel-entry.component.html',
    styleUrls: ['./create-logbook-fuel-entry.component.css'],
})
export class CreateLogbookFuelEntryComponent {
    hourFormat: string = "24";
    unitOptions: any[] = [];
    date: Date = new Date();
    mileage: number | undefined;
    trip: number | undefined;
    units: number | undefined;
    unit: any = {label: 'Liter', value: 'LITER'};
    comment: string = '';
    totalPrice: number | null = null;

    error = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private refreshService: UpdateService,
        @Inject(LOCALE_ID) private locale: string
    ) {
        (Object.keys(LogbookFuelEntry.UnitEnum) as Array<keyof typeof LogbookFuelEntry.UnitEnum>).forEach(key => {
            let option: any = {label: key, value: LogbookFuelEntry.UnitEnum[key]};
            console.log(option);
            this.unitOptions.push(option);
        });
    }

    parseUnit(value: string): LogbookFuelEntry.UnitEnum {
        if (Object.values(LogbookFuelEntry.UnitEnum).includes(value as LogbookFuelEntry.UnitEnum)) {
            return value as LogbookFuelEntry.UnitEnum;
        }
        throw new Error(`Invalid Gasoline value: ${value}`);
    }

    onCreate() {
        let vehicleId = localStorage.getItem('currentVehicleId') as string;

        let entryDate: string | undefined;
        if (!!this.date) {
            entryDate = formatDate(this.date, 'yyyy-MM-ddTHH:mm:ssZ', this.locale);
            console.log(entryDate);
        }

        let price: LogbookFuelEntryPrice | undefined = undefined;
        if (this.totalPrice != null) {
            price = {
                total: this.totalPrice
            }
        }

        let logbookFuelEntry: LogbookFuelEntry = {
            date: entryDate,
            mileage: this.mileage,
            trip: this.trip,
            units: this.units,
            unit: this.parseUnit(this.unit.value),
            price: price,
            comment: this.comment
        };

        this.apiService.createLogbookFuelEntry(vehicleId, logbookFuelEntry).subscribe({
            next: (res) => {
                //console.log(res);
                this.refreshService.triggerNewLogbookFuelEntryCreated(res);
                this.router.navigate([APP_CONSTANTS.ROUTES.REFUELING.LIST]);
            },
            error: () => {
                this.error = 'Error creating logbook fuel entry';
            }
        });
    }

    onHome() {
        this.router.navigate([APP_CONSTANTS.ROUTES.HOME]);
    }
}
