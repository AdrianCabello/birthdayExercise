import { RouterModule, Routes } from '@angular/router';
import { BirthdaysComponent } from './components/birthdays/birthdays.component';


const APP_ROUTES: Routes = [
    {
        path: 'es',
        children: [
            { path: '', component: BirthdaysComponent },
            { path: '**', component: BirthdaysComponent }
        ]
    },
    {
        path: 'en',
        children: [
            { path: '', component: BirthdaysComponent },
            { path: '**', component: BirthdaysComponent }
        ]
    },
    { path: '**', redirectTo: 'es' }

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });