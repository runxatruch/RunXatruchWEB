import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swal from 'sweetalert2';
import { CategoryInterface } from '../../interface/interface';

@Component({
  selector: 'app-detalles-evento',
  templateUrl: './detalles-evento.component.html',
  styleUrls: ['./detalles-evento.component.css']
})
export class DetallesEventoComponent implements OnInit {

  categoriesEvent: CategoryInterface[] = [];
  
  navigationExtras: NavigationExtras = {
    state: {   
    }
  };

  navigationExtras2: NavigationExtras = {
    state: {
    }
  };

  event: EventoInterface | any;
  cate: CategoryInterface | any;
  constructor(private route: Router, private dataApi: FirestoreService) { 
     const navigation = this.route.getCurrentNavigation();
     this.event = navigation?.extras?.state;
     this.cate = navigation?.extras?.state;
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
    this.categoriesEvent = this.event.categories
    for(let i=0; i<this.categoriesEvent.length; i++){
       this.dataApi.deleteCategorie(this.categoriesEvent[i].id)
    }
    console.log('funciona')
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
