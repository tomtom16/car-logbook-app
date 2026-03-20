import { Component, Input } from '@angular/core';
import { LogbookEntry, Vehicle } from '../../../api/car-logbook';
import { Card } from 'primeng/card';
import { DateService } from '../../../services/date.service';
import { DatePipe } from '@angular/common';
import {APP_CONSTANTS} from "../../../app.constants";

@Component({
  selector: 'app-logbookentry',
  imports: [Card, DatePipe],
  templateUrl: './logbookentry.component.html',
  styleUrl: './logbookentry.component.css',
})
export class LogbookentryComponent {
  CONSTANTS = APP_CONSTANTS;

  @Input() data: LogbookEntry = {};

  constructor(protected dateService: DateService) {}
}
