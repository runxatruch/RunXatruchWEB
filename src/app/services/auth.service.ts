import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map, tap } from 'rxjs/operators';
import { Auth } from '../interface/interface';
import { Observable , of} from 'rxjs';
import { Router, RouterModule } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://us-central1-testproyect-fee79.cloudfunctions.net/api/admin';
  
  private _auth: Auth | undefined;


get auth(){
  return {...this._auth}
}

  constructor(private http: HttpClient, 
              private router: Router) { }
  

 
  verificaAutenticacion():Observable<boolean>{
      
    if (this.auth.ok){
 
      return of(true) 
      
    }else {
    
      console.log('Bloqueado  por el AuthGard-CanActivate'); 
      return  of(false) ;
    }

  }
 
/* en el video lo explican algo asi  */

/* 

  verificaAutenticacion(usuario: UsuarioModel): Observable<boolean>{
    
    const authData = {
      ...usuario
    };

    if( !localStorage.getItem('email')){
      return of(false); 
    }


     return this.http.get<Auth>(
      `${ this.url }/${authData.email}/${authData.password}`
    )
      .pipe(
          map( auth=> {
            console.log('map', auth );
            return true;
          })
      )
  
  } 

 */
  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario
    };

    return this.http.get<Auth>(
      `${ this.url }/${authData.email}/${authData.password}`
    ).pipe(
      tap( auth =>this._auth= auth)
      
    );

  }


  logout(){
    this._auth = undefined ; 
  }

}
