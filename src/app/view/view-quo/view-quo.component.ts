import swal from 'sweetalert2';
import { DTAShedule, Shedule } from './../../model/summeryInfo';
import { personalInfo } from './../../model/personalInfo';
import { QuotationView } from './../../model/quotationView';
import { ActivatedRoute } from '@angular/router/';
import { Component, OnInit } from '@angular/core';
import { ViewQuotationService } from '../../service/view-quo/view-quotation.service';
import { Router } from '@angular/router';
import { ResponseType, Response } from '@angular/http';

@Component({
  selector: 'app-view-quo',
  templateUrl: './view-quo.component.html',
  styleUrls: ['./view-quo.component.css']
})
export class ViewQuoComponent implements OnInit {

  quoNum: number;
  quotationDetails: QuotationView[];
  isHidden = true;
  arrow = "fa-chevron-down";
  //schedule: DTAShedule[];

  product : string = "INVP";

  personalInfo: personalInfo;

  constructor(private route: ActivatedRoute, private router: Router, private viewQuoService: ViewQuotationService) {
    this.route.params.subscribe(params => {
      this.quoNum = params.id;
      this.viewQuotationDetails();
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
    });
  }

  ngOnInit() {
  }

  viewQuotationDetails() {
    return this.viewQuoService.getQuotationDetails(this.quoNum).subscribe(response => {
      console.log(response.json());
      this.quotationDetails = response.json();
      this.product=this.quotationDetails[0].productCode;
      this.quotationDetails = this.quotationDetails.sort();
      //console.log(this.quotationDetails);
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
    });
  }

  viewPrevious() {
    if (this.isHidden) {
      this.isHidden = false;
      this.arrow = "fa-chevron-up";
    } else {
      this.isHidden = true;
      this.arrow = "fa-chevron-down";
    }

  }

  scheduleDetails(qdId){
    this.viewQuoService.getSchedule(qdId).subscribe(response => {
      ////console.log(response.json());
      this.load(response.json());
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
    });
  }

  load(schedules : Shedule[]){  
    //console.log(schedules);
    let htmlTxt="<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\"><th>Policy Year</th>"+
              "<th>Out Term</th>"+
              "<th>Sum at Risk</th>"+
              "<th>Reduction</th>"+
              "<th>Rate</th>"+
              "<th>Premium</th>";
              
    for(let s=0; s<schedules.length; s++){
      let dtaShedule : Shedule = schedules[s];
      //console.log(dtaShedule);
      htmlTxt+="<tr><td>"+dtaShedule.policyYear+"</td>"
            +"<td>"+dtaShedule.outYear+"</td>"
            +"<td>"+dtaShedule.outSum+"</td>"
            +"<td>"+dtaShedule.lorned+"</td>"
            +"<td>"+dtaShedule.premiumRate+"</td>"
            +"<td>"+dtaShedule.premium+"</td>"
            +"</tr>";
    }

    htmlTxt+="</tbody></table>";

    swal({
      title: 'Shedule',
      html: htmlTxt,
      width: 'auto',
      showCancelButton: true,
      showConfirmButton:false
    });

  }

  editQuoDetails(qdId) {
    let url = "";
    this.viewQuoService.getProduct(qdId).subscribe(response => {
      
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
          //console.log("END1");
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
        case "DTAP": {
          //console.log("ARTM");
          url = "/quodtap/" + qdId + "";
          break;
        }
        case "ATP": {
          //console.log("ATP");
          url = "/quoatp/" + qdId + "";
          break;
        }
        default: {
          //console.log("Invalid choice");
          break;
        }
      }
      //console.log(response.text());
      this.router.navigate([url]);
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
    });

    
    /*this.viewQuoService.getQuotationDetailsForEdit(qdId).subscribe(response => {
      //alert(response.json());
      this.personalInfo=response.json();
      //console.log(this.personalInfo._mainlife);
      //console.log(this.personalInfo._spouse);
    });*/
  }

  printQuoDetails(quoDetailId){
    this.viewQuoService.printQuotation(quoDetailId).subscribe(response => {
      var fileURL = URL.createObjectURL(response);
      window.open(fileURL); // if you want to open it in new tab

    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
    });
  }

}
