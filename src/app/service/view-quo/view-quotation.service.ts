import { MainLife } from './../../model/mainlife';
import { ResponseContentType } from '@angular/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ViewQuotationService {
  headers: Headers;
  options: RequestOptions;
  mainlife : MainLife=new MainLife;
  testMainlife : MainLife;
  test:string = "Test";

  constructor(private http:Http, private router: Router) { 
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

  editQuoDetails(qdId) {
    let url = "";
    this.getProduct(qdId).subscribe(response => {
      
      switch (response.text()) {

        case "AIB": {
          //console.log("AIB");
          url = "/quoaib/" + qdId + "";
          break;
        }
        case "AIP": {
          //console.log("AIP");
          url = "/quoaip/" + qdId + "";
          break;
        }
        case "ARP": {
          //console.log("ARP");
          url = "/quoarp/" + qdId + "";
          break;
        }
        case "ASFP": {
          //console.log("ASFP");
          url = "/quoasfp/" + qdId + "";
          break;
        }
        case "ASIP": {
          //console.log("ASIP");
          url = "/quosip/" + qdId + "";
          break;
        }
        case "ATRM": {
          //console.log("ATRM");
          url = "/quoatrm/" + qdId + "";
          break;
        }
        case "DTA": {
          //console.log("DTA");
          url = "/quodta/" + qdId + "";
          break;
        }
        case "DTAPL": {
          //console.log("DTAPL");
          url = "/quodtapl/" + qdId + "";
          break;
        }
        case "END1": {
         // console.log("END1");
          url = "/quoend1/" + qdId + "";
          break;
        }
        case "INVP": {
          //console.log("INVP");
          url = "/quoinvp/" + qdId + "";
          break;
        }
        case "ARTM": {
          //console.log("ARTM");
          url = "/quoartm/" + qdId + "";
          break;
        }
        default: {
          //console.log("Invalid choice");
          break;
        }
      }
      console.log(response.text());
      this.router.navigate([url]);
    }, error => {
      
      document.onkeydown = function (e) { return true; }
    });

    
    /*this.viewQuoService.getQuotationDetailsForEdit(qdId).subscribe(response => {
      //alert(response.json());
      this.personalInfo=response.json();
      console.log(this.personalInfo._mainlife);
      console.log(this.personalInfo._spouse);
    });*/
  }

  

}
