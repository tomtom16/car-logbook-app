import {Component, Input, OnChanges} from "@angular/core";
import {UIChart} from "primeng/chart";
import {DatePipe} from "@angular/common";
import {Card} from "primeng/card";
import {LogbookFuelEntry} from "../../../api/car-logbook";
import {APP_CONSTANTS} from "../../../app.constants";

@Component({
    selector: "app-price-chart",
    imports: [
        UIChart,
        Card
    ],
    providers: [DatePipe],
    templateUrl: "./price-chart.component.html",
    styleUrl: "./price-chart.component.css",
})
export class PriceChartComponent implements OnChanges {

    @Input() entries: LogbookFuelEntry[] = [];

    chartData: any;
    chartOptions: any;

    constructor(private datePipe: DatePipe) {
    }

    ngOnChanges() {
        if (!this.entries || this.entries.length === 0) return;

        let unit = this.entries[0].unit;

        // IMPORTANT: reverse to chronological order
        const sorted = [...this.entries].filter(e => !!e.price && !!e.price.perUnit ).reverse();

        const labels = sorted.map(e =>
            this.datePipe.transform(e.date, APP_CONSTANTS.MISC.DATEFORMAT_SIMPLE)
        );

        const data = sorted.map(e =>
            e.price?.perUnit ?? 0
        );

        const avg =
            data.reduce((a, b) => a + b, 0) / data.length;

        this.chartData = {
            labels,
            datasets: [
                {
                    label: `Price (EUR/${unit})`,
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
                        label: (ctx: any) => `${ctx.raw} EUR/${unit}`
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
                        text: `EUR/${unit}`
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
}