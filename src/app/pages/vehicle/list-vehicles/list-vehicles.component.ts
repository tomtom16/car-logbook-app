import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePickerModule} from "primeng/datepicker";
import {TableModule} from "primeng/table";
import {DatePipe, DecimalPipe} from "@angular/common";
import {Subscription} from "rxjs";
import {Gasoline, Vehicle} from "../../../api/car-logbook";
import {APP_CONSTANTS} from "../../../app.constants";
import {ApiService} from "../../../services/api.service";
import {UpdateService} from "../../../services/update.service";
import {Checkbox} from "primeng/checkbox";
import {Badge} from "primeng/badge";
import {BadgeService, BadgeSeverity} from "../../../services/badge.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, DatePickerModule, TableModule, Checkbox, Badge],
    templateUrl: './list-vehicles.component.html',
    styleUrls: ['./list-vehicles.component.css'],
})
export class ListVehiclesComponent implements OnInit {
    CONSTANTS = APP_CONSTANTS;
    vehicles!: Vehicle[];

    error = '';

    private newVehicleCreated!: Subscription;

    constructor(
        private apiService: ApiService,
        public badgeService: BadgeService,
        private refreshService: UpdateService,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.loadData();

        this.newVehicleCreated = this.refreshService.newVehicleCreated$.subscribe(() => {
            this.loadData();
        });

    }

    loadData() {
        this.apiService.getVehicles().subscribe({
            next: (res) => {
                console.log(res);
                this.vehicles = res;
                this.cdr.detectChanges();
            },
            error: () => {
                this.error = 'Error loading logbook entries';
            }
        });
    }
}