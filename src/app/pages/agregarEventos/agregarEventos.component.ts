import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../../environments/environment.prod';
import Swal from 'sweetalert2';



import * as Mapboxgl from 'mapbox-gl';
import { distinctUntilChanged } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { NavigationExtras, Router } from '@angular/router';
import { EventoInterface, CategoryInterface } from '../../interface/interface';
import { element } from 'protractor';

interface Category{
  nameCategory: string;
  ageMin: number;
  ageMax: number;
  prize: string;
  km: number;
  rute: any[];
}

interface Evento{
  nameEvent: string;
  startTime: string;
  endTime: string;
  inscriptionTime:string;
  city: string;
  descripEvent: string;
  patrocinator: [];
  categories: any[]
}

@Component({
  selector: 'app-agregarEventos',
  templateUrl: './agregarEventos.component.html',
  styleUrls: ['./agregarEventos.component.css']
})



export class AgregarEventosComponent implements OnInit{
  categoriasAlmacenadas:Category[] = [];
  valueEvent: EventoInterface | any;
  indexCat: number;
  indd: number[] = [];
  categg: Category[] = [];
  cont: number = 0;
  //eventForm: FormGroup = new FormGroup({});
  //private isEmail = '/\S+@\S+\.\S+/';
  //resulS: string = '';
  navigationCate: NavigationExtras = {
    state: {

    }
  };
  navigationExtras: NavigationExtras = {
    state: {
     
    }
  };

  OnInit() {}
  constructor (
    private firestore: FirestoreService, private rout: Router, private fb: FormBuilder){
      const navigation = this.rout.getCurrentNavigation();
      this.valueEvent = navigation?.extras?.state;
      this.indexCat = -1;  

  }

  datosR: Category []= [];
  
  categories: Category [] = [
  ]

  categor: CategoryInterface [] = [
  ]

  events: Evento[] = [

  ]

  idEdi: string = '';
  
  cates: CategoryInterface[] = []

  patrocinadoresList: string [] = ['Gurpo Intur', 'Corporacion Flores', 'Lacthosa Sula', 'Banco Atlantida', 'Coca Cola'];
  private _premios: string [] = ['Primer Lugar', 'Primeros dos lugares', 'Primeros tres lugares'];
  _ciudades: string [] = ['Tegucigalpa', 'San Pedro Sula', 'Cortes', 'Olancho', 'Comayagua'];
  private _edad: number [] = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,
                              51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
  
  newCategory: Category = {
    //id: '',
    nameCategory: '',
    ageMin: 0,
    ageMax: 0,
    prize: '',
    km: 0.0,
    rute: []
  }

  newEvent: Evento={
    nameEvent: '',
    startTime: '',
    endTime: '',
    inscriptionTime: '',
    city: '',
    descripEvent: '',
    patrocinator: [],
    categories: []
  }


  newCategoryR: Category = {
    //id: '',
    nameCategory: '',
    ageMin: 0,
    ageMax: 0,
    prize: '',
    km: 0.0,
    rute: []
  }

  //al asignar los datos que vienen al editar al newEvent, aqui se le asignan a oldCategory
  //para poder limpiar cuando se selecciona una nueva y no directamente al newCategory
  updateCategory(index: number){

    if(this.newEvent.categories[index].id !== null){
      this.idEdi = this.newEvent.categories[index].id;
      this.newCategory = {
        nameCategory: '',
        ageMin: 0,
        ageMax: 0,
        prize: '',
        km: 0.0,
        rute: []
      };
      this.categor = [];
      console.log('depu 1');
      this.cont = 0;
  
      this.firestore.getCategory().subscribe(
        data => {
          if(this.cont === 0){this.categor = [];
          data.forEach((element: any) => {
            this.categor.push({
              id: element.payload.id,
              ...element.payload.doc.data()
            })
            console.log('aqui fuera');
          });
          console.log('depu 2');
          for(let i=0; i<this.categor.length; i++){
            if(this.idEdi === this.categor[i].id){
              this.newCategory = this.categor[i];
              this.newEvent.categories[index] = this.newCategory;
              i = this.categor.length;  
            }
          }
          this.cont = 1;
       }
       });
    }

    this.indexCat = index;
  }

  //funciona pero crea algunos errores
  //verifica si el id existe(ver funcion principal en servicios), si no, lo crea
  addCategories() {
    if(this.validValues()==false){
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'Campos vacios o incorrectos'
      });}
    else{
      Swal.fire({
        allowOutsideClick: false,
        title: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
    const cateId = this.newEvent.categories[this.indexCat]?.id || null;
    var firestoreres = this.firestore.createCategorie(this.newCategory, cateId)
    firestoreres.then((res)=>{
    if(res.id!==cateId){
      this.newEvent.categories.push({"id":res.id,"nameCategory":res.nameCategory,"ageMin":res.ageMin,"ageMax":res.ageMax,"prize":res.prize,"km":res.km})
      console.log(`******** ${ this.newEvent.categories[0].id}`);
    }
      Swal.fire(
        'Categoria agregada con éxito!',
        'Presione:',
        'success'
      )
    }).catch((e)=>{

      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: e
      });
    })
    ;
    this.categories.push( this.newCategory);
    this.newCategory = {
      //id: '',
      nameCategory: '',
      ageMin: 0,
      ageMax: 0,
      prize: '',
      km: 0.0,
      rute: []
    }
    this.ruta = []
    this.distance = []
    this.cargarMapa()
    this.indd.push(this.indexCat);
    this.indexCat = -1;
  }
}

  addEvent(){
    
    if(this.validValuesEvent()==false)
    {
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'Campos vacios o incorrectos'
      });;
    }
    else{
      Swal.fire({
        allowOutsideClick: false,
        title: 'info',
        text: 'Espere por favor...'
      });
    //const evento = this.eventForm.value;
    for(let i=0; i<this.newEvent.categories.length; i++){    
      if(this.newEvent.categories[i].rute !== undefined || null){
        this.newEvent.categories[i].rute = [];
      }
    }
    const eventoId = this.valueEvent?.id || null; 
    this.firestore.createEvent(this.newEvent, eventoId).then((value)=>{
      Swal.fire(
        'Evento agregado con éxito!',
        'Presione:',
        'success'
      )
    }).catch((e)=>{

      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: e
      });
    })
    this.newEvent = {
      nameEvent: '',
      startTime: '',
      endTime: '',
      inscriptionTime: '',
      city: '',
      patrocinator: [],
      descripEvent: '',
      categories:[]
    }
    this.categories = [];
    this.indd = [];
  Swal.fire(
    'Evento agregado con éxito!',
    'Presione:',
    'success'
  )
  }
}
  
  patrocinadores = new FormControl();
  
  get premios(): string [] {
    return [...this._premios];
  }
  get ciudades(): string[] {
    return [...this._ciudades];
  }

  get edad(): number [] {
    return [...this._edad];
  }

  //funcion que borra las categorias
  deleteCategory(index: number){
    console.log(this.categoriasAlmacenadas);
    Swal.fire({
      allowOutsideClick: false,
      title: 'info',
      text: 'Espere por favor...'
    });
    this.firestore.deleteInsCate(this.newEvent.categories[index].id);
    this.firestore.deleteCategorie(this.newEvent.categories[index].id)   
      .then(res=>{
        if(res){
          Swal.fire(
            'Categoria eliminada!',
            'Presione:',
            'success'
          )
          this.categories.splice(index, 1);
          this.newEvent.categories.slice(index,1);  
          this.newEvent.categories.splice(index, 1);
        }

      }).catch(e=>{
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar',
          text: e
        });
        
      })
  }

  //MAPA
  map!: Mapboxgl.Map;
  ruta = new Array();
  distance = new Array();
  
  ngOnInit(): void {
    this.cargarMapa()

    if (typeof this.valueEvent === 'undefined'){
      this.rout.navigate(['/home/agregarEventos']);
    }else{
      this.newEvent = this.valueEvent;
    }
  }

  cargarMapa(){
    if (!navigator.geolocation){
      console.log('location is not supported')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      const coords = position.coords;
        (Mapboxgl as any).accessToken = environment.mapboxKey;
        this.map = new Mapboxgl.Map({
        //accessToken : environment.mapboxKey,
        container: 'mapa-mapbox', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords.longitude, coords.latitude], // starting position
        zoom: 14 // starting zoom
      });
    this.crearMarcador();
    //this.crearRuta()
    console.log(this.ruta)
    });
  }
  crearMarcador(){
    this.map.on('click', (e)=>{
      console.log(e.lngLat.toString());
      const marker = new Mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(this.map);
        marker.on('drag', () =>{
          console.log(marker.getLngLat())
          this.ruta.push([marker.getLngLat().lng, marker.getLngLat().lat]);
          this.newCategory.rute.push({"lat":marker.getLngLat().lat, "log":marker.getLngLat().lng});
        })


    })
      
  }

  crearRuta() {
    //this.map.on('load', ()=>{
      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': this.ruta
          }
          }
      })
      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });

    //});
    //console.log(this.ruta[0][1])
  
}
deleteRuta(){
  this.cargarMapa()
  this.ruta = Array();
  this.distance= Array()
  this.newCategory.km = 0.0
  console.clear()
  console.log(this.ruta)
  this.newEvent.categories[this.indexCat].rute = [];
}

calculateDistance(){
  this.distance = Array()
  const inicioLat = (this.ruta[0][1])
  const inicioLong = (this.ruta[0][0])
  const finLat = (this.ruta[this.ruta.length-1][1])
  const finLong = (this.ruta[this.ruta.length-1][0])
  const distanceR = this.getKilometros(inicioLat,inicioLong,finLat,finLong) 
  this.distance.push(distanceR+" km")
  this.newCategory.km = Number(distanceR)

}

getKilometros= function(lat1: number,lon1: number,lat2: number,lon2: number){
 const rad = function(x: number) {return x*Math.PI/180;}
var R = 6378.137; //Radio de la tierra en km
 var dLat = rad( lat2 - lat1 );
 var dLong = rad( lon2 - lon1 );
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 var d = R * c;
return d.toFixed(3); //Retorna tres decimales
 }

 //validacion categoria
 validValues(){
   if(this.newCategory.nameCategory==''
   || this.newCategory.ageMax==0 || this.newCategory.ageMin==0
   || this.newCategory.prize==''
   || this.newCategory.km==0.0){
   
     
    return false;}
   else 
   
   return true;
 }

 validValuesEvent(){
  if(this.newEvent.nameEvent==''
  || this.newEvent.startTime=='' 
  || this.newEvent.endTime==''
  || this.newEvent.inscriptionTime==''
  || this.newEvent.city==''
  || this.newEvent.descripEvent==''
  || this.newEvent.patrocinator.length==0
  || this.newEvent.categories.length==0){
    
   return false;}
  else 
  
  return true;
 }


}