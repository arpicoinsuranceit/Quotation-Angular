import { LoginService } from './../login.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { personalInfo } from '../../model/personalInfo';

@Injectable()
export class QuoAipService {

  userId: string;

  constructor(private http: Http, private loginService: LoginService) {
    if (loginService.currentUser) {
      this.userId = loginService.currentUser.userId;
    }
  }

  getQouCal(data) {
    if (data._frequance === "Monthly") {
      data._frequance = "M";
    }
    if (data._frequance === "Quartaly") {
      data._frequance = "Q";
    }
    if (data._frequance === "Half Yearly") {
      data._frequance = "H";
    }
    if (data._frequance === "Yearly") {
      data._frequance = "Y";
    }
    if (data._frequance === "Single Premium") {
      data._frequance = "S";
    }
    console.log(data);
    return this.http.post('http://localhost:8084/aipCal/', data);
  }

  getQouShedule(data) {
    if (data._frequance === "Monthly") {
      data._frequance = "M";
    }
    if (data._frequance === "Quartaly") {
      data._frequance = "Q";
    }
    if (data._frequance === "Half Yearly") {
      data._frequance = "H";
    }
    if (data._frequance === "Yearly") {
      data._frequance = "Y";
    }
    if (data._frequance === "Single Premium") {
      data._frequance = "S";
    }
    console.log(data);
    return this.http.post('http://localhost:8084/aipshedule/', data);
  }

  saveQuo(data) {
    if (data._plan._frequance === "Monthly") {
      data._plan._frequance = "M";
    }
    if (data._plan._frequance === "Quartaly") {
      data._plan._frequance = "Q";
    }
    if (data._plan._frequance === "Half Yearly") {
      data._plan._frequance = "H";
    }
    if (data._plan._frequance === "Yearly") {
      data._plan._frequance = "Y";
    }
    if (data._frequance === "Single Premium") {
      data._frequance = "S";
    }
    console.log(data);
    return this.http.post('http://localhost:8084/aipSavequo/' + this.userId, data);
  }

  getAipQuotationDetailsForEdit(qdId) {
    return this.http.post('http://localhost:8084/quotationDetails', qdId);
  }

  edit(data: personalInfo, qdId: number) {
    console.log(data);
    return this.http.post('http://localhost:8084/quoAipEdit/' + this.userId + '/' + qdId, data);
  }
}
