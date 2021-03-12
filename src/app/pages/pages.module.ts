import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HistorialComponent } from './historial/historial.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    CategoryComponent,
    PatrocinadoresComponent,
    UsuariosComponent,
    HistorialComponent,
    PerfilComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
