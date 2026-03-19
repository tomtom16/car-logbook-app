import {Component, EventEmitter, Inject, LOCALE_ID, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {Message} from 'primeng/message';
import {Gasoline, Vehicle, VehiclePower} from "../../../api/car-logbook";
import {ApiService} from "../../../services/api.service";
import {Select} from "primeng/select";
import {InputNumber} from "primeng/inputnumber";
import {Checkbox} from "primeng/checkbox";
import {DatePickerModule} from "primeng/datepicker";
import {formatDate} from "@angular/common";
import {UpdateService} from "../../../services/update.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, Select, InputNumber, Checkbox, DatePickerModule],
    templateUrl: './create-vehicle.component.html',
    styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent {
    gasolineOptions: any[] = [];
    make = '';
    model = '';
    yearOfConstruction: Date | undefined;
    licensePlate: string = '';
    powerKw: number | null = null;
    gasoline: any;
    photo: string = '';
    primary: boolean = false;

    error = '';

    constructor(
        private router: Router,
        private apiService: ApiService,
        private refreshService: UpdateService,
        @Inject(LOCALE_ID) private locale: string
    ) {
        (Object.keys(Gasoline) as Array<keyof typeof Gasoline>).forEach(key => {
            let option: any = {label: key, value: Gasoline[key]};
            console.log(option);
            this.gasolineOptions.push(option);
        });
    }

    parseGasoline(value: string): Gasoline {
        if (Object.values(Gasoline).includes(value as Gasoline)) {
            return value as Gasoline;
        }
        throw new Error(`Invalid Gasoline value: ${value}`);
    }

    onCreate() {
        let power: VehiclePower | undefined = undefined;
        if (this.powerKw != null) {
            power = {kw: this.powerKw}
        }
        let yoc: string | undefined;
        if (!!this.yearOfConstruction) {
            yoc = formatDate(this.yearOfConstruction,'yyyy-MM-dd',this.locale);
        }

        let vehicle: Vehicle = {
            make: this.make,
            model: this.model,
            yearOfConstruction: yoc,
            licensePlate: this.licensePlate,
            power: power,
            gasoline: this.parseGasoline(this.gasoline.value),
            photo: this.photo,
            primary: this.primary
        };

        for (let key in vehicle) {
            console.log(`${key}: ${(vehicle as any)[key]}`);
        }

        for (let key in vehicle.power) {
            console.log(`${key}: ${(vehicle.power as any)[key]}`);
        }

        console.log(`gasoline: ${this.gasoline}`);

        this.apiService.createVehicle(vehicle).subscribe({
            next: (res) => {
                console.log(res);
                this.refreshService.triggerDashboardRefresh();
                this.router.navigate(['/dashboard']);
            },
            error: () => {
                this.error = 'Error creating vehicle';
            }
        });
    }

    onHome() {
        this.router.navigate(['/']);
    }
}
