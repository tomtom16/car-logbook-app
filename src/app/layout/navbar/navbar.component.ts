import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth.service';
import { VehiclePickerComponent } from '../../components/vehicle/vehicle-picker/vehicle-picker.component';
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, VehiclePickerComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string | null = '';

  @Output() selectionChange = new EventEmitter<any>();

  constructor(
    private auth: AuthService,
    private router: Router,
    public sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.username = this.auth.getUsername();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  onSelectionChange(value: any) {
    console.log('Selected value:', value);
    console.log('Selected id: ', value.value);
    localStorage.setItem('currentVehicleId', value.value);
    this.selectionChange.emit(value);
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
