import { personalInfo } from './../../model/personalInfo';
import { LoginService } from './../login.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class QuoAibService {

  userId: string;

  constructor(private http: Http, private loginService: LoginService) {
    if (loginService.currentUser) {
      this.userId = loginService.currentUser.userId;
    }
  }

  getQouCal(data) {
    //console.log(data);
    return this.http.post('http://localhost:8084/aibCal/', data);
  }
  save(data: personalInfo) {
    //console.log(data);
    return this.http.post('http://localhost:8084/quoAibsave/' + this.userId, data);
  }

  edit(data: personalInfo, qdId: number) {
    //console.log(data);
    return this.http.post('http://localhost:8084/quoAibEdit/' + this.userId + '/' + qdId, data);
  }

  getAibQuotationDetailsForEdit(qdId) {
    return this.http.post('http://localhost:8084/quotationDetails', qdId);
  }
}
