import { Component} from '@angular/core';

@Component({
  selector: 'app-agregarEventos',
  templateUrl: './agregarEventos.component.html',
  styleUrls: ['./agregarEventos.component.css']
})

export class AgregarEventosComponent{

  patrocinadorSeleccionado: string = '';
  private _premios: string [] = ['Primer Lugar', 'Primeros dos lugares', 'Primeros tres lugares'];
  private _ciudades: string [] = ['Tegucigalpa', 'San Pedro Sula', 'Cortes', 'Olancho', 'Comayagua'];
  private _patrocinadores: string [] = ['Gurpo Intur', 'Corporacion Flores', 'Lacthosa Sula', 'Banco Atlantida', 'Coca Cola'];
  private _edad: number [] = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,
                              51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];

  /*
  seleccionarPatrocinador(){
     this.patrocinadorSeleccionado = this._patrocinadores.values() || '';
  }*/

  get premios(): string [] {
    return [...this._premios];
  }
  get ciudades(): string[] {
    return [...this._ciudades];
  }
  get patrocinadores(): string [] {
    return [...this._patrocinadores];
  }
  get edad(): number [] {
    return [...this._edad];
  }

}
