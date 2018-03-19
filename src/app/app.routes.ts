import { RouterModule, Routes } from '@angular/router';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';
import { RevisitedComponent } from './components/revisited/revisited.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './services/guards/login.guard';

const APP_ROUTES: Routes = [
    {
        path: 'es',
        children: [
            { path: 'birthday', component: BirthdaysComponent },
            { path: 'login', component: LoginComponent },
            { path: 'revisited', component: RevisitedComponent, canActivate: [LoginGuard] },
            { path: '', redirectTo: 'birthday', pathMatch: 'full' },
            { path: '**', redirectTo: '' },
        ]
    },
    {
        path: 'en',
        children: [
            { path: 'birthday', component: BirthdaysComponent },
            { path: 'login', component: LoginComponent },
            { path: 'revisited', component: RevisitedComponent, canActivate: [LoginGuard] },
            { path: '', redirectTo: 'birthday', pathMatch: 'full' },
            { path: '**', redirectTo: '' }
        ]
    },
    { path: '**', redirectTo: 'en' }


];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });