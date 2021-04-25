import { Injectable, Pipe } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad , CanActivate  {
  
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private authService: AuthService,
              private router: Router){

  }
  
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
        
    /*   return  this.authService.verificaAutenticacion();
      */
     

    return  this.authService.verificaAutenticacion()
    .pipe(
      tap ( estadoAutentificado=>{
        if(!estadoAutentificado){
          this.router.navigate(['/landing'])
        }
      })
    )    
/* 
      
       return  this.authService.verificaAutenticacion(resp.ok)
          .pipe(
            tap ( (estadoAutentificado: any) =>{
              if(!estadoAutentificado){
                this.router.navigate(['/landing'])
              }
            })
          )   */
       
       if (this.authService.auth.ok){
        return true; 
      }
      this.router.navigate(['/landing'])
      console.log('Bloqueado  por el AuthGard-CanActivate'); 
      return  false ;
   
 
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
       
      

       return  this.authService.verificaAutenticacion()
      .pipe(
        tap ( estadoAutentificado=>{
          if(!estadoAutentificado){
            this.router.navigate(['/landing'])
          }
        })
      )  
      


  
  /* 
      if (this.authService.auth.ok){
        return true; 
      }
      this.router.navigate(['/landing'])
        console.log('Bloqueado  por el AuthGard-Canload'); 
      return  false ; 

 */
     
        
  } 


}