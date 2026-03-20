import {ChangeDetectorRef, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../services/auth.service';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, Password],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.auth.saveTokens(res.token, res.refreshToken);
        this.auth.saveUsername(res.username);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid credentials';
        this.cdr.detectChanges();
      },
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
