import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {AuthService} from '@app/services/auth.service';
import {ApiService} from '@app/services/api.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Message} from 'primeng/message';
import {CommonModule} from '@angular/common';
import {VehicleDetailsComponent} from '@app/components/vehicle/vehicle-details/vehicle-details.component';
import {LogbookFuelEntry, Vehicle} from '@app/api/car-logbook';
import {LogbookentryComponent} from '@app/components/logbook/logbookentry/logbookentry.component';
import {LogbookfuelentryComponent} from '@app/components/logbook/logbookfuelentry/logbookfuelentry.component';
import {Observable, Subscription} from 'rxjs';
import {UpdateService} from '@app/services/update.service';
import {APP_CONSTANTS} from "@app/app.constants";
import {VehicleImageComponent} from "@app/components/vehicle/vehicle-image/vehicle-image.component";
import {VehicleImageUploadComponent} from "@app/components/vehicle/vehicle-image-upload/vehicle-image-upload.component";
import {ConsumptionChartComponent} from "@app/components/charts/consumption-chart/consumption-chart.component";
import {PriceChartComponent} from "@app/components/charts/price-chart/price-chart.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        ProgressSpinner,
        Message,
        CommonModule,
        VehicleDetailsComponent,
        LogbookentryComponent,
        LogbookfuelentryComponent,
        ConsumptionChartComponent,
        PriceChartComponent,
        VehicleImageComponent,
        VehicleImageUploadComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

    fuelEntries: LogbookFuelEntry[] = [];
    vehicleImage: Blob | undefined;

    username: string = '';
    currentVehicleText: string = '';
    currentVehicle: Vehicle | null = null;
    noVehiclesYet: boolean = false;

    loading = true;
    error = '';

    private sub!: Subscription;

    constructor(
        private auth: AuthService,
        private apiService: ApiService,
        private cdr: ChangeDetectorRef,
        private refreshService: UpdateService,
    ) {
    }

    ngOnInit() {
        this.username = this.auth.getUsername();
        this.loadData();
        this.cdr.detectChanges();

        this.sub = this.refreshService.currentVehicleIdChanged$.subscribe(() => {
            console.log('Current vehicle id has changed, loading data!');
            this.loadData();
            this.cdr.detectChanges();
        });
    }

    loadData() {
        this.loading = true;

        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID);
        let currentVehicleObs: Observable<Vehicle>;

        if (currentVehicleId != null) {
            currentVehicleObs = this.apiService.getVehicle(currentVehicleId);
        } else {
            currentVehicleObs = this.apiService.getPrimaryVehicle();
        }

        currentVehicleObs.subscribe({
            next: (res) => {
                this.loading = false;
                this.currentVehicle = res;
                this.currentVehicleText = !!res ? `${res.make} ${res.model}` : '';
                console.log(this.currentVehicle);
                console.log(this.currentVehicleText);

                if (!!res && res.id != null && res.id != currentVehicleId) {
                    localStorage.setItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID, res.id);
                    this.refreshService.triggerCurrentVehicleIdChanged(res.id);
                }

                this.loadPhoto();
                this.loadFuelEntries();
                this.cdr.detectChanges();

            },
            complete: () => {
                if (!this.currentVehicle) {
                    this.noVehiclesYet = true;
                    this.cdr.detectChanges();
                }
            },
            error: () => {
                this.loading = false;
                this.error = 'Failed to load primary vehicle data';
                console.log(this.error);
            },
        });
    }

    loadFuelEntries() {
        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID);

        if (currentVehicleId != null) {
            this.apiService.getLogbookFuelEntries(currentVehicleId).subscribe({
                next: (res) => {
                    if (!!res && !!res.entries) {
                        this.fuelEntries = res.entries;
                    }
                    this.cdr.detectChanges();
                },
                complete: () => {
                    this.cdr.detectChanges();
                },
                error: () => {
                    console.log('error loading average consumption entries');
                }
            });
        } else {
            console.log('current vehicle id is null - not loading fuel entries');
        }
    }

    loadPhoto() {
        if (!!this.currentVehicle && !!this.currentVehicle.id && !!this.currentVehicle.photo) {
            this.apiService.getVehiclePhoto(this.currentVehicle.id).subscribe({
                next: (res) => {
                    this.vehicleImage = res;
                    this.cdr.detectChanges();
                },
                error: () => {
                    console.log('error loading vehicle photo');
                }
            })
        } else {
            console.log("current vehicle not set or no current vehicle id or no current vehicle photo");
            console.log("resetting vehicle photo");
            this.vehicleImage = undefined;
        }
    }

    onUploadConfirmed(file: File) {
        this.uploadImage(file);
    }

    uploadImage(file: File) {
        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID) as string;
        if (!!currentVehicleId) {
            this.apiService.setVehiclePhoto(currentVehicleId, file).subscribe({
                next: (res) => {
                    console.log('Upload success');
                    this.loadData();
                },
                error: () => {
                    console.log('Upload failed');
                }
            })
        }
    }

    onDeletePhoto(event: any) {
        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID) as string;
        if (!!currentVehicleId) {
            this.apiService.deleteVehiclePhoto(currentVehicleId).subscribe({
                next: (res) => {
                    console.log('Photo deleted successfully');
                    this.loadData();
                },
                error: () => {
                    console.log('Failed to delete vehicle photo');
                }
            })
        }
    }
}
