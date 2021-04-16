import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { EventoInterface } from '../../interface/interface';

interface indexSegi {
  index: number;
};

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  indexxx: number = -1;
  eventP$ = this.firestore.eventProcess();
  
  

  navigatorExtra: NavigationExtras = {
     state: {

     }
  }

  constructor(private firestore: FirestoreService, private route: Router) { }

  ngOnInit(): void {
  }

  seeDetailts(item: EventoInterface, index: number):void{
     this.eventP$.splice(index, 1);  
     this.eventP$.slice(index, 1);
     this.navigatorExtra.state = item;
     this.route.navigate(['home/detallesSeguimiento'], this.navigatorExtra);
  }
 
}
