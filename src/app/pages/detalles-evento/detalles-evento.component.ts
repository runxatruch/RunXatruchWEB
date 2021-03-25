import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-evento',
  templateUrl: './detalles-evento.component.html',
  styleUrls: ['./detalles-evento.component.css']
})
export class DetallesEventoComponent implements OnInit {
  
  navigationExtras: NavigationExtras = {
    state: {   
    }
  };

  event: EventoInterface | any;
  constructor(private route: Router, private dataApi: FirestoreService) { 
     const navigation = this.route.getCurrentNavigation();
     this.event = navigation?.extras?.state;
  }

  ngOnInit(): void {
    if(typeof this.event === 'undefined'){
       this.route.navigate(['/home/mostrarEventos']);
    }
  }

  onGoToEdit():void {
    this.navigationExtras.state = this.event;
    this.route.navigate(['/home/agregarEventos'], this.navigationExtras);
  }

     
  deleteEvent(){
    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    this.dataApi.deleteEvent(this.event.id)
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
  async onDeleted(): Promise<void>{
    try{
      await this.dataApi.onDeleteEvent(this.event.id); 
      alert('delete');
    }catch(err){
      console.log(err);
    }
  }*/

  onGoBack():void {
    this.route.navigate(['/home/mostrarEventos']);
  }
  
}
