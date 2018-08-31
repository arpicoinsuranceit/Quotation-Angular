import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadQuotationService {

  constructor(private http: Http) { }

  getQuotations(userId){
    let token;
    //alert(sessionStorage.getItem("isUnderwriting") == "true");
    if(sessionStorage.getItem("isUnderwriting") == "true"){
      token=sessionStorage.getItem("Token");
      //alert(token);
      return this.http.post('http://localhost:8084/quo/'+token,userId);
    }
    return this.http.post('http://localhost:8084/quo',userId);
  }

}
