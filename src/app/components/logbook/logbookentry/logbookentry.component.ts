import { Component, Input } from '@angular/core';
import { LogbookEntry, Vehicle } from '../../../api/car-logbook';
import { Card } from 'primeng/card';
import { DateService } from '../../../services/date.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-logbookentry',
  imports: [Card, DatePipe],
  templateUrl: './logbookentry.component.html',
  styleUrl: './logbookentry.component.css',
})
export class LogbookentryComponent {
  dateFormat= 'dd.MM.yyyy hh:mm Z';

  @Input() data: LogbookEntry = {};

  constructor(protected dateService: DateService) {}
}
