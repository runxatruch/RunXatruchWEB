import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { last } from 'rxjs/operators';
//import { CategoryService } from '../../services/category/category.service';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { CategoryInterface, EventoInterface } from '../agregarEventos/agregarEventos.component';

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

  

  //public event: EventoInterface ;

  constructor( private dataApi: FirestoreService,
               private route: Router
    ) { }

  ngOnInit(): void {
    /*this.dataApi.getCategory()
      .subscribe( categorias => this.categorias = categorias);

    this.dataApi.getEvent()
      .subscribe( eventos => this.eventos = eventos);

    const idEvent = '5s4NYssHEGbooxHlOuGi';
    this.dataApi.getOneEvent(idEvent).subscribe( eventos => {
      console.log(eventos);
    });*/
  }

  
  onGoToEdit(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/agregarEventos'], this.navigationExtras);
  }

  onGoToSee(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/seguimiento'], this.navigationExtras);
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