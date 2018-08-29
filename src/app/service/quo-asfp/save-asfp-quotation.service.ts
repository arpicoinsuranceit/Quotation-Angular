import { LoginService } from './../login.service';
import { QuotationCalculation } from './../../model/quoCal';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SaveAsfpQuotationService {

  userId: string;

  constructor(private http: Http, private loginService: LoginService) {
    if (loginService.currentUser) {
      this.userId = loginService.currentUser.userId;
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
    console.log(data);
    data._product = "ASFP";
    return this.http.post('http://localhost:8084/quoAsfpCal', data);
  }

  saveInvp(data: any) {
    console.log(data);
    data._product = "ASFP";
    return this.http.post('http://localhost:8084/quoAsfpsave/' + this.userId, data);
  }

  getAsfpQuotationDetailsForEdit(qdId) {
    return this.http.post('http://localhost:8084/quotationDetails', qdId);
  }

  editAsfp(data: any, qdId: number) {
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
    data._product = "ASFP";

    return this.http.post('http://localhost:8084/quoAsfpEdit/' + this.userId + '/' + qdId, data);
  }

}
