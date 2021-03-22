
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CategoryModel } from '../../models/category.model';
import { CategoryInterface, EventoInterface } from '../../pages/agregarEventos/agregarEventos.component';
import { map } from 'rxjs/operators';
import { ModelEven } from '../../models/interface.interface';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  eventos: Observable<ModelEven[]>;

  private eventosCollection: AngularFirestoreCollection<ModelEven>;

  constructor(
      private firestore: AngularFirestore
  ) { 

    this.eventosCollection = firestore.collection<ModelEven>('pruebaE');
    this.eventos = this.eventosCollection.valueChanges();
    this.getEvent();
    /*this.categoCollection = firestore.collection<CategoryInterface>('category');
    this.catego = this.categoCollection.valueChanges();

    this.eventoCollection = firestore.collection<EventoInterface>('event');
    this.even = this.eventoCollection.valueChanges();

    this.eventoDoc = firestore.doc<EventoInterface>('event');
    this.evenD = this.eventoDoc.valueChanges();*/
  }

  onDeleteEvent(eventId: string):Promise<void> {
    return new Promise(async (resolve, reject) => {
      try{
        const result = await this.eventosCollection.doc(eventId).delete();
        resolve(result);
      }catch(err){
         reject(err.message);
      }
    });
  }

  onSaveEvent(event: ModelEven, eventId: string): Promise<void>{
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
  }

  getEvent():void {
     this.eventos = this.eventosCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as ModelEven))
     );
  }
  /*idEvent: string = '';
  private categoCollection: AngularFirestoreCollection<CategoryInterface>;
  private catego: Observable<CategoryInterface[]>; 

  private eventoCollection: AngularFirestoreCollection<EventoInterface>;
  private even: Observable<EventoInterface[]>;

  private eventoDoc: AngularFirestoreDocument<EventoInterface | null>;
  private evenD: Observable<EventoInterface | null | undefined>;

  getCategory(){
    return this.catego = this.categoCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CategoryInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getEvent(){
    return this.even = this.eventoCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data2 = action.payload.doc.data() as EventoInterface;
          data2.id = action.payload.doc.id;
          return data2;
        });
      }))
  }

  getOneEvent(idEvent: string){
     this.eventoDoc = this.firestore.doc<EventoInterface>(`event/${idEvent}`);
     return this.evenD = this.eventoDoc.snapshotChanges().pipe( map( action => {
       if (action.payload.exists === false){
         return null;
       }else{
         const data = action.payload.data() as EventoInterface;
         data.id = action.payload.id;
         return data;
       } 
     }));
  }*/

 /* getEventPorId(idi: string){
    if(idi == this.eventoCollection.valueChanges()
    this.eventoCollection.valueChanges()
  }*/
   
  
  //Agregar nueva categoria
  createCategorie(data:any){
    
    var resukt = this.firestore.collection('category').add(data)
    return resukt.then((result)=>{
      return {"id":result.id, "name":data.nameCategory, "rankEge": [data.ageMin, data.ageMax]}
    });

  }

  createEvent(data:any){
    
    var resukt = this.firestore.collection('event').add(data)
    return resukt.then((result)=>result.id);

  }


}
