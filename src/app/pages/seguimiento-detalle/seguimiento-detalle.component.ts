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
  categoriesEvent: CategoryInterface[] = [];

  navigationExtras: NavigationExtras = {
    state: {
    }
  };

  navigationExtras2: NavigationExtras = {
    state:{
    }
  };

  User: UserInterface[] = [];

  competences: CompetenceRun[] = []; 

  inscription: UserInscripInterface[] = [];

  compeFi: CompFinal[] = [];

  event: EventoInterface | any;

  category: CategoryInterface | any;

  newCate: cate = {
    id: ''
  };

  eventFinized: EventoInterface | any;

  constructor(private firestore: FirestoreService, private route: Router) { 
    const navigation = this.route.getCurrentNavigation();
    this.event = navigation?.extras?.state;
    this.category = navigation?.extras?.state;
    //console.log(this.event.categories);
    console.log(this.newCate.id);
  }

  ngOnInit(): void {
    if(typeof this.event === 'undefined'){
      this.route.navigate(['/home/seguimiento']);
    }
  }

  idU: string = '';

  getUser(){
    console.log('entro');
    var con = 0;

  
    //this.User = [];
    //this.competences = [];
    //this.inscription = [];
    this.User = this.firestore.getInsUser(this.newCate.id);
    this.competences = this.firestore.getCompetenceRun(this.newCate.id);
    this.inscription = this.firestore.InsCom;
    console.log('esto inicio');
    console.log(this.User);
    console.log(this.competences);
    console.log(this.inscription);
    console.log('esto fin');
     con = 1;

    console.log(this.User.length);
    for(let i=0; i<=this.User.length; i++){
      console.log('for 1');
      console.log(this.User[i]);
      //this.idU = this.User[i].id;
      console.log( this.idU);
      for(let k=0; k<=this.inscription.length; k++){
        console.log('for 2');
        console.log(this.inscription[k]);
        //idI = this.competences[k].id;
        //console.log(idI);
        if(1 === 1){
          console.log('viva cristo');
          console.log(this.inscription[k]);
          //this.compeFi[i].n = i;
          /*this.compeFi[i].identity = this.User[i].identity;
          this.compeFi[i].firstName = this.User[i].firstName;
          this.compeFi[i].lastName = this.User[i].lastName;
          this.compeFi[i].timeStart = this.competences[k].timeStart;
          this.compeFi[i].timeEnd = this.competences[k].timeEnd;
          this.compeFi[i].timeTotal = this.competences[k].timeTotal;*/
          //k = this.inscription.length;
        }
      }

    
    }

    //var idU;
    
    //var idI;

    console.log('muestra estos Usuarios');
    console.log('esto ini fin');
    console.log(this.User);
    console.log(this.competences);
    console.log(this.inscription);
    console.log(this.compeFi);
    console.log('esto finish');    
    //this.inscription = this.firestore.inscriptionNow;
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
