import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Vehicle } from '../../../api/car-logbook';
import {Subscription} from "rxjs";
import {UpdateService} from "../../../services/update.service";

@Component({
  selector: 'app-vehicle-picker',
  imports: [ProgressSpinner, Message, FormsModule, Select],
  templateUrl: './vehicle-picker.component.html',
  styleUrl: './vehicle-picker.component.css',
})
export class VehiclePickerComponent implements OnInit {
  options: any[] = [];
  selectedOption: any;

  loading = true;
  error = '';

  private sub!: Subscription;

  @Output() selectionChange = new EventEmitter<any>();

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private refreshService: UpdateService,
  ) {}

  ngOnInit(): void {
    this.loadOptions();

    this.sub = this.refreshService.refreshDashboard$.subscribe(() => {
      console.log('Dashboard refresh triggered!');
      this.loadOptions();
    });
  }

  loadOptions() {
    this.loading = true;

    this.apiService.getVehicles().subscribe({
      next: (res) => {
        this.options = res.map((item: Vehicle) => ({
          label: `${item.make} ${item.model} (${item.licensePlate})`,
          value: item.id,
        }));

        let currentVehicleId = localStorage.getItem('currentVehicleId');
        if (currentVehicleId != null) {
          this.selectedOption = this.options.find((o) => o.value === currentVehicleId);
        }

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load options';
        this.loading = false;
      },
    });
  }

  onChange(value: any) {
    this.selectionChange.emit(value);
  }
}
