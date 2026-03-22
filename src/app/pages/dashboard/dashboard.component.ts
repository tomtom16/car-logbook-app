import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { VehicleDetailsComponent } from '../../components/vehicle/vehicle-details/vehicle-details.component';
import { Vehicle } from '../../api/car-logbook';
import { LogbookentryComponent } from '../../components/logbook/logbookentry/logbookentry.component';
import { LogbookfuelentryComponent } from '../../components/logbook/logbookfuelentry/logbookfuelentry.component';
import { Observable, Subscription } from 'rxjs';
import { UpdateService } from '../../services/update.service';
import {APP_CONSTANTS} from "../../app.constants";

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
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
    private refreshService: UpdateService
  ) {}

  ngOnInit() {
    this.username = this.auth.getUsername();
    this.loadData();

    this.sub = this.refreshService.currentVehicleIdChanged$.subscribe(() => {
      console.log('Current vehicle id has changed, loading data!');
      this.loadData();
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

        if (!!res && res.id != null) {
          localStorage.setItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID, res.id);
        }

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
}
