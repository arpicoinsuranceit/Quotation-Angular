import swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { Router,ActivatedRoute } from '@angular/router/';

@Injectable()
export class LoginService {

  constructor(private http: Http,
    private router: Router,private route: ActivatedRoute) {

  }

  pwResetDate(){
    return this.http.post('http://localhost:8084/pwreset',this.currentUser.userId).subscribe(response => {
      if(response.json() <= 3){
        if(response.json() == -1){
          swal("Reminder..","You must change your password within today","warning");
        }
        swal("Reminder..","You must change your password within "+response.json()+" days","warning");
      }
    });
  }

  login(logins){
    
    return this.http.post('http://localhost:8084/checks',logins).map(response =>{
      let result=JSON.stringify(response);
      let vars=result.split(",")[0];
      let body=vars.split(":")[1];
      let token=body.substring(1,body.length-1);

      if(token!="Not Found" && token!="Pw Change" && token!="Pw Not Match"  && token!="Lock"){
        sessionStorage.setItem("Token",token);
        
        return "Success";
      }
      if(token=="Not Found"){
        return "Not";
      }
      if(token=="Pw Change"){
        return "Pw";
      }
      if(token=="Pw Not Match"){
        return "Not Match";
      }
      if(token=="Lock"){
        return "Lock";
      }
      
      return "Not Match";
    });
  }

  get currentUser(){
    let token=sessionStorage.getItem("Token");

    if(!token) return null;

    return new JwtHelper().decodeToken(token);
  }

  logOut(){
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("dashpara");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("ZoneCode");
    this.router.navigate(['/'], { skipLocationChange: false });
    window.location.reload();
    //window.location.replace("/");
  }

  isLoggedIn(){
    let jwthelper=new JwtHelper();
    let token=sessionStorage.getItem("Token");

    if(!token){
      return false;
    }
    let expirationDate=jwthelper.getTokenExpirationDate(token);
    let isExpired=jwthelper.isTokenExpired(token);

    return !isExpired;
  }

  navigateLigin(){
    this.router.navigate(['/'], { skipLocationChange: true });
  }

}
