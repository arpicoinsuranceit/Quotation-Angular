import { QuotationCalculation } from './../../model/quoCal';
import { LoginService } from './../login.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SaveEnd1QuotationService {

  userId: string;

  constructor(private http: Http, private loginService: LoginService) {
    if (loginService.currentUser) {
      this.userId = loginService.currentUser.userId;
    }
  }

  getQouENDCal(data: QuotationCalculation) {
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

    data._product = "END1";

    return this.http.post('http://10.10.10.120:8084/Quotation/quoEndCal', data);
  }

  saveEnd(data: any) {
    data._product = "END1";
    return this.http.post('http://10.10.10.120:8084/Quotation/quoEndsave/' + this.userId, data);
  }

  getEndQuotationDetailsForEdit(qdId) {
    return this.http.post('http://10.10.10.120:8084/Quotation/quotationDetails', qdId);
  }

  editEnd(data: any, qdId: number) {
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

    console.log(data);

    data._product = "END1";

    let token;
    if(sessionStorage.getItem("isUnderwriting") == "true"){
      token=sessionStorage.getItem("Token");
      return this.http.post('http://10.10.10.120:8084/Quotation/quoEndEditUnderwrite/'+token+'/'+qdId, data);
    }

    return this.http.post('http://10.10.10.120:8084/Quotation/quoEndEdit/' + this.userId + '/' + qdId, data);
  }

}
