import {Component, Input, OnChanges} from "@angular/core";
import {UIChart} from "primeng/chart";
import {DatePipe} from "@angular/common";
import {Card} from "primeng/card";
import {LogbookFuelEntry} from "@app/api/car-logbook";
import {APP_CONSTANTS} from "@app/app.constants";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";

@Component({
    selector: "app-consumption-chart",
    imports: [
        UIChart,
        Card,
        Select,
        FormsModule
    ],
    providers: [DatePipe],
    templateUrl: "./consumption-chart.component.html",
    styleUrl: "./consumption-chart.component.css",
})
export class ConsumptionChartComponent implements OnChanges {

    @Input() entries: LogbookFuelEntry[] = [];

    chartData: any;
    chartOptions: any;

    entriesOptions: any;
    selectedEntriesOption: any;

    constructor(private datePipe: DatePipe) {
    }

    ngOnChanges() {
        if (!this.entries || this.entries.length === 0) return;

        this.entriesOptions = [
            {label: '5 entries', value: 5},
            {label: '10 entries', value: 10},
            {label: '20 entries', value: 20},
            {label: '50 entries', value: 50},
            {label: 'all entries', value: 0},
        ];

        this.selectedEntriesOption = this.entriesOptions[1];

        this.setChartData();
    }

    setChartData() {
        let unit = this.entries[0].unit;

        const sorted = [...this.entries].filter(e => !!e.averageConsumption && !!e.averageConsumption.per100km ).reverse();

        const filtered = this.selectedEntriesOption.value > 0 ? sorted.slice(sorted.length - this.selectedEntriesOption.value, sorted.length) : sorted;

        const labels = filtered.map(e =>
            this.datePipe.transform(e.date, APP_CONSTANTS.MISC.DATEFORMAT_SIMPLE)
        );

        const data = filtered.map(e =>
            e.averageConsumption?.per100km ?? 0
        );

        const avg =
            data.reduce((a, b) => a + b, 0) / data.length;

        this.chartData = {
            labels,
            datasets: [
                {
                    label: `Consumption (${unit}/100km)`,
                    data,
                    fill: false,
                    tension: 0.3,
                    borderColor: '#3b82f6'
                },
                {
                    label: 'Average',
                    data: Array(data.length).fill(avg),
                    borderDash: [5, 5]
                }
            ],
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx: any) => `${ctx.raw} ${unit}/100km`
                    }
                }
            }
        };

        this.chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: `${unit}/100km`
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        };
    }

    onChange(event: any) {
        this.setChartData();
    }
}