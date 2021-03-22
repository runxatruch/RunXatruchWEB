import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgregarEventosComponent } from './agregarEventos/agregarEventos.component';
//import { LandingPageComponent } from './landing-page/landing-page.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { MostrarEventosComponent } from './mostrarEventos/mostrarEventos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DateComponent, ExampleHeader } from './date/date.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'agregarEventos',
        component: AgregarEventosComponent
      },
      {
        path: 'seguimiento',
        component: SeguimientoComponent
      },
      {
        path: 'mostrarEventos',
        component: MostrarEventosComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'editar/:id',
        component: AgregarEventosComponent
      },
      {
        path: 'event/:id',
        component: AgregarEventosComponent
      },
      /*{
        path: ':id',
        component: PerfilComponent
      },*/
      {
        path: '**',
        redirectTo: 'home'
      },
      {
        path: 'date',
        component: DateComponent
      }
    ],
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
