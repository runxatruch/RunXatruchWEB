import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { stringify } from 'node:querystring';
import { runInThisContext } from 'node:vm';
import { CategoryInterface, EventoInterface } from 'src/app/interface/interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import Swal from 'sweetalert2';
import {DatePipe} from '@angular/common';

interface datosFiltrer{
  city: string,
  mon: string,
  nameF: string 
}

@Component({
  selector: 'app-mostrarEventos',
  templateUrl: './mostrarEventos.component.html',
  styleUrls: ['./mostrarEventos.component.css']
})
export class MostrarEventosComponent implements OnInit {

  //evet$ = this.dataApi.eventos;
  evet$ = this.dataApi.eventFiltrer(null, null, null); 
  dateNow = this.dataApi.myDate;
  //dateX: Date | any = new Date();
  //dateY: any = '';
  dateNext: any = new Date();
  eventosAlmacenados:any[] = [];
  categorias: CategoryInterface[] = [];
  events: EventoInterface[] = [];
  categoriesEvent: CategoryInterface[] = [];
  filtrer: datosFiltrer [] = [];
  navigationExtras: NavigationExtras = {
    state: {
     
    }
  };
  cc: string = '';
  mm: string = '';
  nn: string = '';
  ff: EventoInterface[] = [];
  newFiltrer: datosFiltrer = {
    city: '',
    mon: '',
    nameF: ''
  }

  constructor( private dataApi: FirestoreService, private route: Router, private datePipe: DatePipe) { 
    this.dateNext.setMonth(this.dateNext.getMonth() + 1);
    /*this.dateX = this.dataApi.myDateHour;
    for(let i=0; i<this.evet$.length; i++){
      this.dateY = this.datePipe.transform(this.evet$[i].startTime, 'yyyy-MM-dd, HH:mm');
       if(this.dateY <= this.dateX){
        this.evet$.slice(i, 1);
        this.evet$.splice(i, 1);
       }
    }*/
  }
  
  ngOnInit(): void {
    
  }

  //filtra por nombre, ciudad y mes
  getFiltrer(){
    this.cc = this.newFiltrer.city;
    this.mm = this.newFiltrer.mon;
    this.nn = this.newFiltrer.nameF;

    if(this.mm !== ''){
      if(this.mm.toUpperCase().trim() === 'ENERO'){
        this.mm = '01'
      }
      if(this.mm.toUpperCase().trim() === 'FEBRERO'){
        this.mm = '02'
      }
      if(this.mm.toUpperCase().trim() === 'MARZO'){
        this.mm = '03'
      }
      if(this.mm.toUpperCase().trim() === 'ABRIL'){
        this.mm = '04'
      }
      if(this.mm.toUpperCase().trim() === 'MAYO'){
        this.mm = '05'
      }
      if(this.mm.toUpperCase().trim() === 'JUNIO'){
        this.mm = '06'
      }
      if(this.mm.toUpperCase().trim() === 'JULIO'){
        this.mm = '07'
      }
      if(this.mm.toUpperCase().trim() === 'AGOSTO'){
        this.mm = '08'
      }
      if(this.mm.toUpperCase().trim() === 'SEPTIEMBRE'){
        this.mm = '09'
      }
      if(this.mm.toUpperCase().trim() === 'OCTUBRE'){
        this.mm = '10'
      }
      if(this.mm.toUpperCase().trim() === 'NOVIEMBRE'){
        this.mm = '11'
      }
      if(this.mm.toUpperCase().trim() === 'DICIEMBRE'){
        this.mm = '12'
      }
    }
    
    if(this.nn !== ''){
      this.evet$ = this.dataApi.eventFiltrer(null, null, this.nn);
    }else{
      if(this.cc !== ''){
        if(this.mm === ''){
          this.evet$ = this.dataApi.eventFiltrer(this.cc, null, null);
        }  
      }
      if(this.mm !== ''){
        if(this.cc === ''){
          this.evet$ = this.dataApi.eventFiltrer(null, this.mm, null);
        } 
      }
      if(this.cc === ''){
        if(this.mm === ''){
          this.evet$ = this.dataApi.eventFiltrer(null, null, null);
        }
      }
      if(this.cc !== ''){
        if(this.mm !== ''){
            this.evet$ = this.dataApi.eventFiltrer(this.cc, this.mm, null);
        }
      }
    }

    this.newFiltrer = {
      city: '',
      mon: '',
      nameF: ''
    }
   
    console.log(this.evet$);
    
  }

  deleteEvent(item: any, id: string){
    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    this.categoriesEvent = item.categories
    for(let i=0; i<this.categoriesEvent.length; i++){
       this.dataApi.deleteCategorie(this.categoriesEvent[i].id)
    }
    this.dataApi.deleteInsEvent(id);
    this.dataApi.deleteEvent(id)
      .then(res=>{
        if(res){
          Swal.fire(
            'Evento eliminado!',
            'Presione:',
            'success'
          ) 
        }
      }).catch(e=>{
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: e
        });
      })
  }
  
  onGoToEdit(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/agregarEventos'], this.navigationExtras);
    console.log(item)
  }
  
  onGoToSee(item: any):void {
    this.navigationExtras.state = item;
    this.route.navigate(['/home/detallesEventos'], this.navigationExtras);
  }  
  
}