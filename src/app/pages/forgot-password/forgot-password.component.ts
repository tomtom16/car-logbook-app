import {ChangeDetectorRef, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

import {AuthService} from '@app/services/auth.service';
import {Message} from 'primeng/message';
import {APP_CONSTANTS} from "@app/app.constants";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
    username = '';
    error = '';

    constructor(
        private auth: AuthService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
    }

    onSubmit() {
        this.auth.forgotPw(this.username).subscribe({
            next: (res) => {
                console.log(res);
                this.router.navigate([APP_CONSTANTS.ROUTES.FORGOT_PW.RESULT], {
                    queryParams: { username: this.username }
                });
            },
            error: () => {
                this.cdr.detectChanges();
            },
        });
    }

}
