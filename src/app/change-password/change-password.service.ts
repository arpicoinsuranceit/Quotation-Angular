import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChangePasswordService {

  constructor(private http:Http) { }

  loginToChangePw(credentials){
    
    return this.http.post('http://localhost:8084/checks',credentials)
    .map(response =>{
      let result=JSON.stringify(response);
      let vars=result.split(",")[0];
      let body=vars.split(":")[1];
      let token=body.substring(1,body.length-1);
      
      if(token!="Not Found" && token!="Pw Not Match"){
        sessionStorage.setItem("Token",token);
        return true;
      }

      return false;
    });
  }

  changePassword(passwords){
    return this.http.post('http://localhost:8084/password',passwords)
    .map(response =>{
      let result=JSON.stringify(response);
      let vars=result.split(",")[0];
      let body=vars.split(":")[1];
      let token=body.substring(1,body.length-1);

      return token;
    });
  }

}
