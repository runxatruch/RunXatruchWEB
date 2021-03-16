import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment.prod';

import * as Mapboxgl from 'mapbox-gl';
import { distinctUntilChanged } from 'rxjs/operators';

interface Category{
  nameCategory: string;
  ageMin: number;
  ageMax: number;
  prize: string;
}

@Component({
  selector: 'app-agregarEventos',
  templateUrl: './agregarEventos.component.html',
  styleUrls: ['./agregarEventos.component.css']
})

export class AgregarEventosComponent implements OnInit{
  

  //esta es la funcion que te puede servir
  categories: Category [] = [
    { nameCategory: 'basica',
      ageMin: 5,
      ageMax: 10,
      prize: 'Primer Lugar'
    },
  ]
  ///////////////////////////////////

  patrocinadoresList: string [] = ['Gurpo Intur', 'Corporacion Flores', 'Lacthosa Sula', 'Banco Atlantida', 'Coca Cola'];
  private _premios: string [] = ['Primer Lugar', 'Primeros dos lugares', 'Primeros tres lugares'];
  private _ciudades: string [] = ['Tegucigalpa', 'San Pedro Sula', 'Cortes', 'Olancho', 'Comayagua'];
  private _edad: number [] = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,
                              51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
  
  newCategory: Category = {
    nameCategory: '',
    ageMin: 0,
    ageMax: 0,
    prize: '' 
  }

  addCategories() {
    if(this.newCategory.nameCategory.trim().length === 0){return;}
    console.log(this.newCategory.nameCategory);
    this.categories.push( this.newCategory );
    this.newCategory = {
      nameCategory: '',
      ageMin: 0,
      ageMax: 0,
      prize: '' 
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

  //MAPA
  map!: Mapboxgl.Map;
  ruta = new Array();
  distance = new Array();
  

  ngOnInit() {
    this.cargarMapa()
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
    //Mapboxgl.accessToken = environment.mapboxKey;
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
        })


    })
      
  }
  // crearRut(){
  //   console.log(this.ruta)
  // }
  



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
  console.clear()
  console.log(this.ruta)
}

calculateDistance(){
  this.distance = Array()
  const inicioLat = (this.ruta[0][1])
  const inicioLong = (this.ruta[0][0])
  const finLat = (this.ruta[this.ruta.length-1][1])
  const finLong = (this.ruta[this.ruta.length-1][0])
  const distanceR = this.getKilometros(inicioLat,inicioLong,finLat,finLong) 
  this.distance.push(distanceR+" km")
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

}
