import { ViewQuotationService } from './../../service/view-quo/view-quotation.service';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PrintQuoDetails } from '../../model/quoDetails';
import { PrintQuoService } from '../../service/print-quo/print-quo.service';
import { ResponseType, Response } from '@angular/http';

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

  isDisableDiv=false;

  showData=false;

  constructor(private printQuoService:PrintQuoService, private viewQuoService: ViewQuotationService) { 

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

  

}