import { Component, Input } from '@angular/core';
import { LogbookFuelEntry } from '../../../api/car-logbook';
import { Card } from 'primeng/card';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-logbookfuelentry',
  imports: [Card, DatePipe],
  templateUrl: './logbookfuelentry.component.html',
  styleUrl: './logbookfuelentry.component.css',
})
export class LogbookfuelentryComponent {
  dateFormat = 'dd.MM.yyyy hh:mm Z';

  @Input() data: LogbookFuelEntry = {};

  constructor() {}
}
