import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CategoryInterface, EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';


@Component({
  selector: 'app-mostrarEventos',
  templateUrl: './mostrarEventos.component.html',
  styleUrls: ['./mostrarEventos.component.css']
})
export class MostrarEventosComponent implements OnInit {

  evet$ = this.dataApi.eventos;
  categorias: CategoryInterface[] = [];
  eventos: EventoInterface[] = [];
  navigationExtras: NavigationExtras = {
    state: {
     
    }
  };

  constructor( private dataApi: FirestoreService, private route: Router) { }
  
  ngOnInit(): void {
    
  }
  
  
  onGoToEdit(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/agregarEventos'], this.navigationExtras);
  }
  
  onGoToSee(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/details'], this.navigationExtras);
  }  
  
  async onGoToDelete(eventId: string): Promise<void>{
    try{
      await this.dataApi.onDeleteEvent(eventId); 
      alert('delete');
    }catch(err){
      console.log(err);
    }
  }

}