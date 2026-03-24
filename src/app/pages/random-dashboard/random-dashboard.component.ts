import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Message} from 'primeng/message';
import {CommonModule} from '@angular/common';
import {VehicleDetailsComponent} from '../../components/vehicle/vehicle-details/vehicle-details.component';
import {LogbookFuelEntry, Vehicle} from '../../api/car-logbook';
import {LogbookentryComponent} from '../../components/logbook/logbookentry/logbookentry.component';
import {LogbookfuelentryComponent} from '../../components/logbook/logbookfuelentry/logbookfuelentry.component';
import {Observable, Subscription} from 'rxjs';
import {UpdateService} from '../../services/update.service';
import {APP_CONSTANTS} from "../../app.constants";
import {VehicleImageComponent} from "../../components/vehicle/vehicle-image/vehicle-image.component";
import {
    VehicleImageUploadComponent
} from "../../components/vehicle/vehicle-image-upload/vehicle-image-upload.component";
import {ConsumptionChartComponent} from "../../components/charts/consumption-chart/consumption-chart.component";
import {PriceChartComponent} from "../../components/charts/price-chart/price-chart.component";
import {TagModule} from "primeng/tag";
import {ProgressBarModule} from "primeng/progressbar";
import {BadgeSeverity} from "../../services/badge.service";
import {UIChart} from "primeng/chart";

@Component({
    selector: 'app-random-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        TagModule,
        ProgressBarModule,
        UIChart
    ],
    templateUrl: './random-dashboard.component.html',
    styleUrls: ['./random-dashboard.component.css'],
})
export class RandomDashboardComponent {

    stats = [
        { title: 'Total Vehicles', value: 12, icon: 'pi pi-car', severity: 'info' },
        { title: 'Fuel Entries', value: 248, icon: 'pi pi-database', severity: 'success' },
        { title: 'Avg Consumption', value: '5.4 L/100km', icon: 'pi pi-chart-line', severity: 'warn' },
        { title: 'Monthly Cost', value: '€320', icon: 'pi pi-euro', severity: 'danger' }
    ] as const;

    activities = [
        { text: 'Refueled BMW 320d', time: '2h ago' },
        { text: 'Added new vehicle', time: '1 day ago' },
        { text: 'Updated mileage', time: '3 days ago' }
    ];

    chartData: any;
    chartOptions: any;

    ngOnInit() {
        this.initChart();
    }

    initChart() {
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

        const randomData = labels.map(() => Math.floor(Math.random() * 100));

        this.chartData = {
            labels,
            datasets: [
                {
                    label: 'Random Data',
                    data: randomData
                }
            ]
        };

        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
    }

}
