import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEventosComponent } from './agregarEventos/agregarEventos.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MostrarEventosComponent } from './mostrarEventos/mostrarEventos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DateComponent, ExampleHeader } from './date/date.component';
import {MatDatepickerModule} from '@angular/material/datepicker';


import {MatIconModule} from '@angular/material/icon';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetallesEventoComponent } from './detalles-evento/detalles-evento.component';
import { SeguimientoDetalleComponent } from './seguimiento-detalle/seguimiento-detalle.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { GanadoresEventoComponent } from './ganadores-evento/ganadores-evento.component';
//import { orderBy } from 'lodash';



@NgModule({
  declarations: [
    AgregarEventosComponent,
    MostrarEventosComponent,
    UsuariosComponent,
    SeguimientoComponent,
    PerfilComponent,
    DateComponent,
    ExampleHeader,
    DetallesEventoComponent,
    SeguimientoDetalleComponent,
    ResultadosComponent,
    GanadoresEventoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  entryComponents: [DateComponent, ExampleHeader],
  bootstrap: [DateComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class PagesModule { }
