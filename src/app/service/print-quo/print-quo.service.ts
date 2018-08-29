import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PrintQuoService {

  
  constructor(private http:Http) { }

  getQuotations(quoId:string,userType:string){
   return this.http.post('http://localhost:8084/findQuotation/'+userType,quoId);
  }

}
