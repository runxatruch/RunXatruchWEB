    
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoInterface} from 'src/app/interface/interface';
import { CategoryModel } from '../../models/category.model';
import { CategoryInterface, UserInscripInterface, UserInterface} from '../../interface/interface';
import {DatePipe} from '@angular/common';
import { promise } from 'selenium-webdriver';
import { element } from 'protractor';


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

  EventF: EventoInterface[] = [];

  EveF: EventoInterface[] = [];

  eventPro: EventoInterface[] = [];

  evenP: EventoInterface[] = [];

  idUser: string[] = [];

  cont: number = 0;

  conUs: number = 0;

  conEve: number = 0;

  conPro: number = 0;

  dateEv: any = '';

  datePro: any = '';
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

    //((dateNow | date:'yyyy-MM') === (item.startTime | date:'yyyy-MM')) || ((dateNext | date:'yyyy-MM') === (item.startTime | date:'yyyy-MM'))
    
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

    this.categorsCollection = firestore.collection<CategoryInterface>('category');
    this.categors = this.categorsCollection.valueChanges();
    //this.getEvent();

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

   //no se esta usando
  /*getEvent():void {
     this.eventos = this.eventosCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as EventoInterface))
     );
  }*/

  getCategory(): Observable<any> {
    return this.firestore.collection('category').snapshotChanges();
  }

  //no se esta usando
  /*getCategory(id: string): Observable<any>{
    return this.firestore.collection('category').doc(id).snapshotChanges();
  }*/

  //funcion que trae los eventos segun un filtro
  eventFiltrer(city: string | null, dateMon: string | null, name: string | null): EventoInterface[]{
    this.EveF = [];
    this.EventF = [];
    this.conEve = 0;

    if(name !== null){
      this.firestore.collection('event', ref => ref.orderBy('startTime', 'asc')).snapshotChanges().subscribe(
        data => {
        if(this.conEve === 0){
          data.forEach((element: any) => {
            this.EventF.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          console.log(this.EventF);
          for(let h=0; h<this.EventF.length; h++){
            if(this.EventF[h].nameEvent.toUpperCase().trim() === name.toUpperCase().trim()){
              this.EveF.push(this.EventF[h]);
            }
          }
          this.conEve = 1;
        }
      })
    }else{
      if(city !== null){
        if(dateMon === null){
          this.firestore.collection('event', ref => ref.orderBy('startTime', 'asc')).snapshotChanges().subscribe(
           data => {
             if(this.conEve === 0){
               data.forEach((element: any) => {
                 this.EventF.push({
                   id: element.payload.doc.id,
                   ...element.payload.doc.data()
                 })     
               });
               console.log(this.EventF);
               for(let i=0; i<this.EventF.length; i++){
                  if(this.EventF[i].city.toUpperCase().trim() === city.toUpperCase().trim()){
                     this.EveF.push(this.EventF[i]);
                  }
               }
               this.conEve = 1;
             }
         });
        }
      }
      if(dateMon !== null){
        if(city === null){
         this.firestore.collection('event', ref => ref.orderBy('startTime', 'asc')).snapshotChanges().subscribe(
           data => {
            if(this.conEve === 0){
              data.forEach((element: any) => {
                this.EventF.push({
                  id: element.payload.doc.id,
                  ...element.payload.doc.data()
                })
              });
              console.log(this.EventF);
              for(let j=0; j<this.EventF.length; j++){
                if(this.EventF[j].startTime.substr(5,2) === dateMon){
                  this.EveF.push(this.EventF[j]);
                }
              }
              this.conEve = 1;
            }
         });
        }
      }
      if(city !== null){
        if(dateMon !== null){
           this.firestore.collection('event', ref => ref.orderBy('startTime', 'asc')).snapshotChanges().subscribe(
             data => {
                if(this.conEve === 0){
                  data.forEach((element: any) => {
                    this.EventF.push({
                      id: element.payload.id,
                      ...element.payload.doc.data()
                    })
                  });
                  console.log(this.EventF);
                  for(let k=0; k<this.EventF.length; k++){
                     if(this.EventF[k].city.toUpperCase().trim() === city.toUpperCase().trim()){
                       if(this.EventF[k].startTime.substr(5,2) === dateMon){
                         this.EveF.push(this.EventF[k]);
                       }
                     }
                  }
                  this.conEve = 1;
                }
             });
        }
      }
      if(city === null){
        if(dateMon === null){
         this.firestore.collection('event', ref => ref.orderBy('startTime', 'asc')).snapshotChanges().subscribe(
           data => {
             if(this.conEve === 0){
               data.forEach((element: any) => {
                 this.EventF.push({
                   id: element.payload.doc.id,
                   ...element.payload.doc.data()
                 })
               });
               console.log(this.EventF);
               for(let l=0; l<this.EventF.length; l++){
                 this.dateEv = this.datePipe.transform(this.EventF[l].startTime, 'yyyy-MM-dd');
                 if(this.dateEv >= this.myDate){
                   this.EveF.push(this.EventF[l]);
                 }
               }
               this.conEve = 1;

             }
         });
        }
      }
    }

    return this.EveF;
  }

  //evento en proceso
  eventProcess(): EventoInterface[]{
    this.evenP = [];
    this.eventPro = [];
    this.conPro = 0;
    this.firestore.collection('event', ref => ref.orderBy('startTime', 'asc')).snapshotChanges().subscribe(
      data => {
        if(this.conPro === 0){
          data.forEach((element: any) => {
            this.eventPro.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          console.log(this.eventPro);
          for(let i=0; i<this.eventPro.length; i++){
            this.datePro = this.datePipe.transform(this.eventPro[i].startTime, 'yyyy-MM-dd');
            if(this.datePro === this.myDate){
              this.evenP.push(this.eventPro[i]);
            }
          }
          this.conPro = 1;
        }
      });

      return this.evenP;
  }



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
