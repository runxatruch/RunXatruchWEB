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
  eventosAlmacenados:any[] = [];
  categorias: CategoryInterface[] = [];
  events: EventoInterface[] = [

  ]
  navigationExtras: NavigationExtras = {
    state: {
     
    }
  };

  constructor( private dataApi: FirestoreService, private route: Router) { }
  
  ngOnInit(): void {
    
  }
  
    
  deleteEvent(id: string){
    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
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

  /*
  async onGoToDelete(eventId: string): Promise<void>{
    try{
      await this.dataApi.onDeleteEvent(eventId); 
      alert('delete');
    }catch(err){
      console.log(err);
    }
  }*/
  
  onGoToEdit(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/agregarEventos'], this.navigationExtras);
  }
  
  onGoToSee(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/details'], this.navigationExtras);
  }  
  


}