import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DashboardComponent } from './pages/dashboard/dashboardpage/dashboard.component';
import { PublicGuard } from './guards/solo-publico.guard';
import { AuthGuard } from './guards/solo-logueado.guard';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { AdminGuard } from './guards/solo-admin.guard';
import { EditUsersComponent } from './pages/dashboard/admin/edit-users/edit-users.component';
import { EditCurrencyComponent } from './pages/dashboard/admin/edit-currency/edit-currency.component';
import { ConverterComponent } from './pages/dashboard/converter/converter.component';
import { HistoryComponent } from './pages/dashboard/history/history.component';

export const routes: Routes = [
    {
        path: "",
        component: MainPageComponent,
        canActivate: [PublicGuard]
    },
    {
        path: "login",
        component: LoginPageComponent,
        canActivate: [PublicGuard]
        
    },
    {
        path: "register",
        component: RegisterPageComponent,
        canActivate: [PublicGuard]
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "converter",
                component: ConverterComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "profile",
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "history",
                component: HistoryComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "editusers",
                component: EditUsersComponent,
                canActivate: [AdminGuard]
            },
            {
                path: "editcurrencies",
                component: EditCurrencyComponent,
                canActivate: [AdminGuard]
            }
        ]
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    },
];
