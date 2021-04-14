import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Router, NavigationExtras } from '@angular/router';
import { CategoryInterface, UserInterface, EventoInterface } from '../../interface/interface';

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

  event: EventoInterface | any;

  category: CategoryInterface | any;

  newCate: cate = {
    id: ''
  };

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

  getUser(){
    console.log('entro');
    this.User = [];
    this.User = this.firestore.getInsUser(this.newCate.id);
    console.log('muestra estos Usuarios');
    console.log(this.User);
    /*this.newCate = {
      id: ''
    };*/
  }

}
