    
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoInterface } from 'src/app/interface/interface';
import { CategoryModel } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  eventos: Observable<EventoInterface[]>;
  private eventosCollection: AngularFirestoreCollection<EventoInterface>;

  constructor(
      private firestore: AngularFirestore
  ) { 
    this.eventosCollection = firestore.collection<EventoInterface>('event');
    this.eventos = this.eventosCollection.valueChanges();
    this.getEvent();
  }

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
  }

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


  //Agregar nueva categoria
  createCategorie(data:any){
    
    var resukt = this.firestore.collection('category').add(data)
    return resukt.then((result)=>{
      return {"id":result.id, "name":data.nameCategory, "rankEge": {"min":data.ageMin, "max":data.ageMax}}
    });

  }



  deleteCategorie(id:string){
    
    var resukt = this.firestore.collection('category').doc(id).delete();
    return resukt.then((result)=>true).catch(e=>false);

  }

  deleteEvent(eventId:string){
    
    var resukt = this.firestore.collection('event').doc(eventId).delete();
    return resukt.then((result)=>true).catch(e=>false);

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

}
