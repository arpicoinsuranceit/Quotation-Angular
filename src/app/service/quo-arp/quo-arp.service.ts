import { QuotationCalculation } from './../../model/quoCal';
import { LoginService } from './../login.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class QuoArpService {

  userId : string;
  
  constructor(private http: Http, private loginService: LoginService){
    if(loginService.currentUser){
      this.userId=loginService.currentUser.userId;
    }
    
  }

  getQouCal(data: QuotationCalculation) {
    if (data._personalInfo.frequance === "Monthly") {
      data._personalInfo.frequance = "M";
    }
    if (data._personalInfo.frequance === "Quartaly") {
      data._personalInfo.frequance = "Q";
    }
    if (data._personalInfo.frequance === "Half Yearly") {
      data._personalInfo.frequance = "H";
    }
    if (data._personalInfo.frequance === "Yearly") {
      data._personalInfo.frequance = "Y";
    }
    if (data._personalInfo.frequance === "Single Premium") {
      data._personalInfo.frequance = "S";
    }

    data._product="ARP";

    return this.http.post('http://localhost:8084/arpCal', data);
 
  }

  saveArp(data){
    data._product="ARP";

    return this.http.post('http://localhost:8084/quoArpsave/'+this.userId, data);
  }

  getArpQuotationDetailsForEdit(qdId){
    return this.http.post('http://localhost:8084/quotationDetails',qdId);
  }

  editArp(data : any,qdId : number){
    if(data._calPersonalInfo.frequance==="Monthly"){
      data._calPersonalInfo.frequance="M";
    }
    if(data._calPersonalInfo.frequance==="Quartaly"){
      data._calPersonalInfo.frequance="Q";
    }
    if(data._calPersonalInfo.frequance==="Half Yearly"){
      data._calPersonalInfo.frequance="H";
    }
    if(data._calPersonalInfo.frequance==="Yearly"){
      data._calPersonalInfo.frequance="Y";
    }

    if(data._personalInfo._plan._frequance==="Monthly"){
      data._personalInfo._plan._frequance="M";
    }
    if(data._personalInfo._plan._frequance==="Quartaly"){
        data._personalInfo._plan._frequance="Q";
    }
    if(data._personalInfo._plan._frequance==="Half Yearly"){
        data._personalInfo._plan._frequance="H";
    }
    if(data._personalInfo._plan._frequance==="Yearly"){
        data._personalInfo._plan._frequance="Y";
    }

    //console.log(data);
    data._product="ARP";
   // //console.log("ARP EDIT ----------------------------------");
    return this.http.post('http://localhost:8084/quoArpEdit/'+this.userId+'/'+qdId, data);
  }


}
