import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CategoryInterface, EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrarEventos',
  templateUrl: './mostrarEventos.component.html',
  styleUrls: ['./mostrarEventos.component.css']
})
export class MostrarEventosComponent implements OnInit {

  evet$ = this.dataApi.eventos;
  dateNow = this.dataApi.myDate;
  dateNext: any = new Date();
  eventosAlmacenados:any[] = [];
  categorias: CategoryInterface[] = [];
  events: EventoInterface[] = [];
  categoriesEvent: CategoryInterface[] = [];
  navigationExtras: NavigationExtras = {
    state: {
     
    }
  };

  constructor( private dataApi: FirestoreService, private route: Router) { 
    this.dateNext.setMonth(this.dateNext.getMonth() + 1);
  }
  
  ngOnInit(): void {
    
  }

  deleteEvent(item: any, id: string){
    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    this.categoriesEvent = item.categories
    for(let i=0; i<this.categoriesEvent.length; i++){
       this.dataApi.deleteCategorie(this.categoriesEvent[i].id)
    }
    this.dataApi.deleteInsEvent(id);
    this.dataApi.deleteEvent(id)
      .then(res=>{
        if(res){
          Swal.fire(
            'Evento eliminado!',
            'Presione:',
            'success'
          ) 
        }
      }).catch(e=>{
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: e
        });
      })
  }
  
  onGoToEdit(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/agregarEventos'], this.navigationExtras);
    console.log(item)
  }
  
  onGoToSee(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/detallesEventos'], this.navigationExtras);
  }  
  
}