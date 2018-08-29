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
  selector: 'app-dta-benefict-info',
  templateUrl: './dta-benefict-info.component.html',
  styleUrls: ['./dta-benefict-info.component.css']
})
export class DtaBenefictInfoComponent implements OnInit {

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

  @Input() isImgBSASGActive = true;
  @Input() isImgBSASActive = false;

  @Input() isImgTPDDTASGActive = true;
  @Input() isImgTPDDTASActive = false;

  @Input() isImgJLBGActive = true;
  @Input() isImgJLBActive = false;

  @Input() isImgTPDDTAGActive = true;
  @Input() isImgTPDDTAActive = false;


  absForm = new FormGroup({
    TPDDTAS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    JLB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })
  });

  abmForm = new FormGroup({
    TPDDTA: new FormGroup({
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

  isActiveTPDDTAS(e) {
    if (e.target.checked) {
      this.isImgTPDDTASGActive = false;
      this.isImgTPDDTASActive = true;
    } else {
      this.isImgTPDDTASGActive = true;
      this.isImgTPDDTASActive = false;
    }
  }
  isActiveJLB(e) {
    if (e.target.checked) {
      this.isImgJLBGActive = false;
      this.isImgJLBActive = true;
    } else {
      this.isImgJLBGActive = true;
      this.isImgJLBActive = false;
    }
  }

  isActiveTPDDTA(e) {
    if (e.target.checked) {
      this.isImgTPDDTAGActive = false;
      this.isImgTPDDTAActive = true;
    } else {
      this.isImgTPDDTAGActive = true;
      this.isImgTPDDTAActive = false;
    }
  }

  onsetBenif(e, val) {
    this.onsetBenifMainlife.emit(this.abmForm);
    this.onsetBenifSpouse.emit(this.absForm);
  }

  shedule(){
      this.load(this.summeryInfo._summery.dtaShedules);
  }

  loadDefault(){
    this.abmForm.reset();
    this.absForm.reset();

    this.isImgTPDDTASGActive = true;
    this.isImgTPDDTASActive = false;

    this.isImgTPDDTAGActive = true;
    this.isImgTPDDTAActive = false;

    this.isImgJLBGActive = true;
    this.isImgJLBActive = false;

    this.abmForm.get("TPDDTA").get('sumAssured').disable();
    this.absForm.get("TPDDTAS").get('sumAssured').disable();
    this.absForm.get("JLB").get('sumAssured').disable();

    this.abmForm.get("TPDDTA").get('sumAssured').setValue('0');
    this.absForm.get("TPDDTAS").get('sumAssured').setValue('0');
    this.absForm.get("JLB").get('sumAssured').setValue('0');

    this.abmForm.get("TPDDTA").get('premium').setValue('0');
    this.absForm.get("TPDDTAS").get('premium').setValue('0');
    this.absForm.get("JLB").get('premium').setValue('0');

    this.activeSp="2";
    this.onsetBenif("e", "val");

    
  }

  loadDefaultNew(){
    this.absForm.reset();

    this.isImgTPDDTASGActive = true;
    this.isImgTPDDTASActive = false;

    this.isImgJLBGActive = true;
    this.isImgJLBActive = false;

    for(var i in this.absForm.value){
      this.absForm.get(i).get('sumAssured').setValue(0);
      this.absForm.get(i).get('sumAssured').disable();
      this.absForm.get(i).get('premium').setValue(0);
    }

    //this.activeSp="2";
    this.onsetBenif("e", "val");

    
  }

  loadDefaultBSAChange(){
    this.abmForm.reset();
    this.absForm.reset();

    this.isImgTPDDTASGActive = true;
    this.isImgTPDDTASActive = false;

    this.isImgTPDDTAGActive = true;
    this.isImgTPDDTAActive = false;

    this.isImgJLBGActive = true;
    this.isImgJLBActive = false;

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

    this.onsetBenif("e", "val");

    
  }
  

  load(schedules : DTAShedule[]){  
      let htmlTxt="<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\"><th>Policy Year</th>"+
                "<th>Out Term</th>"+
                "<th>Sum at Risk</th>"+
                "<th>Reduction</th>"+
                "<th>Rate</th>"+
                "<th>Premium</th>";
                
      for(let s=0; s<schedules.length; s++){
        let dtaShedule : DTAShedule = schedules[s];
        htmlTxt+="<tr><td>"+dtaShedule.polYear+"</td>"
              +"<td>"+dtaShedule.outyer+"</td>"
              +"<td>"+dtaShedule.outsum+"</td>"
              +"<td>"+dtaShedule.lonred+"</td>"
              +"<td>"+dtaShedule.prmrat+"</td>"
              +"<td>"+dtaShedule.premum+"</td>"
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

  console.log(this.summeryInfo._summery.healthBenMain);
  console.log(this.summeryInfo._summery.healthBenSpouse);
  }
}
