import {ChangeDetectorRef, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {AuthService} from "@app/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {APP_CONSTANTS} from "@app/app.constants";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule],
    templateUrl: './forgot-password-result.component.html',
    styleUrls: ['./forgot-password-result.component.css'],
})
export class ForgotPasswordResultComponent {
    username = '';

    constructor(private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private cdr: ChangeDetectorRef) {
        this.route.queryParams.subscribe(params => {
            this.username = params['username'];
        });
    }

    onResend() {
        this.auth.resendForgotPwMail(this.username).subscribe({
            next: (res) => {
                console.log(res);
                this.router.navigate([APP_CONSTANTS.ROUTES.FORGOT_PW.RESULT], {
                    queryParams: {username: this.username}
                });
            },
            error: () => {
                this.cdr.detectChanges();
            },
        });
    }

}
