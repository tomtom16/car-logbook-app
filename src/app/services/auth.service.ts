import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {ApiService} from './api.service';
import {APP_CONSTANTS} from "../app.constants";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private apiService: ApiService) {
    }

    login(username: string, password: string): Observable<any> {
        return this.apiService.login(username, password);
    }

    register(username: string, password: string, email: string) {
        return this.apiService.register(username, password, email);
    }

    refreshToken() {
        return this.apiService.refresh(this.getRefreshToken()).pipe(
            tap((res) => {
                this.saveTokens(res.token, res.refreshToken);
            }),
        );
    }

    saveTokens(token: string, refreshToken: string) {
        this.saveToken(token);
        this.saveRefreshToken(refreshToken);
    }

    saveToken(token: string) {
        localStorage.setItem(APP_CONSTANTS.MISC.TOKEN, token);
    }

    saveRefreshToken(token: string) {
        localStorage.setItem(APP_CONSTANTS.MISC.REFRESH_TOKEN, token);
    }

    saveUsername(username: string) {
        localStorage.setItem(APP_CONSTANTS.MISC.USERNAME, username);
    }

    getToken(): string {
        return localStorage.getItem(APP_CONSTANTS.MISC.TOKEN) as string;
    }

    getRefreshToken(): string {
        return localStorage.getItem(APP_CONSTANTS.MISC.REFRESH_TOKEN) as string;
    }

    getUsername(): string {
        return localStorage.getItem(APP_CONSTANTS.MISC.USERNAME) as string;
    }

    logout() {
        localStorage.removeItem(APP_CONSTANTS.MISC.TOKEN);
        localStorage.removeItem(APP_CONSTANTS.MISC.REFRESH_TOKEN);
        localStorage.removeItem(APP_CONSTANTS.MISC.USERNAME);
        localStorage.removeItem(APP_CONSTANTS.MISC.CURRENT_VEHICLE_ID);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
