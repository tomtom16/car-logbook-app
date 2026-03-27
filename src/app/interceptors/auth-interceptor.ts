import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@app/services/auth.service';
import {Router} from '@angular/router';
import {catchError, switchMap, throwError} from 'rxjs';
import {APP_CONSTANTS} from "@app/app.constants";

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const accessToken = auth.getToken();

    let authReq = req;

    if (accessToken) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }

    return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
            // If unauthorized → try refresh
            if (error.status === 401 && !isRefreshing) {
                isRefreshing = true;

                return auth.refreshToken().pipe(
                    switchMap(() => {
                        isRefreshing = false;

                        const newToken = auth.getToken();

                        const retryReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken}`,
                            },
                        });

                        return next(retryReq);
                    }),
                    catchError((err) => {
                        isRefreshing = false;

                        // ❌ Refresh failed → logout
                        auth.logout();
                        router.navigate([APP_CONSTANTS.ROUTES.HOME]);

                        return throwError(() => err);
                    }),
                );
            }

            return throwError(() => error);
        }),
    );
};
