import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactEmail } from 'src/app/models/contact';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  {
  email:ContactEmail = new ContactEmail();
  constructor(){}

  send(form:NgForm){
    console.log('here');
    if (  form.invalid ) { return; }
    console.log(this.email.firstname);

  }

  
}
