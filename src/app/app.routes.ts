import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { IInfoComponent } from './shared/pages/i-info/i-info.component';
import { NotfoundComponent } from './shared/pages/notfound/notfound.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "idolinfo",
        component: IInfoComponent
    },
    {
        path: "notfound",
        component: NotfoundComponent
    }
];
