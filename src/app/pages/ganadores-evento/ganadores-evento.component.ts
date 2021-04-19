import { Component, OnInit } from '@angular/core';
import { CategoryInterface, UserInterface } from 'src/app/interface/interface';
import { NavigationExtras, Router } from '@angular/router';
import { EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

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

  
  Us: UserInterface[] = [];

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


  

}
