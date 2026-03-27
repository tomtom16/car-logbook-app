import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

import {AuthService} from '@app/services/auth.service';
import {VehiclePickerComponent} from '@app/components/vehicle/vehicle-picker/vehicle-picker.component';
import {SidebarService} from "@app/services/sidebar.service";
import {APP_CONSTANTS} from "@app/app.constants";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [ToolbarModule, ButtonModule, VehiclePickerComponent, AsyncPipe],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    username: string | null = '';

    constructor(
        private auth: AuthService,
        private router: Router,
        public sidebarService: SidebarService
    ) {
    }

    ngOnInit() {
        this.username = this.auth.getUsername();
    }

    logout() {
        this.auth.logout();
        this.router.navigate([APP_CONSTANTS.ROUTES.HOME]);
    }

    toggleSidebar() {
        this.sidebarService.toggle();
    }
}
