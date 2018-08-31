import { ViewQuotationService } from './../../service/view-quo/view-quotation.service';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PrintQuoDetails } from '../../model/quoDetails';
import { PrintQuoService } from '../../service/print-quo/print-quo.service';
import { ResponseType, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-print-quo',
  templateUrl: './print-quo.component.html',
  styleUrls: ['./print-quo.component.css']
})
export class PrintQuoComponent implements OnInit {

  quotationDetails:PrintQuoDetails = new PrintQuoDetails();

  form_search=new FormGroup({
    quoNumber  : new FormControl("",Validators.required)
  });

  userType=sessionStorage.getItem("userType");

  isDisableDiv=false;

  showData=false;

  constructor(private printQuoService:PrintQuoService, private viewQuoService: ViewQuotationService,private router:Router) { 

  }

  ngOnInit() {
    
  }

  get quoNumber(){
    return this.form_search.get("quoNumber").value;
  }

  findQuotation(){
    if(this.quoNumber != ""){
      this.isDisableDiv=true;
    this.printQuoService.getQuotations(this.quoNumber,sessionStorage.getItem("userType")).subscribe(response =>{
      this.isDisableDiv=false;
      if(response.json().status == "0"){
        swal("Error", "Quotation Number is Not Found..", "error");
        this.showData=false;
      }else{
        this.showData=true;
        this.quotationDetails.quotationNum=response.json().quotationNumber;
        this.quotationDetails.quotationDetId=response.json().quotationDetId;
        this.quotationDetails.agentCode=response.json().agentCode;
        this.quotationDetails.agentName=response.json().agentName;
        this.quotationDetails.branchCode=response.json().branchCode;
        this.quotationDetails.branchName=response.json().branchName;
        this.quotationDetails.customerName=response.json().custName;
        this.quotationDetails.customerNic=response.json().custNic;
        this.quotationDetails.productCode=response.json().productCode;
        this.quotationDetails.productName=response.json().productName;
        this.quotationDetails.date=response.json().date;

        console.log(this.quotationDetails);
      }
    }, error => {
      swal("Error", "Error code - 1201 <br> ", "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
    }
    
  }

  printQuoDetails(){
    this.viewQuoService.printQuotation(this.quotationDetails.quotationDetId).subscribe(response => {
      let resp:Response;
      
      resp=response;
      let arr:ArrayBuffer;

      var file = new Blob([response], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);

      window.open(resp.url);
      
    }, error => {
      console.log(error.status);
      if(error.status == 405){
        swal("Error", "This Quotation must Recalcutate, <br> Goto Edit View", "error");
        document.onkeydown = function (e) { return true; }
      }else{
        swal("Error", "Error code - 1305 <br>", "error");
        document.onkeydown = function (e) { return true; }
      }
     
    });
  }

  editQuoDetails(qdId) {
    let url = "";
    this.viewQuoService.getProduct(qdId).subscribe(response => {
      
      switch (response.text()) {

        case "AIB": {
          console.log("AIB");
          url = "/quoaib/" + qdId + "";
          break;
        }
        case "AIP": {
          console.log("AIP");
          url = "/quoaip/" + qdId + "";
          break;
        }
        case "ARP": {
          console.log("ARP");
          url = "/quoarp/" + qdId + "";
          break;
        }
        case "ASFP": {
          console.log("ASFP");
          url = "/quoasfp/" + qdId + "";
          break;
        }
        case "ASIP": {
          console.log("ASIP");
          url = "/quosip/" + qdId + "";
          break;
        }
        case "ATRM": {
          console.log("ATRM");
          url = "/quoatrm/" + qdId + "";
          break;
        }
        case "DTA": {
          console.log("DTA");
          url = "/quodta/" + qdId + "";
          break;
        }
        case "DTAPL": {
          console.log("DTAPL");
          url = "/quodtapl/" + qdId + "";
          break;
        }
        case "END1": {
          console.log("END1");
          url = "/quoend1/" + qdId + "";
          break;
        }
        case "INVP": {
          console.log("INVP");
          url = "/quoinvp/" + qdId + "";
          break;
        }
        case "ARTM": {
          console.log("ARTM");
          url = "/quoartm/" + qdId + "";
          break;
        }
        default: {
          console.log("Invalid choice");
          break;
        }
      }
      console.log(response.text());
      this.router.navigate([url]);
    }, error => {
      swal("Error", "Error code - 1304 <br>", "error");
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