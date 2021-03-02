import {NgModule} from  '@angular/core'; 
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './login/login.component';

@NgModule({

    declarations: [
        LandingPageComponent,
        LoginComponent
    ],

    exports: [
        LandingPageComponent,
        LoginComponent

    ]
})


export class LandingPageModule{

}