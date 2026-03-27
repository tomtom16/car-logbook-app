import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import {Badge} from "primeng/badge";
import {SidebarService} from "@app/services/sidebar.service";
import {MenuItem} from "primeng/api";
import {APP_CONSTANTS} from "@app/app.constants";
import {UpdateService} from "@app/services/update.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, PanelMenuModule, Badge],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

    disablePages: boolean = false;

    private sub!: Subscription;

    constructor(private refreshService: UpdateService,
                public sidebarService: SidebarService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.checkDisablesPages();

        this.sub = this.refreshService.newVehicleCreated$.subscribe(() => {
            console.log('Vehicle created, need to enable pages!');
            this.checkDisablesPages();
        });

        this.sub = this.refreshService.currentVehicleIdChanged$.subscribe(() => {
            console.log('Vehicle changed, need to enable pages!');
            this.checkDisablesPages();
        });
    }

    checkDisablesPages() {
        let currentVehicleId = localStorage.getItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID);
        this.disablePages = currentVehicleId == null;
        this.cdr.detectChanges();
    }

    menu: MenuItem[] = [
        {label: 'Dashboard', icon: 'pi pi-home', routerLink: APP_CONSTANTS.ROUTES.DASHBOARD},
        {
            label: 'Vehicles', icon: 'pi pi-car', routerLink: APP_CONSTANTS.ROUTES.VEHICLES.LIST, children: [
                {
                    label: 'List Vehicles',
                    icon: 'pi pi-list',
                    routerLink: APP_CONSTANTS.ROUTES.VEHICLES.LIST
                },
                {
                    label: 'Create Vehicle',
                    icon: 'pi pi-plus',
                    routerLink: APP_CONSTANTS.ROUTES.VEHICLES.CREATE
                }
            ]
        },
        {
            label: 'Logbook',
            icon: 'pi pi-book',
            routerLink: APP_CONSTANTS.ROUTES.LOGBOOK.LIST,
            //badge: '2',
            children: [
                {
                    label: 'Logbook Details',
                    icon: 'pi pi-list',
                    routerLink: APP_CONSTANTS.ROUTES.LOGBOOK.LIST,
                },
                {
                    label: 'Create Entry',
                    icon: 'pi pi-plus',
                    routerLink: APP_CONSTANTS.ROUTES.LOGBOOK.CREATE,
                }
            ]
        },
        {
            label: 'Refueling',
            icon: 'pi pi-cart-arrow-down',
            routerLink: APP_CONSTANTS.ROUTES.REFUELING.LIST,
            children: [
                {
                    label: 'Fuel History',
                    icon: 'pi pi-list',
                    routerLink: APP_CONSTANTS.ROUTES.REFUELING.LIST
                },
                {
                    label: 'Create Fuel Entry',
                    icon: 'pi pi-plus',
                    routerLink: APP_CONSTANTS.ROUTES.REFUELING.CREATE
                }
            ]
        },
        {
            label: 'Random Dashboard',
            icon: 'pi pi-arrow-right',
            routerLink: 'random-dashboard'
        }
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
