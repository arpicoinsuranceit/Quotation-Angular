import { DashboardService } from './../../../service/dashboard/dashboard.service';
import swal from 'sweetalert2';
import { Plan } from './../../../model/plan';
import { SummeryInfo, DTAShedule } from './../../../model/summeryInfo';
import { MainLifeBenificts, SpouseBenificts, ChildrenBenificts, Benifict } from './../../../model/benificts';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Directive } from '@angular/core/src/metadata/directives';
import { Event } from '@angular/router/src/events';
import { CalPersonalInfo } from '../../../model/quoCal';
import { BenefitsValidations } from '../../../validation/benefitsValidations';

@Component({
  selector: 'app-dtapl-benefict-info',
  templateUrl: './dtapl-benefict-info.component.html',
  styleUrls: ['./dtapl-benefict-info.component.css']
})
export class DtaplBenefictInfoComponent implements OnInit {

  @Output() onsetBenifMainlife = new EventEmitter<FormGroup>();
  @Output() onsetBenifSpouse = new EventEmitter<FormGroup>();
  @Output() onsetBenifMainlifeForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifSpouseForm = new EventEmitter<FormGroup>();
  @Input() summeryInfo = new SummeryInfo;
  @Input() personalInfo = new CalPersonalInfo;


  benefitsValidations = new BenefitsValidations();
  _benif = new Benifict;
  activeRiders:string[] = new Array<string>();

  
  @Input() activeSp = "2";
  @Input() activeCh = "2";

  @Input() isImgTPDDTASPLGActive = true;
  @Input() isImgTPDDTASPLActive = false;

  @Input() isImgJLBPLGActive = true;
  @Input() isImgJLBPLActive = false;

  @Input() isImgTPDDTAPLGActive = true;
  @Input() isImgTPDDTAPLActive = false;


  absForm = new FormGroup({
    TPDDTASPL: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    JLBPL: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })
  });

  abmForm = new FormGroup({
    TPDDTAPL: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })/*
    */
  });

  validateHB = 1;
  validateWPB = 1;

  ////////Spouse//////
  validateSCB = 1;
  validateADBS = 1;

  constructor(private dashService:DashboardService) {
    this.loadActiveRiders();
  }

  ngOnInit() {
    this.onsetBenifMainlifeForm.emit(this.abmForm);
    this.onsetBenifSpouseForm.emit(this.absForm);
  }

  //adb.............................................

  imgHbGUrl = "assets/images/hbG.png";
  imgHbUrl = "assets/images/hb.png";
  imgwpbGUrl = "assets/images/wpbG.png";
  imgwpbUrl = "assets/images/wpb.png";

  ////spouce//////

  imgScbGUrl = "assets/images/scbG.png";
  imgScbUrl = "assets/images/scb.png";
  imgAdbsGUrl = "assets/images/adbG.png";
  imgAdbsUrl = "assets/images/adb.png";


  loadActiveRiders(){
    this.dashService.loadActiveRiders().subscribe(response => {
      this.activeRiders=response.json();
    }, error => {
      //swal("Error", "Error code - 1452 <br> ", "error");
      document.onkeydown = function (e) { return true; }
    });
  }



  isActive(e, frm) {
    if (e.target.checked) {
      this.abmForm.get(frm).get('sumAssured').enable();
      this.abmForm.get(frm).get('premium').enable();
    } else {
      this.abmForm.get(frm).get('sumAssured').disable();
      this.abmForm.get(frm).get('premium').disable();
      this.abmForm.get(frm).get('sumAssured').setValue('0');
      this.abmForm.get(frm).get('premium').setValue('0');
      this.onsetBenif(null, null);
    }
  }
  isActiveS(e, frm) {
    if (e.target.checked) {
      this.absForm.get(frm).get('sumAssured').enable();
      this.absForm.get(frm).get('premium').enable();
    } else {
      this.absForm.get(frm).get('sumAssured').disable();
      this.absForm.get(frm).get('premium').disable();
      this.absForm.get(frm).get('sumAssured').setValue('0');
      this.absForm.get(frm).get('premium').setValue('0');
      this.onsetBenif(null, null);

    }
  }

  isActiveTPDDTASPL(e) {
    if (e.target.checked) {
      this.isImgTPDDTASPLGActive = false;
      this.isImgTPDDTASPLActive = true;
    } else {
      this.isImgTPDDTASPLGActive = true;
      this.isImgTPDDTASPLActive = false;
    }
  }
  isActiveJLBPL(e) {
    if (e.target.checked) {
      this.isImgJLBPLGActive = false;
      this.isImgJLBPLActive = true;
    } else {
      this.isImgJLBPLGActive = true;
      this.isImgJLBPLActive = false;
    }
  }

  isActiveTPDDTAPL(e) {
    if (e.target.checked) {
      this.isImgTPDDTAPLGActive = false;
      this.isImgTPDDTAPLActive = true;
    } else {
      this.isImgTPDDTAPLGActive = true;
      this.isImgTPDDTAPLActive = false;
    }
  }

  onsetBenif(e, val) {
    this.onsetBenifMainlife.emit(this.abmForm);
    this.onsetBenifSpouse.emit(this.absForm);
  }

  shedule() {
    this.load(this.summeryInfo._summery.dtaShedules);
  }


  load(schedules: DTAShedule[]) {
    let htmlTxt ="<div style=\"max-height : 200px !important; max-width : 500px !important; overflow : auto !important;\">" +
      "<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\"><th>Policy Year</th>" +
      "<th>Out Term</th>" +
      "<th>Sum at Risk</th>" +
      "<th>Reduction</th>" +
      "<th>Rate</th>" +
      "<th>Premium</th>"+
      "</thead><tbody>";

    for (let s = 0; s < schedules.length; s++) {
      let dtaShedule: DTAShedule = schedules[s];
      htmlTxt += "<tr><td>" + dtaShedule.polYear + "</td>"
        + "<td>" + dtaShedule.outyer + "</td>"
        + "<td>" + dtaShedule.outsum + "</td>"
        + "<td>" + dtaShedule.lonred + "</td>"
        + "<td>" + dtaShedule.prmrat + "</td>"
        + "<td>" + dtaShedule.premum + "</td>"
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

  requirenments(){
    let htmlTxt =
    "<div class = \"row\"><div class = \"col-md-6\"><div><h4> Mainlife Sum at Risk<br>" + this.summeryInfo._summery.healthBenMain.sumAtRisk.toLocaleString() + "</h4></div>" +
    "<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\">" +
    "<th>Mainlife Requirment</th>" +
    "</thead><tbody>";

    var k = 1;

  for (let i in this.summeryInfo._summery.healthBenMain.reqRepoetsMain) {
    htmlTxt += "<tr><td style =\"text-align : left\">"+ k + ". " + this.summeryInfo._summery.healthBenMain.reqRepoetsMain[i] + "</td>"
      + "</tr>";
      k++;
  }

  htmlTxt += "</tbody></table>";
  if(this.activeSp=="1"){
    let sSumAtRisk;
    if(this.summeryInfo._summery.healthBenSpouse.sumAtRisk == undefined){
      sSumAtRisk=0;
    }else{
      sSumAtRisk=this.summeryInfo._summery.healthBenSpouse.sumAtRisk.toLocaleString();
    }
    htmlTxt +=
    "</div><div class = \"col-md-6\"><div><h4> Spouse Sum at Risk <br>" + sSumAtRisk + "</h4></div>" +
      "<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\">" +
      "<th>Spouse Requirment</th>" +
      "</thead><tbody>";

      var j=1;

    for (let i in this.summeryInfo._summery.healthBenSpouse.reqRepoetsMain) {
      htmlTxt += "<tr style =\"text-align : left\"><td>"+ j + ". " + this.summeryInfo._summery.healthBenSpouse.reqRepoetsMain[i] + "</td>"
        + "</tr >";
        j++;
    }

    htmlTxt += "</tbody></table></div></div>";
  }
  
 


  swal({
    title: 'Medical Requirment',
    html: htmlTxt,
    width: 'auto',
    showCancelButton: true,
    showConfirmButton: false
  });

  //console.log(this.summeryInfo._summery.healthBenMain);
  //console.log(this.summeryInfo._summery.healthBenSpouse);
  }

  loadDefault() {
    this.abmForm.reset();
    this.absForm.reset();

    this.isImgTPDDTASPLGActive = true;
    this.isImgTPDDTASPLActive = false;
  
    this.isImgJLBPLGActive = true;
    this.isImgJLBPLActive = false;
  
    this.isImgTPDDTAPLGActive = true;
    this.isImgTPDDTAPLActive = false;

    this.abmForm.get("TPDDTAPL").get('sumAssured').disable();
    this.absForm.get("TPDDTASPL").get('sumAssured').disable();
    this.absForm.get("JLBPL").get('sumAssured').disable();


    this.activeSp = "2";
    this.onsetBenif("e", "val");

  }

 loadDefaultNew() {
  this.absForm.reset();

  this.isImgTPDDTASPLGActive = true;
  this.isImgTPDDTASPLActive = false;

  this.isImgJLBPLGActive = true;
  this.isImgJLBPLActive = false;

  
  for(var i in this.absForm.value){
    this.absForm.get(i).get('sumAssured').setValue(0);
    this.absForm.get(i).get('sumAssured').disable();
    this.absForm.get(i).get('premium').setValue(0);
  }
    
    //this.activeSp = "2";
    this.onsetBenif("e", "val");

  }

  loadDefaultBSAChange() {
    this.absForm.reset();
    this.abmForm.reset();
  
    this.isImgTPDDTASPLGActive = true;
    this.isImgTPDDTASPLActive = false;
  
    this.isImgJLBPLGActive = true;
    this.isImgJLBPLActive = false;
  
    this.isImgTPDDTAPLGActive = true;
    this.isImgTPDDTAPLActive = false;
  
    for(var i in this.abmForm.value){
      this.abmForm.get(i).get('sumAssured').setValue(0);
      this.abmForm.get(i).get('sumAssured').disable();
      this.abmForm.get(i).get('premium').setValue(0);
    }
    for(var i in this.absForm.value){
      this.absForm.get(i).get('sumAssured').setValue(0);
      this.absForm.get(i).get('sumAssured').disable();
      this.absForm.get(i).get('premium').setValue(0);
    }
      
      //this.activeSp = "2";
      this.onsetBenif("e", "val");
  
    }


}
