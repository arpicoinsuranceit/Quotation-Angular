import { DashboardService } from './../../../service/dashboard/dashboard.service';
import swal from 'sweetalert2';
import { Plan } from './../../../model/plan';
import { SummeryInfo } from './../../../model/summeryInfo';
import { MainLifeBenificts, SpouseBenificts, ChildrenBenificts, Benifict } from './../../../model/benificts';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Directive } from '@angular/core/src/metadata/directives';
import { Event } from '@angular/router/src/events';
import { CalPersonalInfo } from '../../../model/quoCal';
import { BenefitsValidations } from '../../../validation/benefitsValidations';
import { NestedForm } from '../../../model/nested-form';
import { Children } from '../../../model/childeren';

@Component({
  selector: 'app-sip-additional-benef',
  templateUrl: './sip-additional-benef.component.html',
  styleUrls: ['./sip-additional-benef.component.css']
})
export class SipAdditionalBenefComponent implements OnInit {

  @Output() onsetBenifMainlife = new EventEmitter<FormGroup>();
  @Output() onsetBenifSpouse = new EventEmitter<FormGroup>();
  @Output() onsetBenifChildren = new EventEmitter<FormGroup>();
  @Output() onsetBenifMainlifeForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifSpouseForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifChildrenForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifAllForm = new EventEmitter<NestedForm>();
  @Input() summeryInfo = new SummeryInfo;
  @Input() personalInfo = new CalPersonalInfo;


  benefitsValidations = new BenefitsValidations();
  _benif = new Benifict;
  activeRiders:string[] = new Array<string>();


  @Input() activeSp = "2";
  @Input() activeCh = "2";

  isBsaChecked = true;
  isBsaSChecked = true;

  @Input() isImgBSAGActive = true;
  @Input() isImgBSAActive = false;

  @Input() isImgBSASGActive = true;
  @Input() isImgBSASActive = false;

  @Input() isImgADBGActive = true;
  @Input() isImgADBActive = false;

  @Input() isImgADBSGActive = true;
  @Input() isImgADBSActive = false;

  @Input() isImgATPBGActive = true;
  @Input() isImgATPBActive = false;

  @Input() isImgCIBGActive = true;
  @Input() isImgCIBActive = false;

  @Input() isImgCIBSGActive = true;
  @Input() isImgCIBSActive = false;

  @Input() isImgCIBCGActive = true;
  @Input() isImgCIBCActive = false;

  @Input() isImgFEBGActive = true;
  @Input() isImgFEBActive = false;

  @Input() isImgFEBSGActive = true;
  @Input() isImgFEBSActive = false;

  @Input() isImgHBGActive = true;
  @Input() isImgHBActive = false;

  @Input() isImgHBSGActive = true;
  @Input() isImgHBSActive = false;

  @Input() isImgHBCGActive = true;
  @Input() isImgHBCActive = false;

  @Input() isImgHRBIGActive = true;
  @Input() isImgHRBIActive = false;

  @Input() isImgHRBISGActive = true;
  @Input() isImgHRBISActive = false;

  @Input() isImgHRBICGActive = true;
  @Input() isImgHRBICActive = false;

  @Input() isImgHRBFGActive = true;
  @Input() isImgHRBFActive = false;

  @Input() isImgHRBFSGActive = true;
  @Input() isImgHRBFSActive = false;

  @Input() isImgHRBFCGActive = true;
  @Input() isImgHRBFCActive = false;

  @Input() isImgMFIBDGActive = true;
  @Input() isImgMFIBDActive = false;

  @Input() isImgMFIBDTGActive = true;
  @Input() isImgMFIBDTActive = false;

  @Input() isImgMFIBTGActive = true;
  @Input() isImgMFIBTActive = false;

  @Input() isImgPPDBGActive = true;
  @Input() isImgPPDBActive = false;

  @Input() isImgPPDBSGActive = true;
  @Input() isImgPPDBSActive = false;

  @Input() isImgSUHRBGActive = true;
  @Input() isImgSUHRBActive = false;

  @Input() isImgSUHRBSGActive = true;
  @Input() isImgSUHRBSActive = false;

  @Input() isImgSUHRBCGActive = true;
  @Input() isImgSUHRBCActive = false;

  @Input() isImgTPDASBGActive = true;
  @Input() isImgTPDASBActive = false;

  @Input() isImgTPDASBSGActive = true;
  @Input() isImgTPDASBSActive = false;

  @Input() isImgTPDBGActive = true;
  @Input() isImgTPDBActive = false;

  @Input() isImgTPDBSGActive = true;
  @Input() isImgTPDBSActive = false;

  @Input() isImgWPBGActive = true;
  @Input() isImgWPBActive = false;

  @Input() isImgWPBSGActive = true;
  @Input() isImgWPBSActive = false;

  @Input() isImgSHCBFGActive = true;
  @Input() isImgSHCBFActive = false;

  @Input() isImgSHCBFSGActive = true;
  @Input() isImgSHCBFSActive = false;

  @Input() isImgSHCBFCGActive = true;
  @Input() isImgSHCBFCActive = false;


  allForms: NestedForm = new NestedForm();



  abcForm = new FormGroup({
    CIBC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HBC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HCBC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HRBIC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HRBFC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    SUHRBC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    SHCBFC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })
  });

  absForm = new FormGroup({
    ADBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    BSAS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HCBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    CIBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    FEBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    SHCBFS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HRBIS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HRBFS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    PPDBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    SUHRBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    TPDASBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    TPDBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    WPBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })
  });

  abmForm = new FormGroup({
    ADB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    /**/
    ATPB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    SHCBF: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    CIB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    
    */
    FEB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    HB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    HRBI: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
  */
    HRBF: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    MFIBD: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    MFIBDT: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    MFIBT: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    PPDB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    SUHRB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    TPDASB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    TPDB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    WPB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })/*
    */
  });



  validateADB = 1;
  validateATPB = 1;
  validateTPDASB = 1;
  validateTPDB = 1;
  validatePPDB = 1;
  validateCIB = 1;
  validateFEB = 1;
  validateMFIBD = 1;
  validateMFIBT = 1;
  validateMFIBDT = 1;
  validateHRBI = 1;
  validateHRBF = 1;
  validateSUHRB = 1;
  validateHB = 1;
  validateWPB = 1;
  validateSHCBF = 1;

  ////////Spouse//////
  validateSCB = 1;
  validateADBS = 1;
  validateTPDASBS = 1;
  validateTPDBS = 1;
  validatePPDBS = 1;
  validateSCIB = 1;
  validateFEBS = 1;
  validateHRBIS = 1;
  validateHRBFS = 1;
  validateSUHRBS = 1;
  validateHBS = 1;
  validateWPBS = 1;
  validateSHCBFS = 1;

  ////////Children//////
  validateCIBC = 1;
  validateHRBIC = 1;
  validateHRBFC = 1;
  validateSUHRBC = 1;
  validateHBC = 1;

  constructor(private dashService:DashboardService) {
    this.loadActiveRiders();
  }

  ngOnInit() {
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  //adb.............................................
  imgAdbGUrl = "assets/images/adbG.png";
  imgAdbUrl = "assets/images/adb.png";
  imgAtpbGUrl = "assets/images/atpbG.png";
  imgAtpbUrl = "assets/images/atpb.png";
  imgTpdbasGUrl = "assets/images/tpdbasG.png";
  imgTpdbasUrl = "assets/images/tpdbas.png";
  imgTpdbGUrl = "assets/images/tpdbG.png";
  imgTpdbUrl = "assets/images/tpdb.png";
  imgPpdbGUrl = "assets/images/ppdbG.png";
  imgPpdbUrl = "assets/images/ppdb.png";
  imgCibGUrl = "assets/images/cibG.png";
  imgCibUrl = "assets/images/cib.png";
  imgFebGUrl = "assets/images/febG.png";
  imgFebUrl = "assets/images/feb.png";
  imgMifbdGUrl = "assets/images/mifbdG.png";
  imgMifbdUrl = "assets/images/mifbd.png";
  imgMifbtGUrl = "assets/images/mifbtG.png";
  imgMifbtUrl = "assets/images/mifbt.png";
  imgMifbdtGUrl = "assets/images/mifbdtG.png";
  imgMifbdtUrl = "assets/images/mifbdt.png";
  imgHrbiGUrl = "assets/images/hrbG.png";
  imgHrbiUrl = "assets/images/hrb.png";
  imgHrbfGUrl = "assets/images/hrbG.png";
  imgHrbfUrl = "assets/images/hrb.png";
  imgSuhrbGUrl = "assets/images/suhrbG.png";
  imgSuhrbUrl = "assets/images/suhrb.png";
  imgShcbfGUrl = "assets/images/suhrbG.png";
  imgShcbfUrl = "assets/images/suhrb.png";
  imgHbGUrl = "assets/images/hbG.png";
  imgHbUrl = "assets/images/hb.png";
  imgwpbGUrl = "assets/images/wpbG.png";
  imgwpbUrl = "assets/images/wpb.png";

  ////spouce//////

  imgScbGUrl = "assets/images/scbG.png";
  imgScbUrl = "assets/images/scb.png";
  imgAdbsGUrl = "assets/images/adbG.png";
  imgAdbsUrl = "assets/images/adb.png";
  imgTpdasbsGUrl = "assets/images/tpdbasG.png";
  imgTpdasbsUrl = "assets/images/tpdbas.png";
  imgTpdbsGUrl = "assets/images/tpdbG.png";
  imgTpdbsUrl = "assets/images/tpdb.png";
  imgPpdbsGUrl = "assets/images/ppdbG.png";
  imgPpdbsUrl = "assets/images/ppdb.png";
  imgScibGUrl = "assets/images/cibG.png";
  imgScibUrl = "assets/images/cib.png";
  imgFebsGUrl = "assets/images/febG.png";
  imgFebsUrl = "assets/images/feb.png";
  imgHrbisGUrl = "assets/images/hrbG.png";
  imgHrbisUrl = "assets/images/hrb.png";
  imgHrbfsGUrl = "assets/images/hrbG.png";
  imgHrbfsUrl = "assets/images/hrb.png";
  imgSuhrbsGUrl = "assets/images/suhrbG.png";
  imgSuhrbsUrl = "assets/images/suhrb.png";
  imgShcbfsGUrl = "assets/images/suhrbG.png";
  imgShcbfsUrl = "assets/images/suhrb.png";
  imgShcbfcGUrl = "assets/images/suhrbG.png";
  imgShcbfcUrl = "assets/images/suhrb.png";
  imgHbsGUrl = "assets/images/hbG.png";
  imgHbsUrl = "assets/images/hb.png";
  imgwpbsGUrl = "assets/images/wpbG.png";
  imgwpbsUrl = "assets/images/wpb.png";

  ////children//////

  imgCibcGUrl = "assets/images/cibG.png";
  imgCibcUrl = "assets/images/cib.png";
  imgHrbcGUrl = "assets/images/hrbG.png";
  imgHrbcUrl = "assets/images/hrb.png";
  imgHrbicGUrl = "assets/images/hrbG.png";
  imgHrbicUrl = "assets/images/hrb.png";
  imgHrbfcGUrl = "assets/images/hrbG.png";
  imgHrbfcUrl = "assets/images/hrb.png";
  imgSuhrbcGUrl = "assets/images/suhrbG.png";
  imgSuhrbcUrl = "assets/images/suhrb.png";
  imgHbcGUrl = "assets/images/hbG.png";
  imgHbcUrl = "assets/images/hb.png";

  @Input() isGetHealthBenef = false;
  @Input() isGetHcbf = false;
  @Input() isGetHcbi = false;
  @Input() isGetShcbf = false;
  @Input() isGetShcbi = false;

  @Input() _childrens = new Array<Children>();

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
    }
  }
  isActiveS(e, frm) {
    if (e.target.checked) {
      this.absForm.get(frm).get('sumAssured').enable();
      this.absForm.get(frm).get('premium').enable();
    } else {
      this.absForm.get(frm).get('sumAssured').disable();
      this.absForm.get(frm).get('premium').disable();
    }
  }
  isActiveC(e, frm) {
    if (e.target.checked) {
      this.abcForm.get(frm).get('sumAssured').enable();
      this.abcForm.get(frm).get('premium').enable();
    } else {
      this.abcForm.get(frm).get('sumAssured').disable();
      this.abcForm.get(frm).get('premium').disable();
    }
  }


  isActiveBSAS(e) {
    if (e.target.checked) {
      this.isImgBSASGActive = false;
      this.isImgBSASActive = true;
      /*if (this.abmForm.get('ATPB').get('isActice').value && this.abmForm.get('ATPB').get('sumAssured').value > 0) {
        this.isImgBSASGActive = false;
        this.isImgBSASActive = true;
      } else {
        this.absForm.get('BSAS').get('isActice').setValue(false);
        this.absForm.get('BSAS').get('sumAssured').disable();
        swal("ATPB Required!", "Can't get this benefict without getting ATPB..!", "warning");
      }*/

    } else {
      this.isImgBSASGActive = true;
      this.isImgBSASActive = false;
      this.clearBSAS();

    }
  }

  isActiveADB(e) {
    if (e.target.checked) {
      this.isImgADBGActive = false;
      this.isImgADBActive = true;
      this.abmForm.get('PPDB').get('isActice').setValue(true);
      this.abmForm.get('PPDB').get('sumAssured').enable();
      this.isImgPPDBGActive = false;
      this.isImgPPDBActive = true;
      this.abmForm.get('TPDASB').get('isActice').setValue(true);
      this.abmForm.get('TPDASB').get('sumAssured').enable();
      this.isImgTPDASBGActive = false;
      this.isImgTPDASBActive = true;
    } else {
      this.isImgADBGActive = true;
      this.isImgADBActive = false;
      this.clearADB();

    }
  }

  isActiveADBS(e) {
    if (e.target.checked) {

      if (this.absForm.get('BSAS').get('premium').value > 0) {
        if (this.abmForm.get('ADB').get('premium').value > 0) {
          this.isImgADBSGActive = false;
          this.isImgADBSActive = true;

          this.absForm.get('PPDBS').get('isActice').setValue(true);
          this.absForm.get('PPDBS').get('sumAssured').enable();
          this.isImgPPDBSGActive = false;
          this.isImgPPDBSActive = true;
          this.absForm.get('TPDASBS').get('isActice').setValue(true);
          this.absForm.get('TPDASBS').get('sumAssured').enable();
          this.isImgTPDASBSGActive = false;
          this.isImgTPDASBSActive = true;
        } else {
          this.absForm.get('ADBS').get('isActice').setValue(false);
          this.absForm.get('ADBS').get('sumAssured').disable();
          swal("ADB Required!", "Can't get this benefict without getting ADB..!", "warning");
        }
      } else {
        this.absForm.get('ADBS').get('isActice').setValue(false);
        this.absForm.get('ADBS').get('sumAssured').disable();
        swal("SCB Required!", "Can't get this benefict without getting SCB..!", "warning");
      }


    } else {
      this.isImgADBSGActive = true;
      this.isImgADBSActive = false;
      this.clearADBS();
    }
  }


  isActiveATPB(e) {
    if (e.target.checked) {
      this.isImgATPBGActive = false;
      this.isImgATPBActive = true;
    } else {
      this.isImgATPBGActive = true;
      this.isImgATPBActive = false;
      this.clearATPB();
    }
  }
  isActiveCIB(e) {
    if (e.target.checked) {
      this.isImgCIBGActive = false;
      this.isImgCIBActive = true;
    } else {
      this.isImgCIBGActive = true;
      this.isImgCIBActive = false;
      this.clearCIB();
    }
  }

  isActiveCIBS(e) {
    if (e.target.checked) {
      //this.isImgCIBSGActive = false;
      //this.isImgCIBSActive = true;
      //if (this.abmForm.get('CIB').get('premium').value > 0) {
      if (this.absForm.get('BSAS').get('premium').value > 0) {
        this.isImgCIBSGActive = false;
        this.isImgCIBSActive = true;

        if (parseInt(this.abmForm.get('CIB').get('sumAssured').value) > this.absForm.get('BSAS').get('sumAssured').value) {
          this.absForm.get('CIBS').get('sumAssured').setValue(this.absForm.get('BSAS').get('sumAssured').value);
        } else {
          this.absForm.get('CIBS').get('sumAssured').setValue(this.abmForm.get('CIB').get('sumAssured').value);
        }

        //this.absForm.get('CIBS').get('sumAssured').setValue(this.abmForm.get('CIB').get('sumAssured').value);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.checkValidateSCIB();
        //this.onsetBenifAll("", "");
      } else {
        this.absForm.get('CIBS').get('isActice').setValue(false);
        this.absForm.get('CIBS').get('sumAssured').disable();
        swal("SCB Required!", "Can't get this benefict without getting SCB..!", "error");
      }

      /*} else {
        this.absForm.get('CIBS').get('isActice').setValue(false);
        this.absForm.get('CIBS').get('sumAssured').disable();
        swal("CIB Required!", "Can't get this benefict without getting CIB..!", "warning");
      }*/
    } else {
      this.isImgCIBSGActive = true;
      this.isImgCIBSActive = false;
      this.clearCIBS();
    }
  }

  isActiveCIBC(e) {
    if (e.target.checked) {
      if (this.abmForm.get('CIB').get('premium').value > 0) {
        this.isImgCIBCGActive = false;
        this.isImgCIBCActive = true;
        if (parseInt(this.abmForm.get('CIB').get('sumAssured').value) > 1000000) {
          this.abcForm.get('CIBC').get('sumAssured').setValue("1000000");
        } else {
          this.abcForm.get('CIBC').get('sumAssured').setValue(this.abmForm.get('CIB').get('sumAssured').value);
        }

        for (var c in this._childrens) {
          let child = new Children();
          child = this._childrens[c];
          if (child._cAge >= 3) {
            child._cCibc = true;
          }

        }

        console.log(this._childrens);

        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.abcForm.get('CIBC').get('isActice').setValue(false);
        this.abcForm.get('CIBC').get('sumAssured').disable();
        swal("CIB Required!", "Can't get this benefict without getting CIB..!", "warning");
      }

    } else {
      this.isImgCIBCGActive = true;
      this.isImgCIBCActive = false;
      this.clearCIBC();
    }
  }

  isActiveFEB(e) {
    if (e.target.checked) {
      this.isImgFEBGActive = false;
      this.isImgFEBActive = true;
    } else {
      this.isImgFEBGActive = true;
      this.isImgFEBActive = false;
      this.clearFEB();
    }
  }

  isActiveFEBS(e) {
    if (e.target.checked) {
      this.isImgFEBSGActive = false;
      this.isImgFEBSActive = true;
    } else {
      this.isImgFEBSGActive = true;
      this.isImgFEBSActive = false;

      this.clearFEBS();
    }
  }

  isActiveHB(e) {
    if (e.target.checked) {
      this.isImgHBGActive = false;
      this.isImgHBActive = true;
    } else {
      this.isImgHBGActive = true;
      this.isImgHBActive = false;
      this.clearHB();
    }
  }

  isActiveHBS(e) {
    if (e.target.checked) {
      if (this.abmForm.get('HB').get('isActice').value) {
        this.isImgHBSGActive = false;
        this.isImgHBSActive = true;

        this.absForm.get('HBS').get('sumAssured').setValue(this.abmForm.get('HB').get('sumAssured').value);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.absForm.get('HBS').get('isActice').setValue(false);
        swal("HB Required!", "Can't get this benefict without getting HB..!", "warning");
      }

    } else {
      this.isImgHBSGActive = true;
      this.isImgHBSActive = false;

      this.clearHBS();
    }
  }

  isActiveHBC(e) {
    if (e.target.checked) {
      if (this.abmForm.get('HB').get('isActice').value) {
        this.isImgHBCGActive = false;
        this.isImgHBCActive = true;

        this.abcForm.get('HBC').get('sumAssured').setValue(this.abmForm.get('HB').get('sumAssured').value);


        for (var c in this._childrens) {
          let child = new Children();
          child = this._childrens[c];
          child._cHbc = true;
        }

        console.log(this._childrens);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.abcForm.get('HBC').get('isActice').setValue(false);
        this.abcForm.get('HBC').get('sumAssured').disable();
        swal("HB Required!", "Can't get this benefict without getting HB..!", "warning");
      }

    } else {
      this.isImgHBCGActive = true;
      this.isImgHBCActive = false;

      this.clearHBC();
    }
  }

  isActiveHRBI(e) {
    if (e.target.checked) {
      this.isImgHRBIGActive = false;
      this.isImgHRBIActive = true;
      this.isGetHcbi = true;
      this.isGetHealthBenef = true;
    } else {
      this.isImgHRBIGActive = true;
      this.isImgHRBIActive = false;

      this.isGetHealthBenef = false;
      this.isGetHcbi = false;
      this.isGetHcbf = false;
      this.isGetShcbf = false;
      this.isGetShcbi = false;

      this.clearHRBI();
    }
  }

  isActiveHRBIS(e) {
    if (e.target.checked) {
      if (this.abmForm.get('HRBI').get('isActice').value) {
        this.absForm.get('HRBIS').get('sumAssured').setValue(this.abmForm.get('HRBI').get('sumAssured').value);
        this.isImgHRBISGActive = false;
        this.isImgHRBISActive = true;
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.absForm.get('HRBIS').get('isActice').setValue(false);
        swal("HRBI Required!", "Can't get this benefict without getting HRBI..!", "warning");
      }

    } else {
      this.isImgHRBISGActive = true;
      this.isImgHRBISActive = false;

      this.clearHRBIS();
    }
  }

  isActiveHRBIC(e) {
    if (e.target.checked) {
      if (this.abmForm.get('HRBI').get('isActice').value) {
        this.abcForm.get('HRBIC').get('sumAssured').setValue(this.abmForm.get('HRBI').get('sumAssured').value);
        this.isImgHRBICGActive = false;
        this.isImgHRBICActive = true;

        for (var c in this._childrens) {
          let child = new Children();
          child = this._childrens[c];
          child._cHcbc = true;
          child._cHrbic = true;
        }

        console.log(this._childrens);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");

      } else {
        this.abcForm.get('HRBIC').get('isActice').setValue(false);
        swal("HRBI Required!", "Can't get this benefict without getting HRBI..!", "warning");
      }

    } else {
      this.isImgHRBICGActive = true;
      this.isImgHRBICActive = false;

      this.clearHRBIC();
    }
  }

  isActiveHRBF(e) {
    if (e.target.checked) {

      if (this.activeSp == "1" || this.activeCh == "1") {

        this.isImgHRBFGActive = false;
        this.isImgHRBFActive = true;
        this.isGetHcbf = true;
        this.isGetHealthBenef = true;
        if (this.activeSp == "1") {
          this.absForm.get('HRBFS').get('isActice').setValue(true);

          this.isImgHRBFSGActive = false;
          this.isImgHRBFSActive = true;
        } else {
          if (this.activeCh == "1") {
            this.abcForm.get('HRBFC').get('isActice').setValue(true);


            this.isImgHRBFCGActive = false;
            this.isImgHRBFCActive = true;

            for (var c in this._childrens) {
              let child = new Children();
              child = this._childrens[c];
              child._cHcbc = true;
              child._cHrbfc = true;
            }
          }
        }

      } else {
        this.abmForm.get('HRBF').get('isActice').setValue(false);
        this.abmForm.get('HRBF').get('sumAssured').disable();
        swal("Can't get this benefict without spouse or child ..!", "", "warning");
      }


    } else {
      this.isImgHRBFGActive = true;
      this.isImgHRBFActive = false;
      this.isGetHealthBenef = false;
      this.isGetHcbi = false;
      this.isGetHcbf = false;
      this.isGetShcbf = false;
      this.isGetShcbi = false;
      this.clearHRBF();
    }
  }

  isActiveHRBFS(e) {
    if (e.target.checked) {
      if (this.abmForm.get('HRBF').get('isActice').value) {
        this.isImgHRBFSGActive = false;
        this.isImgHRBFSActive = true;

        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.absForm.get('HRBFS').get('isActice').setValue(false);
        swal("HRBF Required!", "Can't get this benefict without getting HRBF..!", "warning");
      }

    } else {
      this.isImgHRBFSGActive = true;
      this.isImgHRBFSActive = false;

      this.clearHRBFS();
    }
  }

  isActiveHRBFC(e) {
    if (e.target.checked) {
      if (this.abmForm.get('HRBF').get('isActice').value) {
        this.isImgHRBFCGActive = false;
        this.isImgHRBFCActive = true;

        for (var c in this._childrens) {
          let child = new Children();
          child = this._childrens[c];
          child._cHcbc = true;
          child._cHrbfc = true;
        }

        console.log(this._childrens);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.abcForm.get('HRBFC').get('isActice').setValue(false);
        swal("HRBF Required!", "Can't get this benefict without getting HRBF..!", "warning");
      }

    } else {
      this.isImgHRBFCGActive = true;
      this.isImgHRBFCActive = false;

      this.clearHRBFC();
    }
  }

  isActiveMFIBD(e) {
    if (e.target.checked) {
      this.isImgMFIBDGActive = false;
      this.isImgMFIBDActive = true;
    } else {
      this.isImgMFIBDGActive = true;
      this.isImgMFIBDActive = false;
      this.clearMFIBD();
    }
  }

  isActiveMFIBDT(e) {
    if (e.target.checked) {
      this.isImgMFIBDTGActive = false;
      this.isImgMFIBDTActive = true;
    } else {
      this.isImgMFIBDTGActive = true;
      this.isImgMFIBDTActive = false;
      this.clearMFIBDT();
    }
  }

  isActiveMFIBT(e) {
    if (e.target.checked) {
      this.isImgMFIBTGActive = false;
      this.isImgMFIBTActive = true;
    } else {
      this.isImgMFIBTGActive = true;
      this.isImgMFIBTActive = false;
      this.clearMFIBT();
    }
  }

  isActivePPDB(e) {
    if (e.target.checked) {
      this.isImgPPDBGActive = false;
      this.isImgPPDBActive = true;
    } else {
      this.isImgPPDBGActive = true;
      this.isImgPPDBActive = false;
      this.clearPPDB();
    }
  }
  isActivePPDBS(e) {
    if (e.target.checked) {
      this.isImgPPDBSGActive = false;
      this.isImgPPDBSActive = true;
    } else {
      this.isImgPPDBSGActive = true;
      this.isImgPPDBSActive = false;
    }
  }

  isActiveSUHRB(e) {
    if (e.target.checked) {
      this.isImgSUHRBGActive = false;
      this.isImgSUHRBActive = true;
      this.isGetHealthBenef = true;
      this.isGetShcbi = true;
    } else {
      this.isImgSUHRBGActive = true;
      this.isImgSUHRBActive = false;

      this.isGetHealthBenef = false;
      this.isGetHcbi = false;
      this.isGetHcbf = false;
      this.isGetShcbf = false;
      this.isGetShcbi = false;

      this.clearSUHRB();
    }
  }

  isActiveSHCBF(e) {
    if (e.target.checked) {

      if (this.activeSp == "1" || this.activeCh == "1") {
        this.isImgSHCBFGActive = false;
        this.isImgSHCBFActive = true;
        this.isGetHealthBenef = true;
        this.isGetShcbf = true;

        if (this.activeSp == "1") {
          this.absForm.get('SHCBFS').get('isActice').setValue(true);

          this.isImgSHCBFSGActive = false;
          this.isImgSHCBFSActive = true;
        } else {

          if (this.activeCh == "1") {
            this.abcForm.get('SHCBFC').get('isActice').setValue(true);

            for (var c in this._childrens) {
              let child = new Children();
              child = this._childrens[c];
              child._cHcbc = true;
              child._cShcbfc = true;
            }
            this.isImgSHCBFCGActive = false;
            this.isImgSHCBFCActive = true;
          }
        }


      } else {
        this.abmForm.get('SHCBF').get('isActice').setValue(false);
        this.abmForm.get('SHCBF').get('sumAssured').disable();
        swal("Can't get this benefict without spouse..!", "", "warning");
      }
    } else {
      this.isImgSHCBFGActive = true;
      this.isImgSHCBFActive = false;

      this.isGetHealthBenef = false;
      this.isGetHcbi = false;
      this.isGetHcbf = false;
      this.isGetShcbf = false;
      this.isGetShcbi = false;

      this.clearSHCBF();
    }
  }

  isActiveSHCBFS(e) {
    if (e.target.checked) {
      if (this.abmForm.get('SHCBF').get('isActice').value) {
        this.isImgSHCBFSGActive = false;
        this.isImgSHCBFSActive = true;
      } else {
        this.absForm.get('SHCBFS').get('isActice').setValue(false);
      }

    } else {
      this.isImgSHCBFSGActive = true;
      this.isImgSHCBFSActive = false;

      this.clearSHCBFS();
    }
  }

  isActiveSHCBFC(e) {
    if (e.target.checked) {
      if (this.abmForm.get('SHCBFC').get('isActice').value) {
        this.isImgSHCBFCGActive = false;
        this.isImgSHCBFCActive = true;

        for (var c in this._childrens) {
          let child = new Children();
          child = this._childrens[c];
          child._cHcbc = true;
          child._cShcbfc = true;
        }

        console.log(this._childrens);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.abcForm.get('SHCBFC').get('isActice').setValue(false);
      }

    } else {
      this.isImgSHCBFCGActive = true;
      this.isImgSHCBFCActive = false;

      this.clearSHCBFC();
    }
  }

  isActiveHCBS(e) {
    if (e.target.checked) {
      swal("HCBI or HCBF or SHCBI or SHCBF must be required..", "", "warning");
      this.absForm.get('HCBS').get('isActice').setValue(false);
    }
  }

  isActiveHCBC(e) {
    if (e.target.checked) {
      swal("HCBI or HCBF or SHCBI or SHCBF must be required..", "", "warning");
      this.abcForm.get('HCBC').get('isActice').setValue(false);
    }
  }

  isActiveSUHRBS(e) {
    if (e.target.checked) {
      if (this.abmForm.get('SUHRB').get('isActice').value) {
        this.isImgSUHRBSGActive = false;
        this.isImgSUHRBSActive = true;
        this.absForm.get('SUHRBS').get('sumAssured').setValue(this.abmForm.get('SUHRB').get('sumAssured').value);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.absForm.get('SUHRBS').get('isActice').setValue(false);
        swal("SUHRB Required!", "Can't get this benefict without getting SUHRB..!", "warning");
      }

    } else {
      this.isImgSUHRBSGActive = true;
      this.isImgSUHRBSActive = false;

      this.clearSUHRBS();
    }
  }

  isActiveSUHRBC(e) {
    if (e.target.checked) {
      if (this.abmForm.get('SUHRB').get('isActice').value) {
        this.isImgSUHRBCGActive = false;
        this.isImgSUHRBCActive = true;

        this.abcForm.get('SUHRBC').get('sumAssured').setValue(this.abmForm.get('SUHRB').get('sumAssured').value);

        for (var c in this._childrens) {
          let child = new Children();
          child = this._childrens[c];
          child._cHcbc = true;
          child._cSuhrbc = true;
        }

        console.log(this._childrens);
        this.allForms.abmForm = this.abmForm;
        this.allForms.absForm = this.absForm;
        this.allForms.abcForm = this.abcForm;
        this.onsetBenifAll("", "");
      } else {
        this.abcForm.get('SUHRBC').get('isActice').setValue(false);
        swal("SUHRB Required!", "Can't get this benefict without getting SUHRB..!", "warning");
      }

    } else {
      this.isImgSUHRBCGActive = true;
      this.isImgSUHRBCActive = false;

      this.clearSUHRBC();
    }
  }

  isActiveTPDASB(e) {
    if (e.target.checked) {
      if (this.abmForm.get('ADB').get('isActice').value) {
        this.isImgTPDASBGActive = false;
        this.isImgTPDASBActive = true;
      } else {
        this.abmForm.get('TPDASB').get('isActice').setValue(false);
        swal("ADB Required!", "Can't get this benefict without getting ADB..!", "warning");
      }
    } else {
      this.isImgTPDASBGActive = true;
      this.isImgTPDASBActive = false;

      if (this.abmForm.get('ADB').get('isActice').value) {
        let tpdasb = this.abmForm.get('TPDASB').get('sumAssured').value;
        this.isImgTPDBGActive = false;
        this.isImgTPDBActive = true;
        this.abmForm.get('TPDB').get('isActice').setValue(true);
        this.abmForm.get('TPDB').get('sumAssured').enable();
        this.abmForm.get('TPDB').get('sumAssured').setValue(tpdasb);

        this.checkValidateTPDB();
      }

      this.clearTPDASB();

    }
  }

  isActiveTPDASBS(e) {
    if (e.target.checked) {
      if (this.absForm.get('ADBS').get('isActice').value) {
        this.isImgTPDASBSGActive = false;
        this.isImgTPDASBSActive = true;
      } else {
        this.absForm.get('TPDASBS').get('isActice').setValue(false);
        swal("ADBS Required!", "Can't get this benefict without getting ADBS..!", "warning");
      }

    } else {
      this.isImgTPDASBSGActive = true;
      this.isImgTPDASBSActive = false;

      if (this.absForm.get('ADBS').get('isActice').value) {
        let tpdasbs = this.absForm.get('TPDASBS').get('sumAssured').value;
        this.isImgTPDBSGActive = false;
        this.isImgTPDBSActive = true;
        this.absForm.get('TPDBS').get('isActice').setValue(true);
        this.absForm.get('TPDBS').get('sumAssured').enable();
        this.absForm.get('TPDBS').get('sumAssured').setValue(tpdasbs);

        this.checkValidateTPDBS();
      }

      this.clearTPDASBS();
    }
  }

  isActiveTPDB(e) {
    if (e.target.checked) {
      if (this.abmForm.get('ADB').get('isActice').value) {
        this.isImgTPDBGActive = false;
        this.isImgTPDBActive = true;
      } else {
        this.abmForm.get('TPDB').get('isActice').setValue(false);
        swal("ADB Required!", "Can't get this benefict without getting ADB..!", "warning");
      }

    } else {
      this.isImgTPDBGActive = true;
      this.isImgTPDBActive = false;
      if (this.abmForm.get('ADB').get('isActice').value) {
        let tpdb = this.abmForm.get('TPDB').get('sumAssured').value;
        this.isImgTPDASBGActive = false;
        this.isImgTPDASBActive = true;
        this.abmForm.get('TPDASB').get('isActice').setValue(true);
        this.abmForm.get('TPDASB').get('sumAssured').enable();
        this.abmForm.get('TPDASB').get('sumAssured').setValue(tpdb);

        this.checkValidateTPDASB();
      }

      this.clearTPDB();
    }
  }

  isActiveTPDBS(e) {
    if (e.target.checked) {
      if (this.absForm.get('ADBS').get('isActice').value) {
        this.isImgTPDBSGActive = false;
        this.isImgTPDBSActive = true;
      } else {
        this.absForm.get('TPDBS').get('isActice').setValue(false);
        swal("ADBS Required!", "Can't get this benefict without getting ADBS..!", "warning");
      }

    } else {
      this.isImgTPDBSGActive = true;
      this.isImgTPDBSActive = false;

      if (this.absForm.get('ADBS').get('isActice').value) {
        let tpdbs = this.absForm.get('TPDBS').get('sumAssured').value;
        this.isImgTPDASBGActive = false;
        this.isImgTPDASBActive = true;
        this.absForm.get('TPDASBS').get('isActice').setValue(true);
        this.absForm.get('TPDASBS').get('sumAssured').enable();
        this.absForm.get('TPDASBS').get('sumAssured').setValue(tpdbs);

        this.checkValidateTPDASBS();
      }

      this.clearTPDBS();
    }
  }

  isActiveWPB(e) {
    if (e.target.checked) {
      this.isImgWPBGActive = false;
      this.isImgWPBActive = true;
    } else {
      this.isImgWPBGActive = true;
      this.isImgWPBActive = false;
      this.clearWPB();
    }
  }

  isActiveWPBS(e) {
    if (e.target.checked) {
      if(this.absForm.get("CIBS").get("isActice").value || this.absForm.get("BSAS").get("isActice").value || this.absForm.get("FEBS").get("isActice").value){
        this.isImgWPBSGActive = false;
        this.isImgWPBSActive = true;
        this.onsetBenifAll(e,'WPBS');
      }else{
        swal("","SCB,FEBS or CIBS must be get before get WPBS.","warning");
        this.absForm.get("WPBS").get("isActice").setValue(false);
      }
    } else {
      this.isImgWPBSGActive = true;
      this.isImgWPBSActive = false;
      this.clearWPBS();
    }
  }


  onsetBenifM(e, val) {
    this.onsetBenifMainlife.emit(this.abmForm);
  }
  onsetBenifS(e, val) {
    this.onsetBenifSpouse.emit(this.absForm);
  }
  onsetBenifC(e, val) {
    this.onsetBenifChildren.emit(this.abcForm);
  }

  onsetBenifAll(e, val) {
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;

    this.onsetBenifAllForm.emit(this.allForms);
  }


  clearADB() {
    this.abmForm.get('ADB').get('sumAssured').setValue('0');
    this.abmForm.get('ADB').get('premium').setValue('0');

    this.abmForm.get('TPDASB').get('isActice').setValue(false);
    this.abmForm.get('TPDASB').get('sumAssured').setValue('0');
    this.abmForm.get('TPDASB').get('sumAssured').disable();
    this.abmForm.get('TPDASB').get('premium').setValue('0');
    this.isImgTPDASBActive = false;
    this.isImgTPDASBGActive = true;

    this.abmForm.get('TPDB').get('isActice').setValue(false);
    this.abmForm.get('TPDB').get('sumAssured').setValue('0');
    this.abmForm.get('TPDB').get('sumAssured').disable();
    this.abmForm.get('TPDB').get('premium').setValue('0');
    this.isImgTPDBActive = false;
    this.isImgTPDBGActive = true;

    this.abmForm.get('PPDB').get('isActice').setValue(false);
    this.abmForm.get('PPDB').get('sumAssured').setValue('0');
    this.abmForm.get('PPDB').get('sumAssured').disable();
    this.abmForm.get('PPDB').get('premium').setValue('0');
    this.isImgPPDBActive = false;
    this.isImgPPDBGActive = true;

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearATPB() {
    this.abmForm.get('ATPB').get('sumAssured').setValue('0');
    this.abmForm.get('ATPB').get('premium').setValue('0');

    this.absForm.get('BSAS').get('isActice').setValue(false);
    this.absForm.get('BSAS').get('sumAssured').setValue('0');
    this.absForm.get('BSAS').get('premium').setValue('0');
    this.isImgBSASGActive = true;
    this.isImgBSASActive = false;

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearTPDASB() {
    this.abmForm.get('TPDASB').get('sumAssured').setValue('0');
    this.abmForm.get('TPDASB').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearTPDB() {
    this.abmForm.get('TPDB').get('sumAssured').setValue('0');
    this.abmForm.get('TPDB').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearPPDB() {
    this.abmForm.get('PPDB').get('sumAssured').setValue('0');
    this.abmForm.get('PPDB').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearCIB() {
    this.abmForm.get('CIB').get('sumAssured').setValue('0');
    this.abmForm.get('CIB').get('premium').setValue('0');

    this.absForm.get('CIBS').get('sumAssured').setValue('0');
    this.absForm.get('CIBS').get('premium').setValue('0');
    this.absForm.get('CIBS').get('isActice').setValue(false);
    this.isImgCIBSActive = false;
    this.isImgCIBSGActive = true;

    this.abcForm.get('CIBC').get('sumAssured').setValue('0');
    this.abcForm.get('CIBC').get('premium').setValue('0');
    this.abcForm.get('CIBC').get('isActice').setValue(false);
    this.isImgCIBCGActive = true;
    this.isImgCIBCActive = false;

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearFEB() {
    this.abmForm.get('FEB').get('sumAssured').setValue('0');
    this.abmForm.get('FEB').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearMFIBD() {
    this.abmForm.get('MFIBD').get('sumAssured').setValue('0');
    this.abmForm.get('MFIBD').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearMFIBT() {
    this.abmForm.get('MFIBT').get('sumAssured').setValue('0');
    this.abmForm.get('MFIBT').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearMFIBDT() {
    this.abmForm.get('MFIBDT').get('sumAssured').setValue('0');
    this.abmForm.get('MFIBDT').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHRBI() {
    this.abmForm.get('HRBI').get('sumAssured').setValue('0');
    this.abmForm.get('HRBI').get('premium').setValue('0');

    this.absForm.get('HRBIS').get('sumAssured').setValue('0');
    this.absForm.get('HRBIS').get('sumAssured').disable();
    this.absForm.get('HRBIS').get('premium').setValue('0');
    this.absForm.get('HRBIS').get('isActice').setValue(false);
    this.isImgHRBISActive = false;
    this.isImgHRBISGActive = true;

    this.abcForm.get('HRBIC').get('sumAssured').setValue('0');
    this.abcForm.get('HRBIC').get('sumAssured').disable();
    this.abcForm.get('HRBIC').get('premium').setValue('0');
    this.abcForm.get('HRBIC').get('isActice').setValue(false);
    this.isImgHRBICActive = false;
    this.isImgHRBICGActive = true;

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cHrbic = false;
    }

    console.log(this._childrens);


    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  clearHRBF() {
    this.abmForm.get('HRBF').get('sumAssured').setValue('0');
    this.abmForm.get('HRBF').get('premium').setValue('0');

    this.absForm.get('HRBFS').get('sumAssured').setValue('0');
    this.absForm.get('HRBFS').get('sumAssured').disable();
    this.absForm.get('HRBFS').get('premium').setValue('0');
    this.absForm.get('HRBFS').get('isActice').setValue(false);
    this.isImgHRBFSActive = false;
    this.isImgHRBFSGActive = true;

    this.abcForm.get('HRBFC').get('sumAssured').setValue('0');
    this.abcForm.get('HRBFC').get('sumAssured').disable();
    this.abcForm.get('HRBFC').get('premium').setValue('0');
    this.abcForm.get('HRBFC').get('isActice').setValue(false);
    this.isImgHRBFCActive = false;
    this.isImgHRBFCGActive = true;

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cHrbfc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearSUHRB() {
    this.abmForm.get('SUHRB').get('sumAssured').setValue('0');
    this.abmForm.get('SUHRB').get('premium').setValue('0');

    this.absForm.get('SUHRBS').get('sumAssured').setValue('0');
    this.absForm.get('SUHRBS').get('sumAssured').disable();
    this.absForm.get('SUHRBS').get('premium').setValue('0');
    this.absForm.get('SUHRBS').get('isActice').setValue(false);
    this.isImgSUHRBSActive = false;
    this.isImgSUHRBSGActive = true;

    this.abcForm.get('SUHRBC').get('sumAssured').setValue('0');
    this.abcForm.get('SUHRBC').get('sumAssured').disable();
    this.abcForm.get('SUHRBC').get('premium').setValue('0');
    this.abcForm.get('SUHRBC').get('isActice').setValue(false);
    this.isImgSUHRBCActive = false;
    this.isImgSUHRBCGActive = true;

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cSuhrbc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearSHCBF() {
    this.abmForm.get('SHCBF').get('sumAssured').setValue('0');
    this.abmForm.get('SHCBF').get('premium').setValue('0');

    this.absForm.get('SHCBFS').get('sumAssured').setValue('0');
    this.absForm.get('SHCBFS').get('sumAssured').disable();
    this.absForm.get('SHCBFS').get('premium').setValue('0');
    this.absForm.get('SHCBFS').get('isActice').setValue(false);
    this.isImgSHCBFSActive = false;
    this.isImgSHCBFSGActive = true;

    this.abcForm.get('SHCBFC').get('sumAssured').setValue('0');
    this.abcForm.get('SHCBFC').get('sumAssured').disable();
    this.abcForm.get('SHCBFC').get('premium').setValue('0');
    this.abcForm.get('SHCBFC').get('isActice').setValue(false);
    this.isImgSHCBFCActive = false;
    this.isImgSHCBFCActive = true;

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cShcbfc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHB() {
    this.abmForm.get('HB').get('sumAssured').setValue('0');
    this.abmForm.get('HB').get('premium').setValue('0');

    this.absForm.get('HBS').get('sumAssured').setValue('0');
    this.absForm.get('HBS').get('premium').setValue('0');
    this.absForm.get('HBS').get('isActice').setValue(false);
    this.isImgHBSActive = false;
    this.isImgHBSGActive = true;

    this.abcForm.get('HBC').get('sumAssured').setValue('0');
    this.abcForm.get('HBC').get('premium').setValue('0');
    this.abcForm.get('HBC').get('isActice').setValue(false);
    this.isImgHBCActive = false;
    this.isImgHBCGActive = true;

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHbc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearWPB() {
    this.abmForm.get('WPB').get('sumAssured').setValue('0');
    this.abmForm.get('WPB').get('premium').setValue('0');
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearWPBS() {
    this.absForm.get('WPBS').get('sumAssured').setValue('0');
    this.absForm.get('WPBS').get('premium').setValue('0');
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearCIBS() {
    this.absForm.get('CIBS').get('sumAssured').setValue('0');
    this.absForm.get('CIBS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearBSAS() {
    this.absForm.get('BSAS').get('sumAssured').setValue('0');
    this.absForm.get('BSAS').get('premium').setValue('0');
    this.clearADBS();
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearADBS() {
    this.absForm.get('ADBS').get('isActice').setValue(false);
    this.absForm.get('ADBS').get('sumAssured').setValue('0');
    this.absForm.get('ADBS').get('premium').setValue('0');
    this.isImgADBSActive = false;
    this.isImgADBSGActive = true;

    this.absForm.get('TPDASBS').get('isActice').setValue(false);
    this.absForm.get('TPDASBS').get('sumAssured').setValue('0');
    this.absForm.get('TPDASBS').get('sumAssured').disable();
    this.absForm.get('TPDASBS').get('premium').setValue('0');
    this.isImgTPDASBSActive = false;
    this.isImgTPDASBSGActive = true;

    this.absForm.get('TPDBS').get('isActice').setValue(false);
    this.absForm.get('TPDBS').get('sumAssured').setValue('0');
    this.absForm.get('TPDBS').get('sumAssured').disable();
    this.absForm.get('TPDBS').get('premium').setValue('0');
    this.isImgTPDBSActive = false;
    this.isImgTPDBSGActive = true;

    this.absForm.get('PPDBS').get('isActice').setValue(false);
    this.absForm.get('PPDBS').get('sumAssured').setValue('0');
    this.absForm.get('PPDBS').get('sumAssured').disable();
    this.absForm.get('PPDBS').get('premium').setValue('0');
    this.isImgPPDBSActive = false;
    this.isImgPPDBSGActive = true;

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearTPDASBS() {
    this.absForm.get('TPDASBS').get('sumAssured').setValue('0');
    this.absForm.get('TPDASBS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearTPDBS() {
    this.absForm.get('TPDBS').get('sumAssured').setValue('0');
    this.absForm.get('TPDBS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearFEBS() {
    this.absForm.get('FEBS').get('sumAssured').setValue('0');
    this.absForm.get('FEBS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHRBIS() {
    this.absForm.get('HRBIS').get('sumAssured').setValue('0');
    this.absForm.get('HRBIS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHRBFS() {
    this.absForm.get('HRBFS').get('sumAssured').setValue('0');
    this.absForm.get('HRBFS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearSUHRBS() {
    this.absForm.get('SUHRBS').get('sumAssured').setValue('0');
    this.absForm.get('SUHRBS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearSHCBFS() {
    this.absForm.get('SHCBFS').get('sumAssured').setValue('0');
    this.absForm.get('SHCBFS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearSHCBFC() {
    this.abcForm.get('SHCBFC').get('sumAssured').setValue('0');
    this.abcForm.get('SHCBFC').get('premium').setValue('0');

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cShcbfc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHBS() {
    this.absForm.get('HBS').get('sumAssured').setValue('0');
    this.absForm.get('HBS').get('premium').setValue('0');

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearCIBC() {
    this.abcForm.get('CIBC').get('sumAssured').setValue('0');
    this.abcForm.get('CIBC').get('premium').setValue('0');

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cCibc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHRBIC() {
    this.abcForm.get('HRBIC').get('sumAssured').setValue('0');
    this.abcForm.get('HRBIC').get('premium').setValue('0');

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cHrbic = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHRBFC() {
    this.abcForm.get('HRBFC').get('sumAssured').setValue('0');
    this.abcForm.get('HRBFC').get('premium').setValue('0');

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cHrbfc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearSUHRBC() {
    this.abcForm.get('SUHRBC').get('sumAssured').setValue('0');
    this.abcForm.get('SUHRBC').get('premium').setValue('0');

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHcbc = false;
      child._cSuhrbc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  clearHBC() {
    this.abcForm.get('HBC').get('sumAssured').setValue('0');
    this.abcForm.get('HBC').get('premium').setValue('0');

    for (var c in this._childrens) {
      let child = new Children();
      child = this._childrens[c];
      child._cHbc = false;
    }

    console.log(this._childrens);

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateADB() {
    this.validateADB = this.benefitsValidations.validateadb(this.personalInfo.bsa, this.abmForm.get('ADB').get('sumAssured').value);

    if (this.validateADB == 1) {
      this.abmForm.get('PPDB').get('sumAssured').setValue(this.abmForm.get('ADB').get('sumAssured').value);
      if (this.abmForm.get('TPDASB').get('isActice').value) {
        this.abmForm.get('TPDASB').get('sumAssured').setValue(this.abmForm.get('ADB').get('sumAssured').value);
      } else {
        this.abmForm.get('TPDB').get('sumAssured').setValue(this.abmForm.get('ADB').get('sumAssured').value);
      }
    } else {
      swal("Error!", "ADB must be greater than or equal BSA and ADB must be less than or equal (BSA x 6) and ADB mod 25000 equal 0 Max value must be 25,000,000", "error");

    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateATPB() {
    this.validateATPB = this.benefitsValidations.validatteAtpb(this.personalInfo.bsa, this.abmForm.get('ATPB').get('sumAssured').value);
    if (this.validateATPB == 1) {
      console.log(this.validateATPB);
      if (this.abmForm.get('CIB').get('isActice').value) {
        this.checkValidateCIB();
      }
      if (this.absForm.get('BSAS').get('isActice').value) {
        this.checkValidateSCB();
      }
      if (this.abcForm.get('CIBC').get('isActice').value) {
        console.log(this.abmForm.get('CIBC').get('isActice').value);
        this.checkValidateCIBC();
      }
    } else {
      swal("Error!", "ATPB must be greater than or equal BSA and ATPB must be less than or equal (BSA x 10) and ATPB mod 250000 equal 0", "error");

    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  checkValidateTPDASB() {
    let aDB = this.abmForm.get('ADB').get('sumAssured').value;
    let pre = this.abmForm.get('ADB').get('premium').value;
    let rBSA = this.abmForm.get('TPDASB').get('sumAssured').value;

    if (!(this.abmForm.get('TPDB').get('isActice').value) && (this.abmForm.get('ADB').get('isActice').value) && pre > 0) {
      this.validateTPDASB = this.benefitsValidations.validateTPDASB(rBSA, aDB);

      if (this.validateTPDASB == 1) {

      } else {
        swal("Error!", "TPDASB must be equals to ADB", "error");
      }
    } else {
      swal("ADB Required..");
      this.validateTPDASB = 0;
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateTPDB() {
    let aDB = this.abmForm.get('ADB').get('sumAssured').value;
    let pre = this.abmForm.get('ADB').get('premium').value;
    let rBSA = this.abmForm.get('TPDB').get('sumAssured').value;

    if (!(this.abmForm.get('TPDASB').get('isActice').value) && (this.abmForm.get('ADB').get('isActice').value) && pre > 0) {
      this.validateTPDB = this.benefitsValidations.validateTPDB(rBSA, aDB);

      if (this.validateTPDB == 1) {

      } else {
        swal("Error!", "TPDB must be equals to ADB", "error");
      }
    } else {
      swal("ADB Required!", "Can't get this benefict without getting ADB..!", "warning");
      this.validateTPDB = 0;
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidatePPDB() {
    let aDB = this.abmForm.get('ADB').get('sumAssured').value;
    let pre = this.abmForm.get('ADB').get('premium').value;
    let rBSA = this.abmForm.get('PPDB').get('sumAssured').value;

    if ((this.abmForm.get('ADB').get('isActice').value) && pre > 0) {
      this.validatePPDB = this.benefitsValidations.validatePPDB(rBSA, aDB);

      if (this.validatePPDB == 1) {
      } else {
        swal("Error!", "PPDB must be equals to ADB", "error");
      }
    } else {
      swal("ADB Required!", "Can't get this benefict without getting ADB..!", "warning");
      this.validatePPDB = 0;
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateCIB() {
    let bSA = this.personalInfo.bsa;
    let aTPB = this.abmForm.get('ATPB').get('sumAssured').value;
    let rBSA = this.abmForm.get('CIB').get('sumAssured').value;

    this.validateCIB = this.benefitsValidations.validateCIB(rBSA, bSA, aTPB);

    if (this.validateCIB == 1) {
    } else {
      swal("Error!", "CIB must be greater than or equal 250,000 and less than or equal 6,000,000 and less than or equal sum of ATPB and BSA and CIB mod 25,000 must be equal to 0", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateFEB() {
    let bSA = this.personalInfo.bsa;
    let rBSA = this.abmForm.get('FEB').get('sumAssured').value;

    this.validateFEB = this.benefitsValidations.validateFEB(rBSA, bSA);

    if (this.validateFEB == 1) {
    } else {
      swal("Error!", "FEB must be greater than or equal 25,000 and less than or equal 75,000 and less than or equal 10% of BSA", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateMFIBD() {
    let rBSA = this.abmForm.get('MFIBD').get('sumAssured').value;
    this.validateMFIBD = this.benefitsValidations.validateMFIBD(rBSA);

    if (this.validateMFIBD == 1) {
    } else {
      swal("Error!", "MIFBD must be greater than or equal 10,000 and less than or equal 100,000  and Less than Yearly Premium", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateMFIBT() {
    let rBSA = this.abmForm.get('MFIBT').get('sumAssured').value;
    this.validateMFIBT = this.benefitsValidations.validateMFIBT(rBSA);

    if (this.validateMFIBT == 1) {
    } else {
      swal("Error!", "MIFBT must be greater than or equal 10,000 and less than or equal 100,000  and Less than Yearly Premium", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateMFIBDT() {
    let rBSA = this.abmForm.get('MFIBDT').get('sumAssured').value;
    this.validateMFIBDT = this.benefitsValidations.validateMFIBDT(rBSA);

    if (this.validateMFIBDT == 1) {
    } else {
      swal("Error!", "MFIBDT must be greater than or equal 10,000 and less than or equal 100,000  and Less than Yearly Premium", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateHRBI() {
    let rBSA = this.abmForm.get('HRBI').get('sumAssured').value;
    this.validateHRBI = this.benefitsValidations.validateHRBI(rBSA);

    if (this.validateHRBI == 1) {

      if (this.absForm.get('HRBIS').get('isActice').value) {
        this.absForm.get('HRBIS').get('sumAssured').setValue(rBSA);
        //this.checkValidateHRBIS();
      }
      if (this.abcForm.get('HRBIC').get('isActice').value) {
        this.abcForm.get('HRBIC').get('sumAssured').setValue(rBSA);
        //this.checkValidateHRBIC();
      }
    } else {
      swal("Error!", "HRBI must be equal to 100,000 , 200,000 , 300,000 , 400,000 or 500,000", "error");
    }

    this.allForms.abcForm = this.abcForm;
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;

    this.onsetBenifAll("", "");
    /*this.onsetBenifM("", "");
    this.onsetBenifS("", "");
    this.onsetBenifC("", "");*/

  }

  checkValidateHRBF() {
    let rBSA = this.abmForm.get('HRBF').get('sumAssured').value;
    this.validateHRBF = this.benefitsValidations.validateHRBF(rBSA);

    if (this.validateHRBF == 1) {

    } else {
      swal("Error!", "HRBF must be equal to 100,000 , 200,000 , 300,000 , 400,000 or 500,000", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  checkValidateSUHRB() {
    let rBSA = this.abmForm.get('SUHRB').get('sumAssured').value;
    this.validateSUHRB = this.benefitsValidations.validateSUHRB(rBSA);

    if (this.validateSUHRB == 1) {

      if (this.absForm.get('SUHRBS').get('isActice').value) {
        this.absForm.get('SUHRBS').get('sumAssured').setValue(rBSA);
        //this.checkValidateSUHRBS();
      }
      if (this.abcForm.get('SUHRBC').get('isActice').value) {
        this.abcForm.get('SUHRBC').get('sumAssured').setValue(rBSA);
        //this.checkValidateSUHRBC();
      }
    } else {
      swal("Error!", "SUHRB = 600000 or SUHRB = 800000 or SUHRB = 1000000", "error");
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  checkValidateSHCBF() {
    let rBSA = this.abmForm.get('SHCBF').get('sumAssured').value;
    this.validateSHCBF = this.benefitsValidations.validateSUHRB(rBSA);

    if (this.validateSHCBF == 1) {


    } else {
      swal("Error!", "SUHRB = 600000 or SUHRB = 800000 or SUHRB = 1000000", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  checkValidateHB() {
    let rBSA = this.abmForm.get('HB').get('sumAssured').value;
    this.validateHB = this.benefitsValidations.validateHB(rBSA);

    if (this.validateHB == 1) {

      if (this.absForm.get('HBS').get('isActice').value) {
        this.absForm.get('HBS').get('sumAssured').setValue(rBSA);
        this.checkValidateHBS();
      }
      if (this.abcForm.get('HBC').get('isActice').value) {
        this.abcForm.get('HBC').get('sumAssured').setValue(rBSA);
        this.checkValidateHBC();
      }
    } else {
      swal("Error!", "HB must be greater than or equal 500 and less than or equal 10,000 and multi value of 100  and Less than 10% of Yearly Premium", "error");
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  ///////////spuouse//////////

  checkValidateSCB() {
    let bSA = this.personalInfo.bsa;
    let rBSA = this.absForm.get('BSAS').get('sumAssured').value;
    let aTPB = this.abmForm.get('ATPB').get('sumAssured').value;

    this.validateSCB = this.benefitsValidations.validateSCB(rBSA, bSA, aTPB);

    if (this.validateSCB == 1) {

      if (this.absForm.get('ADBS').get('isActice').value) {
        this.checkValidateADBS();
      }
    } else {
      swal("Error!", "SCB must be greater than or equal 250,000 and less than or equal sum of BSA and ATPB", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateADBS() {
    let sCB = this.absForm.get('BSAS').get('sumAssured').value;
    let rBSA = this.absForm.get('ADBS').get('sumAssured').value;
    let aDB = this.abmForm.get('ADB').get('sumAssured').value;

    if (this.absForm.get('BSAS').get('premium').value > 0) {
      if (this.abmForm.get('ADB').get('premium').value > 0) {
        this.validateADBS = this.benefitsValidations.validateADBSNew(rBSA, sCB, aDB);

        if (this.validateADBS == 1) {
          this.absForm.get('PPDBS').get('sumAssured').setValue(this.absForm.get('ADBS').get('sumAssured').value);
          if (this.absForm.get('TPDASBS').get('isActice').value) {
            this.absForm.get('TPDASBS').get('sumAssured').setValue(this.absForm.get('ADBS').get('sumAssured').value);
          } else {
            this.absForm.get('TPDBS').get('sumAssured').setValue(this.absForm.get('ADBS').get('sumAssured').value);
          }
        } else {
          swal("Error!", "ADBS must be greater than or equal BSAS and ADBS must be less than or equal ADB and ADBS must be less than or equal (BSAS x 6) and ADBS mod 25000 equal 0 Max value must be 25,000,000", "error");
        }
      } else {
        swal("ADB Required!", "Can't get this benefict without getting ADB..!", "warning");
      }
    } else {
      swal("SCB Required!", "Can't get this benefict without getting SCB..!", "warning");
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }

  checkValidateTPDASBS() {
    let aDBS = this.absForm.get('ADBS').get('sumAssured').value;
    let pre = this.absForm.get('ADBS').get('premium').value;
    let rBSA = this.absForm.get('TPDASBS').get('sumAssured').value;

    if (!(this.absForm.get('TPDBS').get('isActice').value) && (this.absForm.get('ADBS').get('isActice').value) && pre > 0) {
      this.validateTPDASBS = this.benefitsValidations.validateTPDASBS(rBSA, aDBS);

      if (this.validateTPDASBS == 1) {
      } else {
        swal("Error!", "TPDASBS must be equals to ADBS", "error");
      }
    } else {
      swal("ADBS Required!", "Can't get this benefict without getting ADBS..!", "warning");

      this.validateTPDASBS = 0;
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateTPDBS() {
    let aDBS = this.absForm.get('ADBS').get('sumAssured').value;
    let pre = this.absForm.get('ADBS').get('premium').value;
    let rBSA = this.absForm.get('TPDBS').get('sumAssured').value;

    if (!(this.absForm.get('TPDASBS').get('isActice').value) && (this.absForm.get('ADBS').get('isActice').value) && pre > 0) {
      this.validateTPDBS = this.benefitsValidations.validateTPDBS(rBSA, aDBS);

      if (this.validateTPDBS == 1) {
      } else {
        swal("Error!", "TPDBS must be equals to ADBS", "error");
      }
    } else {
      swal("ADBS Required!", "Can't get this benefict without getting ADBS..!", "warning");

      this.validateTPDBS = 0;
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidatePPDBS() {
    let aDBS = this.absForm.get('ADBS').get('sumAssured').value;
    let pre = this.absForm.get('ADBS').get('premium').value;
    let rBSA = this.absForm.get('PPDBS').get('sumAssured').value;

    if (this.absForm.get('ADBS').get('isActice').value && pre > 0) {
      this.validatePPDBS = this.benefitsValidations.validatePPDBS(rBSA, aDBS);

      if (this.validatePPDBS == 1) {
      } else {
        swal("Error!", "PPDBS must be equals to ADBS", "error");
      }
    } else {
      swal("ADBS Required!", "Can't get this benefict without getting ADBS..!", "warning");

      this.validatePPDBS = 0;
    }
    this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
  }

  checkValidateSCIB() {
    let sCB = this.absForm.get('BSAS').get('sumAssured').value;
    let rBSA = this.absForm.get('CIBS').get('sumAssured').value;

    this.validateSCIB = this.benefitsValidations.validateSCIB(rBSA, sCB);

    if (this.validateSCIB == 1) {
    } else {
      swal("Error!", "SCIB must be greater than or equal 250,000 and less than or equal 6,000,000 and less than or equal SCB and SCIB mod 25,000 must be equal to 0", "error");
    }
    this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
  }

  checkValidateFEBS() {
    let bSA = this.personalInfo.bsa;
    let rBSA = this.absForm.get('FEBS').get('sumAssured').value;

    this.validateFEBS = this.benefitsValidations.validateFEBS(rBSA, bSA);

    if (this.validateFEBS == 1) {
    } else {
      swal("Error!", "FEBS must be greater than or equal 25,000 and less than or equal 75,000 and less than or equal 10% of BSA", "error");
    }
    this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
  }

  checkValidateHRBIS() {
    let rBSA = this.absForm.get('HRBIS').get('sumAssured').value;
    let hRB = this.abmForm.get('HRBI').get('sumAssured').value;

    if (this.abmForm.get('HRBI').get('sumAssured').value > 0) {
      this.validateHRBIS = this.benefitsValidations.validateHRBIS(rBSA, hRB);
      if (this.validateHRBIS == 1) {
      } else {
        swal("Error!", "HRBIS must be equal to HRBI", "error");
      }
    } else {
      //swal("HRBI Required!", "Can't get this benefict without getting HRBI..!", "warning");
    }
    this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
  }

  checkValidateSUHRBS() {
    let rBSA = this.absForm.get('SUHRBS').get('sumAssured').value;
    let sUHRB = this.abmForm.get('SUHRB').get('sumAssured').value;

    if (this.abmForm.get('SUHRB').get('sumAssured').value > 0) {
      this.validateSUHRBS = this.benefitsValidations.validateSUHRBS(rBSA, sUHRB);

      if (this.validateSUHRBS == 1) {
      } else {
        swal("Error!", "SUHRBS must be equal to SUHRB", "error");
      }
    } else {
      swal("SUHRB Required!", "Can't get this benefict without getting SUHRB..!", "warning");
    }
    this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
  }

  checkValidateHBS() {
    let rBSA = this.absForm.get('HBS').get('sumAssured').value;
    let hBS = this.abmForm.get('HB').get('sumAssured').value;

    if (this.abmForm.get('HB').get('sumAssured').value > 0) {
      this.validateHBS = this.benefitsValidations.validateHBS(rBSA, hBS);

      if (this.validateHBS == 1) {
      } else {
        swal("Error!", "HBS must be equal to HB", "error");
      }
      this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
    } else {
      swal("HB Required!", "Can't get this benefict without getting HB..!", "warning");
    }
    this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
  }

  ///////children///////

  checkValidateCIBC() {
    let bSA = this.personalInfo.bsa;
    let rBSA = this.abcForm.get('CIBC').get('sumAssured').value;
    let aTPB = this.abmForm.get('ATPB').get('sumAssured').value;

    //if (this.abmForm.get('ATPB').get('isActice').value) {
    this.validateCIBC = this.benefitsValidations.validateCIBC(rBSA, bSA, aTPB);

    if (this.validateCIBC == 1) {
    } else {
      swal("Error!", "CIBC must be greater than or equal 250,000 and less than or equal 1,000,000 and less than or equal sum of ATPB and BSA and CIBC mod 25,000 must be equal to 0", "error");
    }
    //} else {
    //swal("ATPB Required!", "Can't get this benefict without getting ATPB..!", "warning");
    //}
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateHRBIC() {
    let rBSA = this.abcForm.get('HRBIC').get('sumAssured').value;
    let hRB = this.abmForm.get('HRBI').get('sumAssured').value;

    if (this.abmForm.get('HRBI').get('sumAssured').value > 0) {
      this.validateHRBIC = this.benefitsValidations.validateHRBIC(rBSA, hRB);

      if (this.validateHRBIC == 1) {
      } else {
        swal("Error!", "HRBIC must be equal to HRBI", "error");
      }
    } else {
      //swal("HRBI Required!", "Can't get this benefict without getting HRBI..!", "warning");
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateSUHRBC() {
    let rBSA = this.abcForm.get('SUHRBC').get('sumAssured').value;
    let sUHRB = this.abmForm.get('SUHRB').get('sumAssured').value;

    if (this.abmForm.get('SUHRB').get('sumAssured').value > 0) {
      this.validateSUHRBC = this.benefitsValidations.validateSUHRBC(rBSA, sUHRB);

      if (this.validateSUHRBC == 1) {
      } else {
        swal("Error!", "SUHRBC must be equal to SUHRB", "error");
      }
    } else {
      swal("SUHRB Required!", "Can't get this benefict without getting SUHRB..!", "warning");
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  checkValidateHBC() {
    let rBSA = this.abcForm.get('HBC').get('sumAssured').value;
    let hBS = this.abmForm.get('HB').get('sumAssured').value;

    if (this.abmForm.get('HB').get('sumAssured').value > 0) {
      this.validateHBC = this.benefitsValidations.validateHBC(rBSA, hBS);

      if (this.validateHBC == 1) {
      } else {
        swal("Error!", "HBC must be equal to HB", "error");
      }
    } else {
      swal("HB Required!", "Can't get this benefict without getting HB..!", "warning");
    }
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }

  loadDefault() {
    this.abmForm.reset();
    this.absForm.reset();
    this.abcForm.reset();

    this.isImgBSAGActive = true;
    this.isImgBSAActive = false;

    this.isImgBSASGActive = true;
    this.isImgBSASActive = false;

    this.isImgADBGActive = true;
    this.isImgADBActive = false;

    this.isImgADBSGActive = true;
    this.isImgADBSActive = false;

    this.isImgATPBGActive = true;
    this.isImgATPBActive = false;

    this.isImgCIBGActive = true;
    this.isImgCIBActive = false;

    this.isImgCIBSGActive = true;
    this.isImgCIBSActive = false;

    this.isImgCIBCGActive = true;
    this.isImgCIBCActive = false;

    this.isImgFEBGActive = true;
    this.isImgFEBActive = false;

    this.isImgFEBSGActive = true;
    this.isImgFEBSActive = false;

    this.isImgHBGActive = true;
    this.isImgHBActive = false;

    this.isImgHBSGActive = true;
    this.isImgHBSActive = false;

    this.isImgHBCGActive = true;
    this.isImgHBCActive = false;

    this.isImgHRBIGActive = true;
    this.isImgHRBIActive = false;

    this.isImgHRBISGActive = true;
    this.isImgHRBISActive = false;

    this.isImgHRBICGActive = true;
    this.isImgHRBICActive = false;

    this.isImgHRBFGActive = true;
    this.isImgHRBFActive = false;

    this.isImgHRBFSGActive = true;
    this.isImgHRBFSActive = false;

    this.isImgHRBFCGActive = true;
    this.isImgHRBFCActive = false;

    this.isImgMFIBDGActive = true;
    this.isImgMFIBDActive = false;

    this.isImgMFIBDTGActive = true;
    this.isImgMFIBDTActive = false;

    this.isImgMFIBTGActive = true;
    this.isImgMFIBTActive = false;

    this.isImgPPDBGActive = true;
    this.isImgPPDBActive = false;

    this.isImgPPDBSGActive = true;
    this.isImgPPDBSActive = false;

    this.isImgSUHRBGActive = true;
    this.isImgSUHRBActive = false;

    this.isImgSUHRBSGActive = true;
    this.isImgSUHRBSActive = false;

    this.isImgSUHRBCGActive = true;
    this.isImgSUHRBCActive = false;

    this.isImgTPDASBGActive = true;
    this.isImgTPDASBActive = false;

    this.isImgTPDASBSGActive = true;
    this.isImgTPDASBSActive = false;

    this.isImgTPDBGActive = true;
    this.isImgTPDBActive = false;

    this.isImgTPDBSGActive = true;
    this.isImgTPDBSActive = false;

    this.isImgWPBGActive = true;
    this.isImgWPBActive = false;

    this.isImgWPBSGActive = true;
    this.isImgWPBSActive = false;

    this.isImgSHCBFActive = false;
    this.isImgSHCBFGActive = true;

    this.isImgSHCBFSActive = false;
    this.isImgSHCBFSGActive = true;

    this.isImgSHCBFCActive = false;
    this.isImgSHCBFCGActive = true;

    for (var i in this.abmForm.value) {
      this.abmForm.get(i).get('sumAssured').setValue(0);
      this.abmForm.get(i).get('sumAssured').disable();
    }
    for (var i in this.abcForm.value) {
      this.abcForm.get(i).get('sumAssured').setValue(0);
      this.abcForm.get(i).get('sumAssured').disable();
    }
    for (var i in this.absForm.value) {
      this.absForm.get(i).get('sumAssured').setValue(0);
      this.absForm.get(i).get('sumAssured').disable();
    }

    this.activeSp = "2";
    this.activeCh = "2";

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");


  }



  loadDefaultBSAChange() {

    this.abmForm.reset();
    this.absForm.reset();
    this.abcForm.reset();

    this.isImgBSAGActive = true;
    this.isImgBSAActive = false;

    this.isImgBSASGActive = true;
    this.isImgBSASActive = false;

    this.isImgADBGActive = true;
    this.isImgADBActive = false;

    this.isImgADBSGActive = true;
    this.isImgADBSActive = false;

    this.isImgATPBGActive = true;
    this.isImgATPBActive = false;

    this.isImgCIBGActive = true;
    this.isImgCIBActive = false;

    this.isImgCIBSGActive = true;
    this.isImgCIBSActive = false;

    this.isImgCIBCGActive = true;
    this.isImgCIBCActive = false;

    this.isImgFEBGActive = true;
    this.isImgFEBActive = false;

    this.isImgFEBSGActive = true;
    this.isImgFEBSActive = false;

    this.isImgHBGActive = true;
    this.isImgHBActive = false;

    this.isImgHBSGActive = true;
    this.isImgHBSActive = false;

    this.isImgHBCGActive = true;
    this.isImgHBCActive = false;

    this.isImgHRBIGActive = true;
    this.isImgHRBIActive = false;

    this.isImgHRBISGActive = true;
    this.isImgHRBISActive = false;

    this.isImgHRBICGActive = true;
    this.isImgHRBICActive = false;

    this.isImgHRBFGActive = true;
    this.isImgHRBFActive = false;

    this.isImgHRBFSGActive = true;
    this.isImgHRBFSActive = false;

    this.isImgHRBFCGActive = true;
    this.isImgHRBFCActive = false;

    this.isImgMFIBDGActive = true;
    this.isImgMFIBDActive = false;

    this.isImgMFIBDTGActive = true;
    this.isImgMFIBDTActive = false;

    this.isImgMFIBTGActive = true;
    this.isImgMFIBTActive = false;

    this.isImgPPDBGActive = true;
    this.isImgPPDBActive = false;

    this.isImgPPDBSGActive = true;
    this.isImgPPDBSActive = false;

    this.isImgSUHRBGActive = true;
    this.isImgSUHRBActive = false;

    this.isImgSUHRBSGActive = true;
    this.isImgSUHRBSActive = false;

    this.isImgSUHRBCGActive = true;
    this.isImgSUHRBCActive = false;

    this.isImgSHCBFActive = false;
    this.isImgSHCBFGActive = true;

    this.isImgSHCBFSActive = false;
    this.isImgSHCBFSGActive = true;

    this.isImgSHCBFCActive = false;
    this.isImgSHCBFCGActive = true;

    this.isImgTPDASBGActive = true;
    this.isImgTPDASBActive = false;

    this.isImgTPDASBSGActive = true;
    this.isImgTPDASBSActive = false;

    this.isImgTPDBGActive = true;
    this.isImgTPDBActive = false;

    this.isImgTPDBSGActive = true;
    this.isImgTPDBSActive = false;

    this.isImgWPBGActive = true;
    this.isImgWPBActive = false;

    this.isImgWPBSGActive = true;
    this.isImgWPBSActive = false;

    for (var i in this.abmForm.value) {
      this.abmForm.get(i).get('sumAssured').setValue(0);
      this.abmForm.get(i).get('sumAssured').disable();
      this.abmForm.get(i).get('premium').setValue(0);
    }
    for (var i in this.abcForm.value) {
      this.abcForm.get(i).get('sumAssured').setValue(0);
      this.abcForm.get(i).get('sumAssured').disable();
      this.abcForm.get(i).get('premium').setValue(0);
    }
    for (var i in this.absForm.value) {
      this.absForm.get(i).get('sumAssured').setValue(0);
      this.absForm.get(i).get('sumAssured').disable();
      this.absForm.get(i).get('premium').setValue(0);
    }


    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");


  }

  loadDefaultNew() {

    this.absForm.reset();
    this.abcForm.reset();

    this.isImgBSASGActive = true;
    this.isImgBSASActive = false;

    this.isImgADBSGActive = true;
    this.isImgADBSActive = false;

    this.isImgCIBSGActive = true;
    this.isImgCIBSActive = false;

    this.isImgCIBCGActive = true;
    this.isImgCIBCActive = false;

    this.isImgFEBSGActive = true;
    this.isImgFEBSActive = false;

    this.isImgHBSGActive = true;
    this.isImgHBSActive = false;

    this.isImgHBCGActive = true;
    this.isImgHBCActive = false;

    this.isImgHRBISGActive = true;
    this.isImgHRBISActive = false;

    this.isImgHRBICGActive = true;
    this.isImgHRBICActive = false;

    this.isImgHRBFSGActive = true;
    this.isImgHRBFSActive = false;

    this.isImgHRBFCGActive = true;
    this.isImgHRBFCActive = false;

    this.isImgPPDBSGActive = true;
    this.isImgPPDBSActive = false;

    this.isImgSUHRBSGActive = true;
    this.isImgSUHRBSActive = false;

    this.isImgSUHRBCGActive = true;
    this.isImgSUHRBCActive = false;

    this.isImgSHCBFSActive = false;
    this.isImgSHCBFSGActive = true;

    this.isImgSHCBFCActive = false;
    this.isImgSHCBFCGActive = true;

    this.isImgTPDASBSGActive = true;
    this.isImgTPDASBSActive = false;

    this.isImgTPDBSGActive = true;
    this.isImgTPDBSActive = false;

    this.isImgWPBSGActive = true;
    this.isImgWPBSActive = false;

    for (var i in this.abcForm.value) {
      this.abcForm.get(i).get('sumAssured').setValue(0);
      this.abcForm.get(i).get('sumAssured').disable();
      this.abcForm.get(i).get('premium').setValue(0);
    }
    for (var i in this.absForm.value) {
      this.absForm.get(i).get('sumAssured').setValue(0);
      this.absForm.get(i).get('sumAssured').disable();
      this.absForm.get(i).get('premium').setValue(0);
    }


    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");


  }


  removeError(e) {
    switch (e) {
      case "ATPB":
        this.validateATPB = 1;
        break;
      case "ADB":
        this.validateADB = 1;
        break;
      case "TPDASB":
        this.validateTPDASB = 1;
        break;
      case "TPDB":
        this.validateTPDB = 1;
        break;
      case "PPDB":
        this.validatePPDB = 1;
        break;
      case "CIB":
        this.validateCIB = 1;
        break;
      case "FEB":
        this.validateFEB = 1;
        break;
      case "MFIBD":
        this.validateMFIBD = 1;
        break;
      case "MFIBT":
        this.validateMFIBT = 1;
        break;
      case "MFIBDT":
        this.validateMFIBDT = 1;
        break;
      case "HRBI":
        this.validateHRBI = 1;
        break;
      case "HRBF":
        this.validateHRBF = 1;
        break;
      case "SUHRB":
        this.validateSUHRB = 1;
        break;
      case "HB":
        this.validateHB = 1;
        break;
      case "WPB":
        this.validateWPB = 1;
        break;
      case "BSAS":
        this.validateSCB = 1;
        break;
      case "ADBS":
        this.validateADBS = 1;
        break;
      case "TPDASBS":
        this.validateTPDASBS = 1;
        break;
      case "TPDBS":
        this.validateTPDBS = 1;
        break;
      case "PPDBS":
        this.validatePPDBS = 1;
        break;
      case "CIBS":
        this.validateSCIB = 1;
        break;
      case "FEBS":
        this.validateFEBS = 1;
        break;
      case "HRBIS":
        this.validateHRBIS = 1;
        break;
      case "HRBFS":
        this.validateHRBFS = 1;
        break;
      case "SUHRBS":
        this.validateSUHRBS = 1;
        break;
      case "SHCBFS":
        this.validateSHCBFS = 1;
        break;
      case "HBS":
        this.validateHBS = 1;
        break;
      case "WPBS":
        this.validateWPBS = 1;
        break;
      case "CIBC":
        this.validateCIBC = 1;
        break;
      case "HCBC":
        break;
      case "HRBIC":
        this.validateHRBIC = 1;
        break;
      case "HRBFC":
        this.validateHRBFC = 1;
        break;
      case "SUHRBC":
        this.validateSUHRBC = 1;
        break;
      case "SHCBFC":
        break;
      case "HBC":
        this.validateHBC = 1;
        break;

      default:
        break;
    }
  }

}
