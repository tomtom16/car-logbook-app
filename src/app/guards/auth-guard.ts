import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {APP_CONSTANTS} from "../app.constants";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isLoggedIn()) {
        return true;
    }

    // Redirect to login if not authenticated
    return router.createUrlTree([APP_CONSTANTS.ROUTES.HOME]);
};
