import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Router, NavigationExtras } from '@angular/router';
import { CategoryInterface, UserInterface, EventoInterface, CompetenceRun, UserInscripInterface, CompFinal } from '../../interface/interface';

interface cate{
  id: string;
}

@Component({
  selector: 'app-seguimiento-detalle',
  templateUrl: './seguimiento-detalle.component.html',
  styleUrls: ['./seguimiento-detalle.component.css']
})
export class SeguimientoDetalleComponent implements OnInit {
  
  //eventP$ = this.firestore.eventProcess();
  //categoriesEvent: CategoryInterface[] = [];

  navigationExtras: NavigationExtras = {
    state: {
    }
  };

  /*navigationExtras2: NavigationExtras = {
    state:{
    }
  };*/

  //User: UserInterface[] = [];

  //competences: CompetenceRun[] = []; 

  //inscription: UserInscripInterface[] = [];

  compeFi: CompFinal[] = [];

  event: EventoInterface | any;

  category: CategoryInterface | any;

  newCate: cate = {
    id: ''
  };

  //eventFinized: EventoInterface | any;

  constructor(private firestore: FirestoreService, private route: Router) { 
    const navigation = this.route.getCurrentNavigation();
    this.event = navigation?.extras?.state;
    this.category = navigation?.extras?.state;
    //console.log(this.event.categories);
    //console.log(this.newCate.id);
  }

  ngOnInit(): void {
    if(typeof this.event === 'undefined'){
      this.route.navigate(['/home/seguimiento']);
    }
  }


  getUserCompetition(){
    console.log('entro');
    this.compeFi = this.firestore.getCompetenceRun(this.newCate.id);
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
