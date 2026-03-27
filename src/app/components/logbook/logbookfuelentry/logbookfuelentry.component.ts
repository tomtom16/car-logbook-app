import { Component, Input } from '@angular/core';
import { LogbookFuelEntry } from '@app/api/car-logbook';
import { Card } from 'primeng/card';
import { DatePipe } from '@angular/common';
import {APP_CONSTANTS} from "@app/app.constants";

@Component({
  selector: 'app-logbookfuelentry',
  imports: [Card, DatePipe],
  templateUrl: './logbookfuelentry.component.html',
  styleUrl: './logbookfuelentry.component.css',
})
export class LogbookfuelentryComponent {
  CONSTANTS = APP_CONSTANTS;

  @Input() data: LogbookFuelEntry = {};

  constructor() {}
}
