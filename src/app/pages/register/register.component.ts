import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { AuthService } from '../../services/auth.service';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import {APP_CONSTANTS} from "../../app.constants";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, Message, Password],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  CONSTANTS = APP_CONSTANTS;
  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onRegister() {
    if (!this.username || !this.password) return;
    this.auth.register(this.username, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate([this.CONSTANTS.ROUTES.LOGIN]);
      },
      error: () => {
        this.error = 'Invalid credentials';
      },
    });
  }

  onHome() {
    this.router.navigate([this.CONSTANTS.ROUTES.HOME]);
  }
}
