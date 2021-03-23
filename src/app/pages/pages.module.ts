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
import { DetailsEventComponent } from './details-event/details-event.component';



@NgModule({
  declarations: [
    AgregarEventosComponent,
    MostrarEventosComponent,
    UsuariosComponent,
    SeguimientoComponent,
    PerfilComponent,
    DateComponent,
    ExampleHeader,
    DetailsEventComponent
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
