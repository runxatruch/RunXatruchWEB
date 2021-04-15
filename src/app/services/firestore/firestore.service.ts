    
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoInterface} from 'src/app/interface/interface';
import { CategoryModel } from '../../models/category.model';
import { CategoryInterface, UserInscripInterface, UserInterface, CompetenceRun, CompFinal } from '../../interface/interface';
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

  myDateHour: Date | any = new Date();

  Users: UserInterface[] = [];

  User: UserInterface[] = [];

  usersCom: UserInterface[] = [];

  userCon: UserInterface[] = [];

  categories: CategoryI[] = [];

  category: CategoryI[] = [];

  EventF: EventoInterface[] = [];

  EveF: EventoInterface[] = [];

  eventPro: EventoInterface[] = [];

  evenP: EventoInterface[] = [];

  compRun: CompetenceRun[] = [];

  compR: CompetenceRun[] = [];

  usersCompFinish: CompFinal[] = [];

  conRun: number = 0;

  conI: number = 0;

  idUser: string[] = [];

  cont: number = 0;

  conUs: number = 0;

  conU: number = 0;

  conEve: number = 0;

  conPro: number = 0;

  dateEv: any = '';

  datePro: any = '';

  hourEv: any = '';

  hourPro: any = '';

  newComFina: CompFinal = {
    n: 0,
    identity: '',
    firstName: '',
    lastName: '',
    timeStart: '',
    timeEnd: '',
    timeTotal: '',
    state: ''
  }
  //resu: Promise<boolean>;

  inscriptionNow: UserInscripInterface[] = [];

  //newCategory2: CategoryI;

  Inscription: UserInscripInterface[] = [];

  InscrCompe: UserInscripInterface[] = [];

  InsCom: UserInscripInterface[] = [];

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

    this.myDateHour = this.datePipe.transform(this.myDateHour, 'yyyy-MM-dd HH:mm');
    
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
              this.EventF[h].startTime = this.datePipe.transform(this.EventF[h].startTime, 'yyyy-MM-dd HH:mm');
              this.EventF[h].endTime = this.datePipe.transform(this.EventF[h].endTime, 'yyyy-MM-dd HH:mm');
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
                    this.EventF[i].startTime = this.datePipe.transform(this.EventF[i].startTime, 'yyyy-MM-dd HH:mm');
                    this.EventF[i].endTime = this.datePipe.transform(this.EventF[i].endTime, 'yyyy-MM-dd HH:mm'); 
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
                  this.EventF[j].startTime = this.datePipe.transform(this.EventF[j].startTime, 'yyyy-MM-dd HH:mm');
                  this.EventF[j].endTime = this.datePipe.transform(this.EventF[j].endTime, 'yyyy-MM-dd HH:mm');
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
                        this.EventF[k].startTime = this.datePipe.transform(this.EventF[k].startTime, 'yyyy-MM-dd HH:mm');
                        this.EventF[k].endTime = this.datePipe.transform(this.EventF[k].endTime, 'yyyy-MM-dd HH:mm');
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
                 this.dateEv = this.datePipe.transform(this.EventF[l].startTime, 'yyyy-MM-dd HH:mm');
                 if(this.dateEv > this.myDateHour){
                  this.EventF[l].startTime = this.datePipe.transform(this.EventF[l].startTime, 'yyyy-MM-dd HH:mm');
                  this.EventF[l].endTime = this.datePipe.transform(this.EventF[l].endTime, 'yyyy-MM-dd HH:mm');
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
          //console.log(this.eventPro);
          for(let i=0; i<this.eventPro.length; i++){
            this.datePro = this.datePipe.transform(this.eventPro[i].startTime, 'yyyy-MM-dd HH:mm');
            this.hourPro = this.datePipe.transform(this.eventPro[i].endTime, 'yyyy-MM-dd HH:mm');
            if((this.myDateHour >= this.datePro) && (this.myDateHour <= this.hourPro) && (this.eventPro[i].finalized !== 'true')){
              this.eventPro[i].startTime = this.datePipe.transform(this.eventPro[i].startTime, 'yyyy-MM-dd HH:mm');
              this.eventPro[i].endTime = this.datePipe.transform(this.eventPro[i].endTime, 'yyyy-MM-dd HH:mm');
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

  getCompetenceRun(idcate: string): CompFinal[]{
    this.compRun = [];
    this.compR = [];
    this.InscrCompe = [];
    this.InsCom = [];
    this.usersCom = [];
    this.userCon = [];
    this.conRun = 0;
    this.usersCompFinish = [];
    /*this.newComFina = {
      n: 0,
      identity: '',
      firstName: '',
      lastName: '',
      timeStart: '',
      timeEnd: '',
      timeTotal: ''
    }*/
    //this.conI = 0;

    this.firestore.collection('competenceRunning').snapshotChanges().subscribe(
      data => {
        if(this.conRun === 0){
           data.forEach((element: any) => {
             this.compRun.push({
               id: element.payload.doc.id,
               ...element.payload.doc.data()
             })
           });
           console.log(this.compRun);
           this.conI = 0;
           this.firestore.collection('userInscription').snapshotChanges().subscribe(
             data => {
               if(this.conI === 0){
                  data.forEach((element: any) => {
                    this.InscrCompe.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    }) 
                  });
                  console.log(this.InscrCompe);
                  this.conU = 0;
                  this.firestore.collection('users').snapshotChanges().subscribe(
                    data => {
                      if(this.conU === 0){
                        data.forEach((element: any) => {
                          this.usersCom.push({
                            id: element.payload.doc.id,
                            ...element.payload.doc.data()
                          })
                        });
                        console.log(this.usersCom);
                        for(let i=0; i<this.compRun.length; i++){
                          for(let k=0; k<this.InscrCompe.length; k++){
                            for(let n=0; n<this.usersCom.length; n++){
                              if((this.compRun[i].idInscription === this.InscrCompe[k].id) && (this.InscrCompe[k].idCategory === idcate) && (this.InscrCompe[k].idUser === this.usersCom[n].id)){
                                this.newComFina.n = i;
                                this.newComFina = {
                                  n: i,
                                  identity: this.usersCom[n].identity,
                                  firstName: this.usersCom[n].firstName,
                                  lastName: this.usersCom[n].lastName,
                                  timeStart: this.compRun[i].timeStart,
                                  timeEnd: this.compRun[i].timeEnd,
                                  timeTotal: this.compRun[i].timeTotal,
                                  state: this.compRun[i].state
                                }
                                /*this.newComFina.identity = this.usersCom[n].identity;
                                this.newComFina.firstName = this.usersCom[n].firstName;
                                this.newComFina.lastName = this.usersCom[n].lastName;
                                this.newComFina.timeStart = this.compRun[i].timeStart;
                                this.newComFina.timeEnd = this.compRun[i].timeEnd;
                                this.newComFina.timeTotal = this.compRun[i].timeTotal;*/
                                
                                this.usersCompFinish.push(this.newComFina);
                                console.log('funcion begin');
                                this.compR.push(this.compRun[i]);
                                this.InsCom.push(this.InscrCompe[k]);
                                this.userCon.push(this.usersCom[n]);
                                console.log(this.compR);
                                console.log(this.InsCom);
                                console.log(this.userCon);
                                console.log(this.usersCompFinish);
                                console.log('funcion finish');
                                n = this.usersCom.length;
                                /*this.newComFina = {
                                  n: 0,
                                  identity: '',
                                  firstName: '',
                                  lastName: '',
                                  timeStart: '',
                                  timeEnd: '',
                                  timeTotal: ''
                                }*/ 
                              }
                            }
                          }
                        }
                        this.conU = 1;
                      }
                  });
                  this.conI = 1;
               }
           });
           this.conRun = 1;

           /*for(let i=0; i<this.compRun.length; i++){
             for(let k=0; k<this.inscriptionNow.length; k++){
                if(this.compRun[i].idInscription === this.inscriptionNow[k].id){
                  this.compR.push(this.compRun[i]);
                  console.log(this.compR);
                  k = this.inscriptionNow.length;
                }
             }

           }*/
        }
    });
    return this.usersCompFinish;
  }

  getInscription(idCat: string){

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
