import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  
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

  async onDeleted(): Promise<void>{
    try{
      await this.dataApi.onDeleteEvent(this.event.id); 
      alert('delete');
    }catch(err){
      console.log(err);
    }
  }

  onGoBack():void {
    this.route.navigate(['/home/mostrarEventos']);
  }
  
}
