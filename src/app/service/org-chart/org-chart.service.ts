import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrgChartService {

  constructor(private http: Http) { }

  getOrgDetails(userCode, type, loccode){
    return this.http.get('http://10.10.10.120:8084/Infosys/loadOrg/'+userCode+"/"+type+"/"+loccode);
  }

}
