import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { IInfoComponent } from './shared/pages/i-info/i-info.component';
import { PInfoComponent } from './shared/pages/p-info/p-info.component';
import { SInfoComponent } from './shared/pages/s-info/s-info.component';

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
        path: "pinfo",
        component: PInfoComponent
    },
    {
        path: "sinfo",
        component: SInfoComponent
    },
    {
        path: "notfound",
        component: NotfoundComponent
    },
    {
        path: "**",
        redirectTo: "notfound"
    }
];
