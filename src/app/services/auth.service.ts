import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    return this.apiService.login(username, password);
  }

  register(username: string, password: string) {
    return this.apiService.register(username, password);
  }

  refreshToken() {
    return this.apiService.refresh(this.getRefreshToken()).pipe(
      tap((res) => {
        this.saveTokens(res.token, res.refreshToken);
      }),
    );
  }

  saveTokens(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', token);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username);
  }

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') as string;
  }

  getUsername(): string {
    return localStorage.getItem('username') as string;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('currentVehicleId');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
