import {NgModule} from '@angular/core'; 
import {RouterModule, Routes} from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes  =[

    {
        path: '',
        component: LandingPageComponent, 
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: '**',
        redirectTo: ''
    }
]  





@NgModule({

    imports: [
        RouterModule.forRoot( routes)

    ], 
    exports: [

        RouterModule
    ]


})



export class AppRoutingModule {}