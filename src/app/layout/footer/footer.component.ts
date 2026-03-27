import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Toolbar} from "primeng/toolbar";

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, Toolbar],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

    currentYear = new Date().getFullYear();

}