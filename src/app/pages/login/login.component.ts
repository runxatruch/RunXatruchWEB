import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService,
    private router: Router ) { }


  
  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    console.log(this.usuario);


    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email?this.usuario.email:"");
        }
        if(resp.ok){
          this.router.navigateByUrl('/home/mostrarEventos');
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: `${resp.mensaje}`
          });

        }


      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }


}
