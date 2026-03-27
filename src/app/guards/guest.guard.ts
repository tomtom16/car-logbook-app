import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import {APP_CONSTANTS} from "@app/app.constants";

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree([APP_CONSTANTS.ROUTES.DASHBOARD]);
};
