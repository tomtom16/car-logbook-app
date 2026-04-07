import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {AuthService} from '@app/services/auth.service';
import {Message} from 'primeng/message';
import {Password} from 'primeng/password';
import {APP_CONSTANTS} from "@app/app.constants";
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, Password, ProgressSpinner],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
    token = '';
    password = '';
    loading = true;
    validated = false;
    error = '';

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {
        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
        });
    }

    ngOnInit(): void {
        this.validateToken();
    }

    validateToken() {
        if (!!this.token && this.token.length > 0) {
            this.auth.validateForgotPwToken(this.token).subscribe({
                next: (res) => {
                    this.validated = true;
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;
                    this.error = 'Invalid token';
                    this.cdr.detectChanges();
                }
            })
        }
    }

    onSubmit() {
        this.auth.resetPw(this.token, this.password).subscribe({
            next: (res) => {
                console.log(res);
                this.router.navigate([APP_CONSTANTS.ROUTES.HOME]);
            },
            error: () => {
                this.error = 'Invalid credentials';
                this.cdr.detectChanges();
            },
        });
    }

}
