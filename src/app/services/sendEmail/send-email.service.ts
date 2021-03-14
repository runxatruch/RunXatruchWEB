import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactEmail } from '../../models/contact';
import { map } from 'rxjs/operators';
import { SendEmailResp } from 'src/app/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private url = 'https://us-central1-testproyect-fee79.cloudfunctions.net/api/email'

  constructor(private http:HttpClient) { }


  sendContactEmail(data: ContactEmail){
    const options = {
      responseType: 'text' as const,
    };
  const emailData = {
    ...data
  }

  return this.http.post<SendEmailResp>(`${this.url}/${emailData.describe}/${emailData.email}/${emailData.name}/${emailData.phone}`, options).pipe(
    map(resp =>{
      return resp
    })
  )

  }
}

