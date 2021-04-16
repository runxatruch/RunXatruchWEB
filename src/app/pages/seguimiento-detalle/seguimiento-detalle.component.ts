import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Router, NavigationExtras } from '@angular/router';
import { CategoryInterface, UserInterface, EventoInterface, CompetenceRun, UserInscripInterface, CompFinal } from '../../interface/interface';
import { Pipe, PipeTransform } from '@angular/core';

interface cate{
  id: string;
  prize: string;
}

@Component({
  selector: 'app-seguimiento-detalle',
  templateUrl: './seguimiento-detalle.component.html',
  styleUrls: ['./seguimiento-detalle.component.css']
})
export class SeguimientoDetalleComponent implements OnInit {

  navigationExtras: NavigationExtras = {
    state: {
    }
  };

  compeFi: CompFinal[] = [];

  compeX: CompFinal[] = [];

  event: EventoInterface | any;

  category: CategoryInterface | any;

  newCate: cate = {
    id: '',
    prize: ''
  };

  constructor(private firestore: FirestoreService, private route: Router) { 
    const navigation = this.route.getCurrentNavigation();
    this.event = navigation?.extras?.state;
    this.category = navigation?.extras?.state;
  }

  ngOnInit(): void {
    if(typeof this.event === 'undefined'){
      this.route.navigate(['/home/seguimiento']);
    }
  }

  getUserCompetition(){
    console.log('entro');
    this.compeFi = this.firestore.getCompetenceRun(this.newCate.id);

    for(let i=0; i<this.event.categories.length; i++){
      if(this.newCate.id === this.event.categories[i].id){
        this.newCate.prize = this.event.categories[i].prize;
      }
    }
    console.log(this.newCate);
    /*this.newCate = {
      id: ''
    };*/
  }

  finishEvent(event: EventoInterface, idEvent: string){
    event.finalized = 'true';
    this.firestore.createEvent(event, idEvent);
    this.route.navigate(['/home/seguimiento']);
  }

}
