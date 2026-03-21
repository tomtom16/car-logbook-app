import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {

    constructor() {
    }

}
