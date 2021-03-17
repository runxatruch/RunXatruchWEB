    
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoryModel } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
      private firestore: AngularFirestore
  ) { }
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