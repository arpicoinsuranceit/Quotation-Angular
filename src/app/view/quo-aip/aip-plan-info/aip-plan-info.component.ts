import { MainLife } from './../../../model/mainlife';
import swal from 'sweetalert2';
import { QuoAipService } from './../../../service/quo-aip/quo-aip.service';
import { Plan, PlanAip } from './../../../model/plan';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AipCalSchedule } from '../../../model/aipCalSchedule';

@Component({
  selector: 'app-aip-plan-info',
  templateUrl: './aip-plan-info.component.html',
  styleUrls: ['./aip-plan-info.component.css']
})
export class AipPlanInfoComponent implements OnInit {

  @Input() _plan = new PlanAip();

  @Input() _mainLife = new MainLife();

  _planAip: Plan = new Plan();

  @Output() onSetPlanInfo = new EventEmitter<any>();
  @Output() onSetPlanCal = new EventEmitter<any>();
  constructor(private quoAipService: QuoAipService) { }

  ngOnInit() {
    this._plan._frequance = "Monthly";
    this._plan._contribution = 3000;
    this._plan._term = 10;
    this._planAip._bsa = 3000;
    this._planAip._frequance = "M";
    this._planAip._term = 10;

    this.change("e");

  }

  keyup(e) {
    document.getElementById(e.target.id).classList.remove("errors");
  }

  changeUi(e) {
    document.getElementById("txt-term").style.borderColor = '#CCCCCC';
    document.getElementById("txt-Contribution").style.borderColor = '#CCCCCC';
    if (this._plan._term >= 5 && this._plan._term <= 57) {
      if (this._plan._contribution >= 3000) {
        this.onSetPlanInfo.emit(this._plan);
      } else {
        document.getElementById("txt-Contribution").style.borderColor = 'red';
        document.getElementById("txt-Contribution").focus();
      }

    } else {
      document.getElementById("txt-term").style.borderColor = 'red';
      document.getElementById("txt-term").focus();
    }
  }

  change(e) {
    //e.stopPropagation();
    this.onSetPlanCal.emit(this._plan);
  }

  shedule() {
    this._planAip._bsa = this._plan._contribution;
    this._planAip._frequance = this._plan._frequance;
    this._planAip._term = this._plan._term;
    this._planAip.age=this._mainLife._mAge;

    this.quoAipService.getQouShedule(this._planAip).subscribe(response => {
      let schedules: AipCalSchedule[];
      schedules = response.json();
      console.log(schedules);
      this.load(schedules);

    },error => swal("Error", error.text() ,"error"));
  }

  load(schedules) {
    let aipSchedules: AipCalSchedule;
    let htmlTxt ="<div style=\"max-height : 200px !important; max-width : 500px !important; overflow : auto !important;\">" +
     "<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\"><th>Policy Year</th>" +
      "<th>Policy Month</th>" +
      "<th>Opening Fee</th>" +
      "<th>ComCon</th>" +
      "<th>FundAmt</th>" +
      "<th>FndBfi</th>" +
      "<th>IntAmt</th>" +
      "<th>FndBmf</th>" +
      "<th>MgtFee</th>" +
      "<th>FndClo</th>" +
      "<th>ADBCov</th>" +
      "</thead><tbody>";

    for (let s = 0; s < schedules.length; s++) {
      aipSchedules = schedules[s];
      htmlTxt += "<tr><td>" + aipSchedules.policyYear + "</td>"
        + "<td>" + aipSchedules.policyMonth + "</td>"
        + "<td>" + aipSchedules.openingFee + "</td>"
        + "<td>" + aipSchedules.comCon + "</td>"
        + "<td>" + aipSchedules.fundAmt + "</td>"
        + "<td>" + aipSchedules.fndBfi + "</td>"
        + "<td>" + aipSchedules.intAmt + "</td>"
        + "<td>" + aipSchedules.fndBmf + "</td>"
        + "<td>" + aipSchedules.mgtFee + "</td>"
        + "<td>" + aipSchedules.fndClo + "</td>"
        + "<td>" + aipSchedules.adbCov + "</td>"
        + "</tr>";
    }

    htmlTxt += "</tbody></table></div>";

    swal({
      title: 'Shedule',
      html: htmlTxt,
      width: 'auto',
      showCancelButton: true,
      showConfirmButton: false
    });

  }

  

  setDefault(){
    this._plan._frequance = "Monthly";
    this._plan._contribution = 3000;
    this._plan._term = 10;
    this._planAip._bsa = 3000;
    this._planAip._frequance = "M";
    this._planAip._term = 10;  
  }

}
