    
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
  
  eventos: Observable<EventoInterface[]>;
  private eventosCollection: AngularFirestoreCollection<EventoInterface>;
  userIns: Observable<UserInscripInterface[]>;
  private userInsCollection: AngularFirestoreCollection<UserInscripInterface>;
  categors: Observable<CategoryInterface[]>;
  private categorsCollection: AngularFirestoreCollection<CategoryInterface>;

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
  usersX: CompFinal[] = [];
  usersY: CompFinal[] = [];
  usersZ: CompFinal[] = [];
  inscriptionNow: UserInscripInterface[] = [];
  Inscription: UserInscripInterface[] = [];
  InscrCompe: UserInscripInterface[] = [];
  InsCom: UserInscripInterface[] = [];

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
  place: number = 0;

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
 
  constructor(private firestore: AngularFirestore, private datePipe: DatePipe){ 

    this.eventosCollection = firestore.collection<EventoInterface>('event', ref => ref.orderBy('startTime', 'asc'));
    this.eventos = this.eventosCollection.valueChanges();
    
    this.userInsCollection = firestore.collection<UserInscripInterface>('userInscription');
    this.userIns = this.userInsCollection.valueChanges();

    this.categorsCollection = firestore.collection<CategoryInterface>('category');
    this.categors = this.categorsCollection.valueChanges();

    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.myDateHour = this.datePipe.transform(this.myDateHour, 'yyyy-MM-dd HH:mm');
    
    //this.getEvent();
  }
  
  //crea o edita los evento
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

  //retorna un observable de las categorias
  getCategory(): Observable<any> {
    return this.firestore.collection('category').snapshotChanges();
  }

  //funcion que trae los eventos segun un filtro (ciudad, mes, nombre, ciudad-mes)
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
          //console.log(this.EventF);
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
               //console.log(this.EventF);
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
              //console.log(this.EventF);
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
                  //console.log(this.EventF);
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
               //console.log(this.EventF);
               for(let l=0; l<this.EventF.length; l++){
                 this.dateEv = this.datePipe.transform(this.EventF[l].startTime, 'yyyy-MM-dd HH:mm');
                 if((this.dateEv > this.myDateHour) && (this.EventF[l].finalized !== 'true')){
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

  //trae los eventos que estan en ejecucion
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
            if((this.myDateHour >= this.datePro) && (this.myDateHour < this.hourPro) && (this.eventPro[i].finalized !== 'true')){
              this.evenP.push(this.eventPro[i]);
            }
          }
          this.conPro = 1;
        }
      });

      return this.evenP;
  }


  //obtiene la categoria que se mando a llamar
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

  //traer todos aquellos usuarios que estan compitiendo y les asigna el lugar donde quedaron, segun su tiempo de finalizacion
  getCompetenceRun(idcate: string): CompFinal[]{
    this.compRun = [];
    this.compR = [];
    this.InscrCompe = [];
    this.InsCom = [];
    this.usersCom = [];
    this.userCon = [];
    this.conRun = 0;
    this.usersCompFinish = [];
    this.place = 0;

    this.firestore.collection('competenceRunning', ref => ref.orderBy('timeEnd', 'asc')).snapshotChanges().subscribe(
      data => {
        if(this.conRun === 0){
           data.forEach((element: any) => {
             this.compRun.push({
               id: element.payload.doc.id,
               ...element.payload.doc.data()
             })
           });
           //console.log(this.compRun);
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
                  //console.log(this.InscrCompe);
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
                        //console.log(this.usersCom);
                        for(let i=0; i<this.compRun.length; i++){
                          for(let k=0; k<this.InscrCompe.length; k++){
                            for(let n=0; n<this.usersCom.length; n++){
                              if((this.compRun[i].idInscription === this.InscrCompe[k].id) && (this.InscrCompe[k].idCategory === idcate) && (this.InscrCompe[k].idUser === this.usersCom[n].id)){
                                if(this.compRun[i].state !== 'Retirado'){
                                  this.newComFina = {
                                  n: (this.place + 1),
                                  identity: this.usersCom[n].identity,
                                  firstName: this.usersCom[n].firstName,
                                  lastName: this.usersCom[n].lastName,
                                  timeStart: this.compRun[i].timeStart,
                                  timeEnd: this.compRun[i].timeEnd,
                                  timeTotal: this.compRun[i].timeTotal,
                                  state: this.compRun[i].state
                                  };
                                  this.place ++;

                                }else{
                                  this.newComFina = {
                                  n: '---',
                                  identity: this.usersCom[n].identity,
                                  firstName: this.usersCom[n].firstName,
                                  lastName: this.usersCom[n].lastName,
                                  timeStart: this.compRun[i].timeStart,
                                  timeEnd: this.compRun[i].timeEnd,
                                  timeTotal: this.compRun[i].timeTotal,
                                  state: this.compRun[i].state
                                 };
                                }

                                this.usersCompFinish.push(this.newComFina);
                                n = this.usersCom.length;

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
        } 
    });
    return this.usersCompFinish;
  }

  //este metodo obtiene las inscriciones de una determinada categoria y llama al metodo que obtiene los usuarios
  getInsUser(idCat: string): UserInterface[] {
    this.inscriptionNow = [];
    this.idUser = [];
    this.User = [];
    this.Users = [];
    this.Inscription = [];

    this.firestore.collection('userInscription').snapshotChanges().subscribe(
      data => {
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
    });

    this.Inscription = [];
    return this.getUsers();
  }

  //este metodo obtiene usuarios
  getUsers(): UserInterface[]{
    this.conUs = 0;

    this.firestore.collection('users').snapshotChanges().subscribe(
      data => {
      if(this.conUs === 0){
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

  //este metodo elimina inscriptiones de usuarios de firebase
  deleteInsUser(id: string){
    for(let i=0; i<this.inscriptionNow.length; i++){
      if(id === this.inscriptionNow[i].idUser){
        this.cont = i;
        i = this.Inscription.length;
      }
    }        
    var resulk = this.firestore.collection('userInscription').doc(this.inscriptionNow[this.cont].id).delete();
    return resulk.then((result) => true).catch(e=>false);  
  }

  //elimina las inscripciones de un evento
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
      //console.log(this.Inscription);
      for(let i=0; i<this.Inscription.length; i++){
        if(this.Inscription[i].idEvent === idEvent){
          this.firestore.collection('userInscription').doc(this.Inscription[i].id).delete();
          //console.log(this.Inscription[i]);
        }

     }
    });
    this.Inscription = [];
  }

  //elimina las inscripciones de una determinada categoria
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
      //console.log(this.Inscription);
      for(let i=0; i<this.Inscription.length; i++){
        if(this.Inscription[i].idCategory === idCatego){
          this.firestore.collection('userInscription').doc(this.Inscription[i].id).delete();
          //console.log(this.Inscription[i]);
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

  //elimina una determinada categoria
  deleteCategorie(id:string){
    
    var resukt = this.firestore.collection('category').doc(id).delete();
    return resukt.then((result)=>true).catch(e=>false);

  }

  //elimina un determinado evento
  deleteEvent(eventId:string){
    
    var resukt = this.firestore.collection('event').doc(eventId).delete();
    return resukt.then((result)=>true).catch(e=>false);

  }

  //no se esta usando
  /*getEvent():void {
     this.eventos = this.eventosCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as EventoInterface))
     );
  }*/

  //no se esta usando
  /*getCategory(id: string): Observable<any>{
    return this.firestore.collection('category').doc(id).snapshotChanges();
  }*/

}
