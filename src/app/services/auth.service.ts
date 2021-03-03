import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://us-central1-testproyect-fee79.cloudfunctions.net/api/admin';

  constructor(private http: HttpClient) { }
  
  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario
    };

    return this.http.get(
      `${ this.url }/${authData.email}/${authData.password}`
    ).pipe(
      map( resp => {
        return resp;
      })
    );

  }

}
