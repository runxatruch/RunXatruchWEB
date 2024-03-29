import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { EventoInterface } from '../../interface/interface';

interface indexSegi {
  index: number;
};

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  indexxx: number = -1;
  eventP$ = this.firestore.eventFinalized();
  

  navigationExtras: NavigationExtras = {
    state: {
     
    }
  };
  

  navigatorExtra: NavigationExtras = {
     state: {

     }
  }

  constructor(private firestore: FirestoreService, private route: Router) { }

  ngOnInit(): void {
  }

  onGoToSee(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['resultados/evento'], this.navigationExtras);
  }  
  
}
