import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

import {AuthService} from '../../services/auth.service';
import {VehiclePickerComponent} from '../../components/vehicle/vehicle-picker/vehicle-picker.component';
import {SidebarService} from "../../services/sidebar.service";
import {APP_CONSTANTS} from "../../app.constants";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [ToolbarModule, ButtonModule, VehiclePickerComponent],
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
