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
    startTime: string;
    endTime: string;
    city: string;
    descripEvent: string;
    patrocinator: [];
    categories: any[];
}