import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {AuthService} from '@app/services/auth.service';
import {Message} from 'primeng/message';
import {Password} from 'primeng/password';
import {APP_CONSTANTS} from "@app/app.constants";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, Password],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    username = '';
    password = '';
    email = '';
    error = '';

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {
    }

    onRegister() {
        if (!this.username || !this.password || !! this.email) {
            this.error = 'Missing credentials';
        };
        this.auth.register(this.username, this.password, this.email).subscribe({
            next: (res) => {
                console.log(res);
                this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]);
            },
            error: () => {
                this.error = 'Invalid credentials';
            },
        });
    }

    onHome() {
        this.router.navigate([APP_CONSTANTS.ROUTES.HOME]);
    }
}
