import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest.guard';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import {CreateVehicleComponent} from "./pages/vehicle/create-vehicle/create-vehicle.component";
import {CreateLogbookFuelEntryComponent} from "./pages/logbook/fuel/create-entry/create-logbook-fuel-entry.component";

export const routes: Routes = [
  // ✅ AUTH PAGES (NO NAVBAR)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent, canActivate: [guestGuard] },
      { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard], // ✅ protect route
      },
      {
        path: 'vehicle/create',
        component: CreateVehicleComponent,
        canActivate: [authGuard]
      },
      {
        path: 'logbook/fuel/create',
        component: CreateLogbookFuelEntryComponent,
        canActivate: [authGuard]
      }
    ],
  },
];
