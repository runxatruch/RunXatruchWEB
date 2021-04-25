import {NgModule} from '@angular/core'; 
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {ResultadosComponent} from './pages/resultados/resultados.component';
import { GanadoresEventoComponent } from './pages/ganadores-evento/ganadores-evento.component';
import { AuthGuard } from './pages/guards/auth.guard';

const routes: Routes  =[

    {
        path:  '',
        redirectTo:  'landing',
        pathMatch:  'full'
    },
    {
        path: 'resultados',
        component: ResultadosComponent
    
    },
    {
        path: 'resultados/evento',
        component: GanadoresEventoComponent
    
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
        canLoad: [AuthGuard],
        canActivate : [AuthGuard]
    },
    {
        path: 'landing',
        component: LandingPageComponent
    },
    {
        path:  '**',
        redirectTo:  'landing',
        pathMatch:  'full'
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