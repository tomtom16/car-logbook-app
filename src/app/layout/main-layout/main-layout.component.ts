import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {

  constructor(private refreshService: UpdateService) {
  }

  onSelectionChange(value: any) {
    console.log(value);
    localStorage.setItem('currentVehicleId', value.value);
    this.refreshService.triggerDashboardRefresh();
  }

}
