import {NgModule} from  '@angular/core'; 
import { LandingPageComponent } from './landing-page.component';

@NgModule({

    declarations: [
        LandingPageComponent
    ],

    exports: [
        LandingPageComponent
    ]
})


export class LandingPageModule{

}