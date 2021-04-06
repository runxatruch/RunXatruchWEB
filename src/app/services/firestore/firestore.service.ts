    
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoInterface} from 'src/app/interface/interface';
import { CategoryModel } from '../../models/category.model';
import { CategoryInterface, UserInscripInterface, UserInterface} from '../../interface/interface';
import {DatePipe} from '@angular/common';
import { promise } from 'selenium-webdriver';


interface CategoryI{
  id: string;
  nameCategory: string;
  ageMin: number;
  ageMax: number;
  prize: string;
  km: number;
  rute: any[];
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  myDate: Date | any = new Date();// el dia actual

  Users: UserInterface[] = [];

  User: UserInterface[] = [];

  categories: CategoryI[] = [];

  category: CategoryI[] = [];

  idUser: string[] = [];

  cont: number = 0;

  conUs: number = 0;
  //resu: Promise<boolean>;

  inscriptionNow: UserInscripInterface[] = [];

  //newCategory2: CategoryI;

  Inscription: UserInscripInterface[] = [];

  eventos: Observable<EventoInterface[]>;
  private eventosCollection: AngularFirestoreCollection<EventoInterface>;

  userIns: Observable<UserInscripInterface[]>;
  private userInsCollection: AngularFirestoreCollection<UserInscripInterface>;

  categors: Observable<CategoryInterface[]>;
  private categorsCollection: AngularFirestoreCollection<CategoryInterface>;

  constructor(
      private firestore: AngularFirestore, private datePipe: DatePipe
  ) { 
    this.eventosCollection = firestore.collection<EventoInterface>('event', ref => ref.orderBy('startTime', 'asc'));
    this.eventos = this.eventosCollection.valueChanges();
    
    this.userInsCollection = firestore.collection<UserInscripInterface>('userInscription');
    this.userIns = this.userInsCollection.valueChanges();

    /*
    this.newCategory2 = {
      id: '',
      nameCategory: '',
      ageMin: 0,
      ageMax: 0,
      prize: '',
      km: 0.0,
      rute: []
    }*/
    
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.categorsCollection = firestore.collection<CategoryInterface>('category');
    this.categors = this.categorsCollection.valueChanges();
    this.getEvent();

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

  getCategory(): Observable<any> {
    return this.firestore.collection('category').snapshotChanges();
  }

  /*getCategory(id: string): Observable<any>{
    return this.firestore.collection('category').doc(id).snapshotChanges();
  }*/

  getOneCate(id: string): CategoryI[]{
    this.category = [];
    this.firestore.collection('category').snapshotChanges().subscribe(
      data => {this.categories = [];
      data.forEach((element: any) => {
        this.categories.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      for(let i=0; i<this.categories.length; i++){
        if(this.categories[i].id === id){
          this.category.push(this.categories[i]);
          i = this.categories.length;
        }
      }
      });
    return this.category;
  }

  getInsUser(idCat: string): UserInterface[] {
    this.inscriptionNow = [];
    this.idUser = [];
    this.User = [];
    this.Users = [];
    this.Inscription = [];
    //this.conUs = 0;

    this.firestore.collection('userInscription').snapshotChanges().subscribe(
      data => {
      //if(this.conUs === 0){
      this.Inscription = [];
      data.forEach((element: any) => {
        this.Inscription.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      for(let i=0; i<this.Inscription.length; i++){
        if(this.Inscription[i].idCategory === idCat){
          this.idUser.push(this.Inscription[i].idUser);
          this.inscriptionNow.push(this.Inscription[i]);
        }
      }
     //console.log(this.idUser);
      //this.conUs = 1;
     //}
    });
    console.log('llevo estos id')
    console.log(this.idUser);
    //console.log(this.inscriptionNow);
    this.Inscription = [];
    return this.getUsers();
  }

  getUsers(): UserInterface[]{
    this.conUs = 0;
    this.firestore.collection('users').snapshotChanges().subscribe(
      data => {
      if(this.conUs === 0){//this.Users = [];
      data.forEach((element: any) => {
        this.Users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //console.log(this.Users);
      for(let i=0; i<this.Users.length; i++){
        for(let j=0; j<this.idUser.length; j++){
          if(this.Users[i].id === this.idUser[j]){
            this.User.push(this.Users[i]);
            j = this.idUser.length;
          }
        }
      }
      this.conUs = 1;
      }
    });
    return this.User;
  }

  deleteInsUser(id: string){
    for(let i=0; i<this.inscriptionNow.length; i++){
      if(id === this.inscriptionNow[i].idUser){
        this.cont = i;
        i = this.Inscription.length;
      }
    }        
    var resulk = this.firestore.collection('userInscription').doc(this.inscriptionNow[this.cont].id).delete();
    return resulk.then((result) => true).catch(e=>false);  
    //return this.resu;
  }

  deleteInsEvent(idEvent: string){
    this.Inscription = [];
    this.firestore.collection('userInscription').snapshotChanges().subscribe(
      data => {this.Inscription = [];
      data.forEach((element: any) => {
        this.Inscription.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log('estos habian');
      console.log(this.Inscription);
      for(let i=0; i<this.Inscription.length; i++){
        if(this.Inscription[i].idEvent === idEvent){
          //this.idUser.push(this.Inscription[i].idUser);
          //this.inscriptionNow.push(this.Inscription[i]);
          this.firestore.collection('userInscription').doc(this.Inscription[i].id).delete();
          console.log('estos borre')
          console.log(this.Inscription[i]);
        }

     }
     //console.log(this.idUser);
    });
    this.Inscription = [];
    //var resulk = 
    //return resulk.then((result) => true).catch(e=>false);
  }

  deleteInsCate(idCatego: string){
    this.Inscription = [];
    this.firestore.collection('userInscription').snapshotChanges().subscribe(
      data => {this.Inscription = [];
      data.forEach((element: any) => {
        this.Inscription.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log('estos habian');
      console.log(this.Inscription);
      for(let i=0; i<this.Inscription.length; i++){
        if(this.Inscription[i].idCategory === idCatego){
          this.firestore.collection('userInscription').doc(this.Inscription[i].id).delete();
          console.log('estos borre')
          console.log(this.Inscription[i]);
        }
      }
    });
    this.Inscription = [];
  }

  //si el id ya existe solo sobreescribe ahi mismo  
  createCategorie(data: CategoryInterface, cateId: string){
    const id = cateId || this.firestore.createId();
    const dat = {id, ...data};
    var resukt = this.categorsCollection.doc(id).set(dat)
    return resukt.then((result)=>{
      return {"result":result, "id":dat.id, "nameCategory":dat.nameCategory, "ageMin":dat.ageMin, "ageMax":dat.ageMax, "prize":dat.prize, "km":dat.km}
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

}
