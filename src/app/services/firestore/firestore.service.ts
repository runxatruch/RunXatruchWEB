    
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

  createEvent(data:any){
    
    var resukt = this.firestore.collection('event').add(data)
    return resukt.then((result)=>result.id);

  }

  deleteCategorie(id:string){
    
    var resukt = this.firestore.collection('category').doc(id).delete();
    return resukt.then((result)=>true).catch(e=>false);

  }


}
