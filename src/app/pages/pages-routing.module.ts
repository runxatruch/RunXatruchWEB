import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
//import { LandingPageComponent } from './landing-page/landing-page.component';
import { HistorialComponent } from './historial/historial.component';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'historial',
        component: HistorialComponent
      },
      {
        path: 'patrocinadores',
        component: PatrocinadoresComponent
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
        path: '**',
        redirectTo: 'home'
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
