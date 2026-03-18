import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../../api/car-logbook';
import { Card } from 'primeng/card';
import { Badge } from 'primeng/badge';

@Component({
  selector: 'app-vehicle-details',
  imports: [Card, Badge],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css',
})
export class VehicleDetailsComponent implements OnInit {
  @Input() data: Vehicle = {};

  constructor() {}

  ngOnInit(): void {}
}
