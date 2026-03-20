import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import {Badge} from "primeng/badge";
import {SidebarService} from "../../services/sidebar.service";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, PanelMenuModule, Badge],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

    constructor(public sidebarService: SidebarService) {
    }

    menu: MenuItem[] = [
        {label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard'},
        {
            label: 'Vehicles', icon: 'pi pi-car', routerLink: '/vehicle', children: [
                {
                    label: 'List Vehicles',
                    icon: 'pi pi-list',
                    routerLink: '/vehicle'
                },
                {
                    label: 'Create Vehicle',
                    icon: 'pi pi-plus',
                    routerLink: '/vehicle/create'
                }
            ]
        },
        {
            label: 'Logbook',
            icon: 'pi pi-book',
            routerLink: '/logbook',
            //badge: '2',
            children: [
                {
                    label: 'Logbook Details',
                    icon: 'pi pi-list',
                    routerLink: '/logbook'
                },
                {
                    label: 'Create Entry',
                    icon: 'pi pi-plus',
                    routerLink: '/logbook/create'
                }
            ]
        },
        {
            label: 'Refueling', icon: 'pi pi-cart-arrow-down', routerLink: '/logbook/fuel', children: [
                {
                    label: 'Fuel History',
                    icon: 'pi pi-list',
                    routerLink: '/logbook/fuel'
                },
                {
                    label: 'Create Fuel Entry',
                    icon: 'pi pi-plus',
                    routerLink: '/logbook/fuel/create'
                }
            ]
        },
    ];

    toggleGroup(clickedItem: MenuItem) {
        this.menu.forEach(item => {
            if (item !== clickedItem) {
                item.expanded = false;
            }
        });

        clickedItem.expanded = !clickedItem.expanded;
    }
}
