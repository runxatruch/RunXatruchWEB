export interface Auth{
    ok : boolean,
    mensaje: String
}

export interface SendEmailResp{
    ok : boolean,
    mensaje: String
}

export interface CategoryInterface{
    id?: string;
    nameCategory: string;
    ageMin: number;
    ageMax: number;
    prize: string;
    km: number;
    rute: any[];
}
  
export interface EventoInterface{
    id?: string;
    nameEvent: string;
    startTime: string;
    endTime: string;
    city: string;
    patrocinator: [];
    categories: any[];
}