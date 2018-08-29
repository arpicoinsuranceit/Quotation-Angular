import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadQuotationService {

  constructor(private http: Http) { }

  getQuotations(userId){
    return this.http.post('http://localhost:8084/quo',userId);
  }

}
