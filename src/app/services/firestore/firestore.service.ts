    
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoInterface } from 'src/app/interface/interface';
import { CategoryModel } from '../../models/category.model';
import { CategoryInterface } from '../../interface/interface';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  //dateEvents: string = '';
  //dateSistem: string = new Date().getDay();
 //$scope.CurrentDate = new Date();
 //formatDate(new Date(), 'yyyy/MM/dd', 'en');
  myDate: Date | any = new Date();// el dia actual
  eventos: Observable<EventoInterface[]>;
  private eventosCollection: AngularFirestoreCollection<EventoInterface>;

  categors: Observable<CategoryInterface[]>;
  private categorsCollection: AngularFirestoreCollection<CategoryInterface>;
/*
  cateD: Observable<CategoryInterface | any>;
  private cateDoc: AngularFirestoreDocument<CategoryInterface | any>;*/
  

  constructor(
      private firestore: AngularFirestore, private datePipe: DatePipe
  ) { 
    this.eventosCollection = firestore.collection<EventoInterface>('event');
    this.eventos = this.eventosCollection.valueChanges();

    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    //this.myDate = this.dateIpe.transform(this.myDate, 'aaaa-MM-dd');

    /*
    this.cateDoc = firestore.doc<CategoryInterface>('category');
    this.cateD = this.cateDoc.valueChanges();*/

    this.categorsCollection = firestore.collection<CategoryInterface>('category');
    this.categors = this.categorsCollection.valueChanges();
    this.getEvent();
    //this.getCategory();
  }

  //no se esta usando
  /*
  onSaveEvent(event: EventoInterface, eventId: string): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try{
        const id = eventId || this.firestore.createId();
        const data = {id, ...event};
        const result = await this.eventosCollection.doc(id).set(data);
        resolve(result); 
      }catch(err){
        reject(err.message);
      }
    });
  }*/
  
   
  createEvent(data: EventoInterface, eventId: string):Promise<void>{
    
    return new Promise(async (resolve, reject) => {
      try{
        const id = eventId || this.firestore.createId();
        const dat = {id, ...data};
        const result = await this.eventosCollection.doc(id).set(dat);
        resolve(result); 
      }catch(err){
        reject(err.message);
      }
    });
  }

  getEvent():void {
     this.eventos = this.eventosCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as EventoInterface))
     );
  }

  //trae todas las categorias, pero no se esta usando al momento
  /*
  getCategory():void{
    this.categors = this.categorsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as CategoryInterface))
    );
  }*/

  //no esta bien definido
  /*
  getOneCate(CateId: string){
    this.cateDoc = this.firestore.doc<CategoryInterface>(`category/${CateId}`);
    return this.cateD = this.cateDoc.snapshotChanges().pipe( map( action => {
      if (action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as CategoryInterface;
        data.id = action.payload.id;
        console.log(data);
        return data;
      } 
    }));
  }*/

  //si el id ya existe solo sobreescribe ahi mismo
  
  createCategorie(data: CategoryInterface, cateId: string){
    const id = cateId || this.firestore.createId();
    const dat = {id, ...data};
    var resukt = this.categorsCollection.doc(id).set(dat)
    return resukt.then((result)=>{
      return {"result":result, "id":dat.id, "nameCategory":dat.nameCategory, "ageMin":dat.ageMin, "ageMax":dat.ageMax, "prize":dat.prize, "km":dat.km}
    });
  }

 /*
  createCategorie(data:any){
    
    var resukt = this.firestore.collection('category').add(data)
    return resukt.then((result)=>{
      return {"id":result.id, "nameCategory":data.nameCategory, "ageMin":data.ageMin, "ageMax":data.ageMax, "prize":data.prize, "km":data.km}
    });
  }*/

  deleteCategorie(id:string){
    
    var resukt = this.firestore.collection('category').doc(id).delete();
    return resukt.then((result)=>true).catch(e=>false);

  }

  deleteEvent(eventId:string){
    
    var resukt = this.firestore.collection('event').doc(eventId).delete();
    return resukt.then((result)=>true).catch(e=>false);

  }


  //no se esta usando
  /* 
  onDeleteEvent(eventId: string):Promise<void> {
    return new Promise(async (resolve, reject) => {
      try{
        const result = await this.eventosCollection.doc(eventId).delete();
        resolve(result);
      }catch(err){
         reject(err.message);
      }
    });
  }*/

}
