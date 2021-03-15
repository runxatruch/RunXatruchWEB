import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactEmail } from 'src/app/models/contact';
import Swal from 'sweetalert2';
import { SendEmailService } from '../../services/sendEmail/send-email.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  {
  email:ContactEmail = new ContactEmail();
  name: string = "";
  lastname: string = "";
  constructor( private service: SendEmailService,
    private router: Router){}

  send(form:NgForm){
    console.log('here');
    if (  form.invalid ) { return; }
    this.email.name = `${this.name} ${this.lastname}`
    console.log(this.email.name);

    
    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();


    this.service.sendContactEmail( this.email )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        
        if(resp.ok){
          Swal.fire({
            allowOutsideClick: false,
            title: 'info',
            text: 'Mensaje enviado'
          });
          window.location.reload();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error al Enviar',
            text: `${resp.mensaje}`
          });

        }


      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al Enviar',
          text: err.error.error.message
        });
      });

  }

  
}
