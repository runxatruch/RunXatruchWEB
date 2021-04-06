import {NgModule} from '@angular/core'; 
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


const routes: Routes  =[

    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path: '**',
        redirectTo: 'landing',
        pathMatch: 'full'
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