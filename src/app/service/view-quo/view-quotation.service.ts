import { ResponseContentType } from '@angular/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ViewQuotationService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http:Http) { 
    this.headers = new Headers({ "Access-Control-Allow-Origin": "*" });
    this.options = new RequestOptions({ headers: this.headers, responseType:ResponseContentType.ArrayBuffer  });
  }

  getQuotationDetails(quoNum){
    return this.http.post('http://localhost:8084/quodetails',quoNum);
  }

  getQuotationDetailsForEdit(qdId){
    return this.http.post('http://localhost:8084/quotationDetailsView',qdId);
  }

  getProduct(qdId){
    return this.http.post('http://localhost:8084/product',qdId);
  }

  getSchedule(qdId){
    return this.http.get('http://localhost:8084/scheduledetails/'+qdId);
  }

  printQuotation(qdId){
    return this.http.get('http://localhost:8084/printQuotation/'+qdId,this.options);
  }

}
