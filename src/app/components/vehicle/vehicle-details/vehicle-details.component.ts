import {Component, Input, OnInit} from '@angular/core';
import {Vehicle} from '@app/api/car-logbook';
import {Card} from 'primeng/card';
import {Badge} from 'primeng/badge';
import {BadgeService} from "@app/services/badge.service";

@Component({
    selector: 'app-vehicle-details',
    imports: [Card, Badge],
    templateUrl: './vehicle-details.component.html',
    styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
    @Input() data: Vehicle = {};

    constructor(
        public badgeService: BadgeService
    ) {
    }

    ngOnInit(): void {
    }
}
