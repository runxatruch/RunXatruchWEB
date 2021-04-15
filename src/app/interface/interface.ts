import { Timestamp } from "rxjs";

export interface Auth{
    ok : boolean,
    mensaje: String
}

export interface SendEmailResp{
    ok : boolean,
    mensaje: String
}

export interface CategoryInterface{
    id?: any;
    nameCategory: string;
    ageMin: number;
    ageMax: number;
    prize: string;
    km: number;
    rute: any[];
}
  
export interface EventoInterface{
    id?: any;
    nameEvent: string;
    startTime: string | any;
    endTime: string | any;
    inscriptionTime: string;
    finalized: string; 
    city: string;
    descripEvent: string;
    patrocinator: [];
    categories: any[];
}

export interface UserInscripInterface{
    id: string;
    date: any;
    idCategory: string;
    idEvent: string;
    idUser: string;
}

export interface UserInterface{
    id: string;
    birthDate: string;
    email: string;
    firstName: string;
    fotoUrl: string;
    identity: string;
    lastName: string;
    participations: [];
    phone: string;
}

export interface idUsers{
  idUser: string;
}

export interface CompetenceRun{
    id: string;
    idInscription: string,
    kmTours: number,
    route: [],
    state: string,
    timeEnd: string,
    timeStart: string,
    timeTotal: string
}

export interface CompFinal{
    n: number,
    identity: string,
    firstName: string,
    lastName: string,
    timeEnd: string,
    timeStart: string,
    timeTotal: string,
    state: string
}