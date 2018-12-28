import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService } from '../login.service';
import { QuotationCalculation } from '../../model/quoCal';

@Injectable()
export class QuoAtpService {

  userId: string;

  constructor(private http: Http, private loginService: LoginService) {
    if (loginService.currentUser) {
      this.userId = loginService.currentUser.userId;
    }
  }

  getQouAtpCal(data: QuotationCalculation) {
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

    data._product = "END1";

    return this.http.post('http://localhost:8084/quoAtpCal', data);
  }

  saveAtp(data: any) {
    data._product = "ATP";
    return this.http.post('http://localhost:8084/quoAtpsave/' + this.userId, data);
  }

  getAtpQuotationDetailsForEdit(qdId) {
    return this.http.post('http://localhost:8084/quotationDetails', qdId);
  }

  editAtp(data: any, qdId: number) {
    if (data._calPersonalInfo.frequance === "Monthly") {
      data._calPersonalInfo.frequance = "M";
    }
    if (data._calPersonalInfo.frequance === "Quartaly") {
      data._calPersonalInfo.frequance = "Q";
    }
    if (data._calPersonalInfo.frequance === "Half Yearly") {
      data._calPersonalInfo.frequance = "H";
    }
    if (data._calPersonalInfo.frequance === "Yearly") {
      data._calPersonalInfo.frequance = "Y";
    }
    if (data._calPersonalInfo.frequance === "Single Premium") {
      data._calPersonalInfo.frequance = "S";
    }

    if (data._personalInfo._plan._frequance === "Monthly") {
      data._personalInfo._plan._frequance = "M";
    }
    if (data._personalInfo._plan._frequance === "Quartaly") {
      data._personalInfo._plan._frequance = "Q";
    }
    if (data._personalInfo._plan._frequance === "Half Yearly") {
      data._personalInfo._plan._frequance = "H";
    }
    if (data._personalInfo._plan._frequance === "Yearly") {
      data._personalInfo._plan._frequance = "Y";
    }
    if (data._personalInfo._plan._frequance === "Single Premium") {
      data._personalInfo._plan._frequance = "S";
    }

    //console.log(data);

    data._product = "ATP";

    let token;
    if(sessionStorage.getItem("isUnderwriting") == "true"){
      token=sessionStorage.getItem("Token");
      return this.http.post('http://localhost:8084/quoAtpEditUnderwrite/'+token+'/'+qdId, data);
    }

    return this.http.post('http://localhost:8084/quoAtpEdit/' + this.userId + '/' + qdId, data);
  }

}