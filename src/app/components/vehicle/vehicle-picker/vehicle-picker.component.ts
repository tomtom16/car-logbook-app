import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '@app/services/api.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Message} from 'primeng/message';
import {FormsModule} from '@angular/forms';
import {Select} from 'primeng/select';
import {Vehicle} from '@app/api/car-logbook';
import {Subscription} from "rxjs";
import {UpdateService} from "@app/services/update.service";
import {APP_CONSTANTS} from "@app/app.constants";

@Component({
    selector: 'app-vehicle-picker',
    imports: [ProgressSpinner, Message, FormsModule, Select],
    templateUrl: './vehicle-picker.component.html',
    styleUrl: './vehicle-picker.component.css',
})
export class VehiclePickerComponent implements OnInit {
    options: any[] = [];
    selectedOption: any;

    noVehicles: boolean = false;
    oneVehicle: boolean = false;
    multipleVehicles: boolean = false;

    loading = true;
    error = '';

    private sub!: Subscription;

    @Output() selectionChange = new EventEmitter<any>();

    constructor(
        private apiService: ApiService,
        private cdr: ChangeDetectorRef,
        private refreshService: UpdateService,
    ) {
    }

    ngOnInit(): void {
        this.loadOptions();

        this.sub = this.refreshService.newVehicleCreated$.subscribe(() => {
            this.loadOptions();
        });
    }

    loadOptions() {
        this.loading = true;

        this.apiService.getVehicles().subscribe({
            next: (res) => {
                this.setVehicleStatus(res);

                if (!!res) {
                    this.options = res.map((item: Vehicle) => ({
                        label: `${item.make} ${item.model} (${item.licensePlate})`,
                        value: item.id,
                    }));

                    let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID);
                    if (currentVehicleId != null) {
                        this.selectedOption = this.options.find((o) => o.value === currentVehicleId);
                    }
                }

                this.loading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.error = 'Failed to load vehicles';
                this.loading = false;
            },
        });
    }

    setVehicleStatus(vehicles: Vehicle[]) {
        this.noVehicles = false;
        this.oneVehicle = false;
        this.multipleVehicles = false;

        if (vehicles === undefined || vehicles.length == 0) {
            this.noVehicles = true;
        } else if (!!vehicles && vehicles.length == 1) {
            this.oneVehicle = true;
        } else {
            this.multipleVehicles = true;
        }
    }

    onChange(value: any) {
        localStorage.setItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID, value.value);
        this.refreshService.triggerCurrentVehicleIdChanged(value.value);
    }
}
