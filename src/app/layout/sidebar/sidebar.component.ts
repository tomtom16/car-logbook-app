import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import {Badge} from "primeng/badge";
import {SidebarService} from "../../services/sidebar.service";
import {MenuItem} from "primeng/api";
import {APP_CONSTANTS} from "../../app.constants";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, PanelMenuModule, Badge],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

    CONSTANTS = APP_CONSTANTS;

    constructor(public sidebarService: SidebarService) {
    }

    menu: MenuItem[] = [
        {label: 'Dashboard', icon: 'pi pi-home', routerLink: this.CONSTANTS.ROUTES.DASHBOARD},
        {
            label: 'Vehicles', icon: 'pi pi-car', routerLink: this.CONSTANTS.ROUTES.VEHICLES.LIST, children: [
                {
                    label: 'List Vehicles',
                    icon: 'pi pi-list',
                    routerLink: this.CONSTANTS.ROUTES.VEHICLES.LIST
                },
                {
                    label: 'Create Vehicle',
                    icon: 'pi pi-plus',
                    routerLink: this.CONSTANTS.ROUTES.VEHICLES.CREATE
                }
            ]
        },
        {
            label: 'Logbook',
            icon: 'pi pi-book',
            routerLink: this.CONSTANTS.ROUTES.LOGBOOK.LIST,
            //badge: '2',
            children: [
                {
                    label: 'Logbook Details',
                    icon: 'pi pi-list',
                    routerLink: this.CONSTANTS.ROUTES.LOGBOOK.LIST,
                },
                {
                    label: 'Create Entry',
                    icon: 'pi pi-plus',
                    routerLink: this.CONSTANTS.ROUTES.LOGBOOK.CREATE,
                }
            ]
        },
        {
            label: 'Refueling',
            icon: 'pi pi-cart-arrow-down',
            routerLink: this.CONSTANTS.ROUTES.REFUELING.LIST,
            children: [
                {
                    label: 'Fuel History',
                    icon: 'pi pi-list',
                    routerLink: this.CONSTANTS.ROUTES.REFUELING.LIST
                },
                {
                    label: 'Create Fuel Entry',
                    icon: 'pi pi-plus',
                    routerLink: this.CONSTANTS.ROUTES.REFUELING.CREATE
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
