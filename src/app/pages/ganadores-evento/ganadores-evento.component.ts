import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { NavigationExtras, Router } from '@angular/router';
import { CategoryInterface, UserInterface, EventoInterface, CompetenceRun, UserInscripInterface, CompFinal } from '../../interface/interface';
import { Pipe, PipeTransform } from '@angular/core';

interface cate{
  id: string;
  prize: string;
}


@Component({
  selector: 'app-ganadores-evento',
  templateUrl: './ganadores-evento.component.html',
  styleUrls: ['./ganadores-evento.component.css']
})
export class GanadoresEventoComponent implements OnInit {

  categoriesEvent: CategoryInterface[] = [];
  
  navigationExtras: NavigationExtras = {
    state: {   
    }
  };

  navigationExtras2: NavigationExtras = {
    state: {
    }
  };

  compeFi: CompFinal[] = [];

  compeX: CompFinal[] = [];


  newCate: cate = {
    id: '',
    prize: ''
  };


  Us: UserInterface[] = [];


  event: EventoInterface | any;
  cate: CategoryInterface | any;

  constructor(private firestore: FirestoreService, private route: Router) { 
    const navigation = this.route.getCurrentNavigation();
    this.event = navigation?.extras?.state;
    this.cate = navigation?.extras?.state;
  }

  ngOnInit(): void {
    if(typeof this.event === 'undefined'){
       this.route.navigate(['/resultados']);
    }
  }

  
  getUserCompetition(){
    console.log('entro');
    this.compeFi = this.firestore.getGanadores(this.newCate.id);

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

  

}
