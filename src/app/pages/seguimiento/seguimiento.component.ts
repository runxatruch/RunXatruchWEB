import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { EventoInterface } from '../../interface/interface';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  eventP$ = this.firestore.eventProcess();
  navigatorExtra: NavigationExtras = {
     state: {

     }
  }

  constructor(private firestore: FirestoreService, private route: Router) { }

  ngOnInit(): void {
  }

  seeDetailts(item: EventoInterface):void{
     this.navigatorExtra.state = item;
     this.route.navigate(['home/detallesSeguimiento'], this.navigatorExtra);
  }
 
}
