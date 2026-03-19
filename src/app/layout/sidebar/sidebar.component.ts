import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  items = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Vehicles', icon: 'pi pi-car', routerLink: '/vehicle', items: [
        {
          label: 'Create Vehicle',
          icon: 'pi pi-plus',
          routerLink: '/vehicle/create'
        }
      ] },
    { label: 'Logbook', icon: 'pi pi-book', routerLink: '/page-one' },
    { label: 'Refueling', icon: 'pi pi-cart-arrow-down', routerLink: '/page-two' },
  ];
}
