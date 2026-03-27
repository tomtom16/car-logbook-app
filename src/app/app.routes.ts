import {Routes} from '@angular/router';
import {LoginComponent} from '@app/pages/login/login.component';
import {DashboardComponent} from '@app/pages/dashboard/dashboard.component';
import {authGuard} from '@app/guards/auth-guard';
import {guestGuard} from '@app/guards/guest.guard';
import {RegisterComponent} from '@app/pages/register/register.component';
import {MainLayoutComponent} from '@app/layout/main-layout/main-layout.component';
import {AuthLayoutComponent} from '@app/layout/auth-layout/auth-layout.component';
import {CreateVehicleComponent} from "@app/pages/vehicle/create-vehicle/create-vehicle.component";
import {CreateLogbookFuelEntryComponent} from "@app/pages/logbook/fuel/create-entry/create-logbook-fuel-entry.component";
import {CreateLogbookEntryComponent} from "@app/pages/logbook/entry/create-entry/create-logbook-entry.component";
import {ListLogbookEntriesComponent} from "@app/pages/logbook/entry/list-entries/list-logbook-entries.component";
import {ListLogbookFuelEntriesComponent} from "@app/pages/logbook/fuel/list-entries/list-logbook-fuel-entries.component";
import {ListVehiclesComponent} from "@app/pages/vehicle/list-vehicles/list-vehicles.component";
import {RandomDashboardComponent} from "@app/pages/random-dashboard/random-dashboard.component";

export const routes: Routes = [
    // ✅ AUTH PAGES (NO NAVBAR)
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {path: '', component: LoginComponent, canActivate: [guestGuard]},
            {path: 'login', component: LoginComponent, canActivate: [guestGuard]},
            {path: 'register', component: RegisterComponent, canActivate: [guestGuard]},
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
                path: 'random-dashboard',
                component: RandomDashboardComponent,
                canActivate: [authGuard], // ✅ protect route
            },
            {
                path: 'vehicle',
                component: ListVehiclesComponent,
                canActivate: [authGuard]
            },
            {
                path: 'vehicle/create',
                component: CreateVehicleComponent,
                canActivate: [authGuard]
            },
            {
                path: 'logbook/create',
                component: CreateLogbookEntryComponent,
                canActivate: [authGuard]
            },
            {
                path: 'logbook',
                component: ListLogbookEntriesComponent,
                canActivate: [authGuard]
            },
            {
                path: 'logbook/fuel',
                component: ListLogbookFuelEntriesComponent,
                canActivate: [authGuard]
            },
            {
                path: 'logbook/fuel/create',
                component: CreateLogbookFuelEntryComponent,
                canActivate: [authGuard]
            },
        ],
    },
];
