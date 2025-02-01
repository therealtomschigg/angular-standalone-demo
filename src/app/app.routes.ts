// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { PersonenComponent } from './personen/personen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'personen', component: PersonenComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'account', component: AccountComponent },

        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }

];
