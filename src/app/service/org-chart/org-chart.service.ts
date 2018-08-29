import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrgChartService {

  constructor(private http: Http) { }

  getOrgDetails(userCode, type, loccode){
    return this.http.get('http://localhost:8085/loadOrg/'+userCode+"/"+type+"/"+loccode);
  }

}
