import { ViewQuotationService } from './../../service/view-quo/view-quotation.service';
import { personalInfo } from './../../model/personalInfo';
import { ArpAdditionalBenefComponent } from './arp-additional-benef/arp-additional-benef.component';
import { ArpPersonalInfoComponent } from './arp-personal-info/arp-personal-info.component';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';
import { QuotationCalculation, RiderDetails } from './../../model/quoCal';
import swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Benifict } from '../../model/benificts';
import { SummeryInfo } from '../../model/summeryInfo';
import { FormGroup } from '@angular/forms';
import { InvpSaveQuotation } from '../../model/invpSaveQuotation';
import { Router, ActivatedRoute } from '@angular/router';
import { Console } from '@angular/core/src/console';
import { MainLife } from '../../model/mainlife';
import { Spouse } from '../../model/spouse';
import { Children } from '../../model/childeren';
import { Plan } from '../../model/plan';
import { QuoBenf } from '../../model/quotationView';
import { LoginService } from '../../service/login.service';
import { DashboardService } from '../../service/dashboard/dashboard.service';

@Component({
  selector: 'app-quo-arp',
  templateUrl: './quo-arp.component.html',
  styleUrls: ['./quo-arp.component.css']
})
export class QuoArpComponent implements OnInit {

  @ViewChild(ArpPersonalInfoComponent) arpPersonolInfoComponent: ArpPersonalInfoComponent;
  @ViewChild(ArpAdditionalBenefComponent) arpBenefictInfoComponent: ArpAdditionalBenefComponent;

  qdId: number;
  isEditUI: boolean = false;
  _mainLife = new MainLife(); //For Mainlife tab
  _spouse = new Spouse;// For Spouse Tab
  _childrens = new Array<Children>(); // For Child Tab
  _children = new Children();
  _plan = new Plan();

  riderDetails = new RiderDetails();
  _quotationCalculation = new QuotationCalculation();
  _invpSaveQuotation = new InvpSaveQuotation();
  benifictList = new Array();
  _mainLifeBenefits = new Array<QuoBenf>();
  _spouseBenefits = new Array<QuoBenf>();
  _childrenBenefits = new Array<QuoBenf>();
  _childBenef = new Array<QuoBenf>();

  _mainLifeBenefForm: FormGroup;
  _spouseBenefForm: FormGroup;
  _childrenBenefForm: FormGroup;

  previousSumMain = 0;
  previousSumSpouse = 0;

  activeSp = "2";
  activeCh = "2";

  sumAtRiskMain = 0;
  sumAtRiskSpouse = 0;

  isGetHealthBenef = false;
  isGetHcbf = false;
  isGetHcbi = false;
  isGetShcbf = false;
  isGetShcbi = false;

  isImgATPBGActive = true;
  isImgATPBActive = false;

  isImgBSAGActive = true;
  isImgBSAActive = false;

  isImgBSASGActive = true;
  isImgBSASActive = false;

  isImgADBGActive = true;
  isImgADBActive = false;

  isImgADBSGActive = true;
  isImgADBSActive = false;

  isImgCIBGActive = true;
  isImgCIBActive = false;

  isImgCIBSGActive = true;
  isImgCIBSActive = false;

  isImgCIBCGActive = true;
  isImgCIBCActive = false;

  isImgFEBGActive = true;
  isImgFEBActive = false;

  isImgFEBSGActive = true;
  isImgFEBSActive = false;

  isImgHBGActive = true;
  isImgHBActive = false;

  isImgHBSGActive = true;
  isImgHBSActive = false;

  isImgHBCGActive = true;
  isImgHBCActive = false;

  isImgHRBIGActive = true;
  isImgHRBIActive = false;

  isImgHRBFGActive = true;
  isImgHRBFActive = false;

  isImgHRBISGActive = true;
  isImgHRBISActive = false;

  isImgHRBFSGActive = true;
  isImgHRBFSActive = false;

  isImgHRBICGActive = true;
  isImgHRBICActive = false;

  isImgHRBFCGActive = true;
  isImgHRBFCActive = false;

  isImgMFIBDGActive = true;
  isImgMFIBDActive = false;

  isImgMFIBDTGActive = true;
  isImgMFIBDTActive = false;

  isImgMFIBTGActive = true;
  isImgMFIBTActive = false;

  isImgPPDBGActive = true;
  isImgPPDBActive = false;

  isImgPPDBSGActive = true;
  isImgPPDBSActive = false;

  isImgSUHRBGActive = true;
  isImgSUHRBActive = false;

  isImgSUHRBSGActive = true;
  isImgSUHRBSActive = false;

  isImgSUHRBCGActive = true;
  isImgSUHRBCActive = false;

  isImgTPDASBGActive = true;
  isImgTPDASBActive = false;

  isImgTPDASBSGActive = true;
  isImgTPDASBSActive = false;

  isImgTPDBGActive = true;
  isImgTPDBActive = false;

  isImgTPDBSGActive = true;
  isImgTPDBSActive = false;

  isImgWPBGActive = true;
  isImgWPBActive = false;

  isImgWPBSGActive = true;
  isImgWPBSActive = false;

  isImgSHCBFGActive = true;
  isImgSHCBFActive = false;

  isImgSHCBFCGActive = true;
  isImgSHCBFCActive = false;

  isImgSHCBFSGActive = false;
  isImgSHCBFSActive = true;

  personalInfo: personalInfo = new personalInfo(this._mainLife, this._spouse, this._childrens, this._plan);
  benif: FormGroup;

  payType = "None";
  payTerm = 0;
  summeryInfo = new SummeryInfo;

  validity: any = false;

  isDisableDiv = false;


  constructor(private saveArpQuotationService: QuoArpService, private router: Router, private route: ActivatedRoute, private loginService: LoginService,
    private dashboardService: DashboardService,private viewQuotationService: ViewQuotationService) {
    if (!sessionStorage.getItem("Token")) {
      this.loginService.navigateLigin();
    }

    this.route.params.subscribe(params => {
      this.qdId = params.id;
    }, error => { swal("Error", "Error code - 210 <br>", "error") });

    this._plan._bsa = 250000;
    this._plan._frequance = "Monthly";
    this._plan._payingterm = "5";
    this._plan._term = 10;
    this.personalInfo._mainlife._mAge = 18;
    this.personalInfo._mainlife._mTitle = "MR";
    this.personalInfo._mainlife._mGender = "M";
    this.personalInfo._spouse._sGender = "F";
    this.personalInfo._mainlife._mSmoking = "No";
    this.personalInfo._mainlife._mCivilStatus = "S";
    this.personalInfo._spouse._sOccupation = "285";
    this._children._cTitle = "M";
  }

  ngOnInit() {
    if (this.qdId != undefined) {
      this.isEditUI = true;
      this.editCal();
    }
  }


  setValidity(validity: any) {
    this.validity = validity;
  }

  onSet(type: personalInfo) {
    this.personalInfo = type;

    this.payType = this.personalInfo._plan._frequance;

    if (type._plan._term != null || type._plan._term != undefined) {
      this.payTerm = type._plan._term;
    } else {
      this.personalInfo._plan._term = 0;
    }

    this.summeryInfo._summery._payType = this.personalInfo._plan._frequance;
    this.summeryInfo._summery._term = this.personalInfo._plan._term;
  }

  onsetBenifAll(allForm) {
    this._mainLifeBenefForm = allForm.abmForm;
    this._spouseBenefForm = allForm.absForm;
    this._childrenBenefForm = allForm.abcForm;

    this.benif = this._mainLifeBenefForm;
    this.riderDetails._mRiders = new Array();
    for (var i in this._mainLifeBenefForm.value) {
      let benifict = this._mainLifeBenefForm.value[i];
      if (benifict.isActice == true) {
        if (benifict.sumAssured) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._mRiders.push(benifict1);
        }
      }
    }
    this._quotationCalculation._riderDetails = this.riderDetails;

    this.benif = this._spouseBenefForm;
    this.riderDetails._sRiders = new Array();
    for (var i in this._spouseBenefForm.value) {

      let benifict = this._spouseBenefForm.value[i];
      if (benifict.isActice == true) {
        console.log(benifict.sumAssured);
        if ((i == 'HRBFS') && (benifict.sumAssured == undefined)) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;

          this.riderDetails._sRiders.push(benifict1);
        }
        if ((i == 'WPBS') && (benifict.sumAssured == undefined)) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;

          this.riderDetails._sRiders.push(benifict1);
        }

        if (benifict.sumAssured != undefined) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._sRiders.push(benifict1);
        }
      }
    }
    this._quotationCalculation._riderDetails = this.riderDetails;

    this.benif = this._childrenBenefForm;
    this.riderDetails._cRiders = new Array();
    for (var i in this._childrenBenefForm.value) {
      let benifict = this._childrenBenefForm.value[i];
      if (benifict.isActice == true) {
        if ((i == 'HRBFC') && (benifict.sumAssured == undefined)) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;

          this.riderDetails._cRiders.push(benifict1);
        }

        if (benifict.sumAssured != undefined) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._cRiders.push(benifict1);
        }
      }
    }
    this._quotationCalculation._riderDetails = this.riderDetails;
    this.sendQuo();
  }

  onsetBenifMainlife(benif) {
    this.benif = benif;
    this.riderDetails._mRiders = new Array();
    for (var i in benif.value) {
      let benifict = benif.value[i];
      if (benifict.isActice == true) {
        if (benifict.sumAssured) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._mRiders.push(benifict1);
        }
      }
    }
    this._quotationCalculation._riderDetails = this.riderDetails;
    this.sendQuo();
  }

  onsetBenifSpouse(benif) {
    this.benif = benif;
    this.riderDetails._sRiders = new Array();
    for (var i in benif.value) {
      let benifict = benif.value[i];
      if (benifict.isActice == true) {
        if (benifict.sumAssured) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._sRiders.push(benifict1);
        }
      }
    }
    this._quotationCalculation._riderDetails = this.riderDetails;
    this.sendQuo();
  }
  onsetBenifChildren(benif) {
    this.benif = benif;
    this.riderDetails._cRiders = new Array();
    for (var i in benif.value) {
      let benifict = benif.value[i];
      if (benifict.isActice == true) {
        if (benifict.sumAssured) {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._cRiders.push(benifict1);
        }
      }
    }
    this._quotationCalculation._riderDetails = this.riderDetails;
    this.sendQuo();
  }

  onSetCalObj(e: any) {
    this._quotationCalculation._personalInfo = e;
    if (this._quotationCalculation._personalInfo.childrens != null) {
      //this._childrens = this._quotationCalculation._personalInfo.childrens;
      for (let i in this._quotationCalculation._personalInfo.childrens) {
        let child: Children = this._quotationCalculation._personalInfo.childrens[i];
        for (let j in this._quotationCalculation._riderDetails._cRiders) {
          console.log(j);
          switch (this._quotationCalculation._riderDetails._cRiders[j].type) {
            case "HRBIC":
              child._cHrbic = true;
              break;
            case "HRBFC":
              child._cHrbfc = true;
              break;
            case "SUHRBC":
              child._cSuhrbc = true;
              break;
            case "SHCBFC":
              child._cShcbfc = true;
              break;
            case "CIBC":
              if (child._cAge >= 3) {
                child._cCibc = true;
              }
              break;
            case "HBC":
              child._cHbc = true;
              break;

            default:
              break;
          }
        }
        this._quotationCalculation._personalInfo.childrens[i] = child;
      }
      this._childrens = this._quotationCalculation._personalInfo.childrens;

    }
    console.log(this._childrens);
    this.sendQuo();

  }

  onSetSpActive(e: any) {
    this.activeSp = e;
  }
  onSetChActive(e: any) {
    this.activeCh = e;
  }

  onsetBenifMainlifeForm(form) {
    this._mainLifeBenefForm = form;
  }

  onsetBenifSpouseForm(form) {
    this._spouseBenefForm = form;
  }

  onsetBenifChildrenForm(form) {
    this._childrenBenefForm = form;
  }

  mPreviousSumAtRisk(risk: number) {
    console.log(risk);
    if (risk) {
      this.sumAtRiskMain = risk;
    }
  }

  sPreviousSumAtRisk(risk: number) {
    if (risk) {
      this.sumAtRiskSpouse = risk;
    }
  }

  sendQuo() {

    if (this._quotationCalculation._personalInfo.bsa < 250000 || Number.isNaN(this._quotationCalculation._personalInfo.bsa)) {
      swal("Error", "BSA must be grater than or equal to 250000", "error");
      return;
    }

    if (this._plan._term > 30 || this._plan._term < 5 || Number.isNaN(this._plan._term)) {
      swal("Error", "Policy Term must be grater than 5 and less than 30", "error");
      return;
    }

    if (this._plan._payingterm != "S") {
      if ((this._plan._term - parseInt(this._plan._payingterm)) < 5) {
        swal("Error", "Policy Term must be grater than Paying Term", "error");
        return;
      }
    }

    if (this.personalInfo._mainlife._mAge < 61 && this.personalInfo._mainlife._mAge > 17) {
      if (this.activeSp == "1") {
        if (this.personalInfo._spouse._sAge < 61 && this.personalInfo._spouse._sAge > 17) {

        } else {
          swal("Oopz..", "Spouse age must be greater than or equal 18 and less than or equal 60..", "error");
          return;
        }
      }
    } else {
      swal("Oopz..", "Main Life age must be greater than or equal 18 and less than or equal 60..", "error");
      return;
    }

    console.log(this._quotationCalculation._personalInfo);

    if (this._quotationCalculation._personalInfo != null) {

      console.log(this._quotationCalculation._personalInfo);

      document.onkeydown = function (e) { return false; }
      this._quotationCalculation._personalInfo.sPreviousSumAtRisk = this.previousSumSpouse;
      this._quotationCalculation._personalInfo.mPreviousSumAtRisk = this.previousSumMain;

      this.isDisableDiv = true;
      this.saveArpQuotationService.getQouCal(this._quotationCalculation).subscribe(response => {
        console.log(response.json());
        document.onkeydown = function (e) { return true; }

        this.isDisableDiv = false;
        if (response.json().errorExist == true) {
          swal("Error!", "Error exist in " + response.json().error, "error");
        }
        this.summeryInfo._summery.healthBenMain = response.json().mainLifeHealthReq;
        this.summeryInfo._summery.healthBenSpouse = response.json().spouseHealthReq;
        this.summeryInfo._summery.surrenderValHelpers = response.json().surrenderValHelpers;
        this.summeryInfo._summery.sumAssured = response.json().basicSumAssured;
        this.summeryInfo._summery.oc = response.json().extraOE.toLocaleString();
        this.summeryInfo._summery.withoutLoadingTot = response.json().withoutLoadingTot.toLocaleString();
        this.summeryInfo._summery.occuLodingTot = response.json().occuLodingTot.toLocaleString();
        this.summeryInfo._summery.totPremium = response.json().totPremium.toLocaleString();
        this.summeryInfo._summery.at6 = response.json().at6.toLocaleString();
        this.summeryInfo._summery.at8 = response.json().at8.toLocaleString();
        this.summeryInfo._summery.at10 = response.json().at10.toLocaleString();
        this.summeryInfo._disablities.PPDB = response.json().ppdb;
        this.summeryInfo._disablities.PPDBTerm = response.json().ppdbTerm;
        this.summeryInfo._disablities.PPDBS = response.json().ppdbs;
        this.summeryInfo._disablities.PPDBSTerm = response.json().ppdbsTerm;
        this.summeryInfo._disablities.TPDASB = response.json().tpdasb;
        this.summeryInfo._disablities.TPDASBTerm = response.json().tpdasbTerm;
        this.summeryInfo._disablities.TPDASBS = response.json().tpdasbs;
        this.summeryInfo._disablities.TPDASBSTerm = response.json().tpdasbsTerm;
        this.summeryInfo._disablities.TPDB = response.json().tpdb;
        this.summeryInfo._disablities.TPDBTerm = response.json().tpdbTerm;
        this.summeryInfo._disablities.TPDBS = response.json().tpdbs;
        this.summeryInfo._disablities.TPDBSTerm = response.json().tpdbsTerm;
        this.summeryInfo._health.CIB = response.json().cib;
        this.summeryInfo._health.CIBTerm = response.json().cibTerm;
        this.summeryInfo._health.CIBC = response.json().cibc;
        this.summeryInfo._health.CIBCTerm = response.json().cibcTerm;
        this.summeryInfo._health.HB = response.json().hb;
        this.summeryInfo._health.HBTerm = response.json().hbTerm;
        this.summeryInfo._health.HBC = response.json().hbc;
        this.summeryInfo._health.HBCTerm = response.json().hbcTerm;
        this.summeryInfo._health.HBS = response.json().hbs;
        this.summeryInfo._health.HBSTerm = response.json().hbsTerm;
        this.summeryInfo._health.HRBI = response.json().hrbi;
        this.summeryInfo._health.HRBITerm = response.json().hrbiTerm;
        this.summeryInfo._health.HRBIC = response.json().hrbic;
        this.summeryInfo._health.HRBICTerm = response.json().hrbicTerm;
        this.summeryInfo._health.HRBIS = response.json().hrbis;
        this.summeryInfo._health.HRBISTerm = response.json().hrbisTerm;
        this.summeryInfo._health.HRBF = response.json().hrbf;
        this.summeryInfo._health.HRBFTerm = response.json().hrbfTerm;
        this.summeryInfo._health.HRBFC = response.json().hrbfc;
        this.summeryInfo._health.HRBFCTerm = response.json().hrbfcTerm;
        this.summeryInfo._health.HRBFS = response.json().hrbfs;
        this.summeryInfo._health.HRBFSTerm = response.json().hrbfsTerm;
        this.summeryInfo._health.SCIB = response.json().cibs;
        this.summeryInfo._health.SCIBTerm = response.json().cibsTerm;
        this.summeryInfo._health.SUHRB = response.json().suhrb;
        this.summeryInfo._health.SUHRBTerm = response.json().suhrbTerm;
        this.summeryInfo._health.SUHRBS = response.json().suhrbs;
        this.summeryInfo._health.SUHRBSTerm = response.json().suhrbsTerm;
        this.summeryInfo._health.SUHRBC = response.json().suhrbc;
        this.summeryInfo._health.SUHRBCTerm = response.json().suhrbcTerm;
        this.summeryInfo._health.SHCBF = response.json().shcbf;
        this.summeryInfo._health.SHCBFTerm = response.json().shcbfTerm;
        this.summeryInfo._health.SHCBFC = response.json().shcbfc;
        this.summeryInfo._health.SHCBFCTerm = response.json().shcbfcTerm;
        this.summeryInfo._health.SHCBFS = response.json().shcbfs;
        this.summeryInfo._health.SHCBFSTerm = response.json().shcbfsTerm;
        this.summeryInfo._protection.ADB = response.json().adb;
        this.summeryInfo._protection.ADBTerm = response.json().adbTerm;
        this.summeryInfo._protection.ADBS = response.json().adbs;
        this.summeryInfo._protection.ADBSTerm = response.json().adbsTerm;
        this.summeryInfo._protection.ATPB = response.json().atpb;
        this.summeryInfo._protection.ATPBTerm = response.json().atpbTerm;
        this.summeryInfo._protection.FEB = response.json().feb;
        this.summeryInfo._protection.FEBTerm = response.json().febTerm;
        this.summeryInfo._protection.FEBS = response.json().febs;
        this.summeryInfo._protection.FEBSTerm = response.json().febsTerm;
        this.summeryInfo._protection.MFIBD = response.json().mifdb;
        this.summeryInfo._protection.MFIBDTerm = response.json().mifdbTerm;
        this.summeryInfo._protection.MFIBDT = response.json().mifdbt;
        this.summeryInfo._protection.MFIBDTTerm = response.json().mifdbtTerm;
        this.summeryInfo._protection.MFIBT = response.json().mifdt;
        this.summeryInfo._protection.MFIBTTerm = response.json().mifdtTerm;
        this.summeryInfo._protection.WPB = response.json().wpb;
        this.summeryInfo._protection.WPBTerm = response.json().wpbTerm;
        this.summeryInfo._protection.WPBS = response.json().wpbs;
        this.summeryInfo._protection.WPBSTerm = response.json().wpbsTerm;
        this.summeryInfo._protection.BSAS = response.json().bsas;
        this.summeryInfo._protection.BSASTerm = response.json().bsasTerm;

      }, error => {
        swal("Error", "Error code - 211 <br>", "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });

    }
  }

  save(e: any) {

    console.log(this._quotationCalculation);

    if (this._quotationCalculation._personalInfo.bsa < 250000 || Number.isNaN(this._quotationCalculation._personalInfo.bsa)) {
      swal("Error", "BSA must be grater than or equal to 250000", "error");
      return;
    }

    if (this._plan._term > 30 || this._plan._term < 5 || Number.isNaN(this._plan._term)) {
      swal("Error", "Policy Term must be grater than 5 and less than 30", "error");
      return;
    }

    if (this._plan._payingterm != "S") {
      if ((this._plan._term - parseInt(this._plan._payingterm)) < 5) {
        swal("Error", "Policy Term must be grater than Paying Term", "error");
        return;
      }
    }

    /*let spArr = new Map<string, string>();
    let chArr = new Map<string, string>();

    for (var j in this.riderDetails._sRiders) {
      spArr.set(this.riderDetails._sRiders[j].type, j);
    }

    for (var k in this.riderDetails._cRiders) {
      chArr.set(this.riderDetails._cRiders[k].type, k);
    }

    for (var i in this.riderDetails._mRiders) {
      console.log(this.riderDetails._mRiders[i]);

      if (this.riderDetails._mRiders[i].type == "HRBI") {
        if (this.activeSp == "1") {
          if (!spArr.has("HRBIS")) {
            swal("Check Spouse Benefits Form Again", "HCBIS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("HRBIC")) {
            swal("Check Childern Benefits Form Again", "HCBIC Required..", "error");
            return;
          }
        }

      }

      if (this.riderDetails._mRiders[i].type == "HRBF") {
        if (this.activeSp == "1") {
          if (!spArr.has("HRBFS")) {
            swal("Check Spouse Benefits Form Again", "HCBFS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("HRBFC")) {
            swal("Check Childern Benefits Form Again", "HCBFC Required..", "error");
            return;
          }
        }
      }

      if (this.riderDetails._mRiders[i].type == "SUHRB") {

        if (this.activeSp == "1") {
          if (!spArr.has("SUHRBS")) {
            swal("Check Spouse Benefits Form Again", "SHCBIS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("SUHRBC")) {
            swal("Check Childern Benefits Form Again", "SHCBIC Required..", "error");
            return;
          }
        }
      }

      if (this.riderDetails._mRiders[i].type == "HB") {

        if (this.activeSp == "1") {
          if (!spArr.has("HBS")) {
            swal("Check Spouse Benefits Form Again", "HBS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("HBC")) {
            swal("Check Childern Benefits Form Again", "HBC Required..", "error");
            return;
          }
        }

      }
    }*/


    if (this.validity == true) {
      if (this.personalInfo._mainlife._mOccupation != "285") {
        if (this.personalInfo._mainlife._mAge < 61 && this.personalInfo._mainlife._mAge > 17) {
          if (this.activeSp == "1") {
            if (this.personalInfo._spouse._sOccupation != "285") {
              if (this.personalInfo._spouse._sAge < 61 && this.personalInfo._spouse._sAge > 17) {
                this._invpSaveQuotation._personalInfo = this.personalInfo;
                this._invpSaveQuotation._riderDetails = this.riderDetails;
                this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
                console.log(this._invpSaveQuotation);

                this.isDisableDiv = true;
                document.onkeydown = function (e) { return false; }
                this.saveArpQuotationService.saveArp(this._invpSaveQuotation).subscribe(response => {
                  this.isDisableDiv = false;
                  document.onkeydown = function (e) { return true; }
                  if (response.json().status == "Success") {
                    swal("Success", "Quotation has been saved Successfully <br> Quotation No : " + response.json().code, "success");
                    this.router.navigate(['/loadQuo']);
                  }
                  else {
                    swal("Oopz...", response.json().status, "error");

                  }
                }, error => {
                  swal("Error", "Error code - 212 <br>", "error");
                  document.onkeydown = function (e) { return true; }
                  this.isDisableDiv = false;
                });
              } else {
                swal("Oopz..", "Spouse age must be greater than or equal 18 and less than or equal 60..", "error");
              }
            } else {
              swal("Oopz..", "Please select an occupation for spouse..", "error");
            }

          } else {
            this._invpSaveQuotation._personalInfo = this.personalInfo;
            this._invpSaveQuotation._riderDetails = this.riderDetails;
            this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
            console.log(this._invpSaveQuotation);

            this.isDisableDiv = true;
            document.onkeydown = function (e) { return false; }
            this.saveArpQuotationService.saveArp(this._invpSaveQuotation).subscribe(response => {
              this.isDisableDiv = false;
              document.onkeydown = function (e) { return true; }
              if (response.json().status == "Success") {
                swal("Success", "Quotation has been saved Successfully <br> Quotation No : " + response.json().code, "success");
                this.router.navigate(['/loadQuo']);
              }
              else {
                swal("Oopz...", response.json().status, "error");

              }
            }, error => {
              swal("Error", "Error code - 212 <br>", "error");
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
            });
          }
        } else {
          swal("Oopz..", "Main Life age must be greater than or equal 18 and less than or equal 60..", "error");
        }
      } else {
        swal("Oopz..", "Please select an occupation for main life..", "error");
      }
    } else {
      swal("Check Form Again", "Fill all Required fields...", "error")
        .then((value) => {
          document.getElementById(this.validity).classList.add("errors");
          document.getElementById(this.validity).focus();
        });
    }

  }

  edit(e: any) {

    if (this._quotationCalculation._personalInfo.bsa < 250000 || Number.isNaN(this._quotationCalculation._personalInfo.bsa)) {
      swal("Error", "BSA must be grater than or equal to 250000", "error");
      return;
    }

    if (this._plan._term > 30 || this._plan._term < 5 || Number.isNaN(this._plan._term)) {
      swal("Error", "Policy Term must be grater than 5 and less than 30", "error");
      return;
    }

    if (this._plan._payingterm != "S") {
      if ((this._plan._term - parseInt(this._plan._payingterm)) < 5) {
        swal("Error", "Policy Term must be grater than Paying Term", "error");
        return;
      }
    }

    /*let spArr = new Map<string, string>();
    let chArr = new Map<string, string>();

    for (var j in this.riderDetails._sRiders) {
      spArr.set(this.riderDetails._sRiders[j].type, j);
    }

    for (var k in this.riderDetails._cRiders) {
      chArr.set(this.riderDetails._cRiders[k].type, k);
    }

    for (var i in this.riderDetails._mRiders) {
      console.log(this.riderDetails._mRiders[i]);

      if (this.riderDetails._mRiders[i].type == "HRBI") {
        if (this.activeSp == "1") {
          if (!spArr.has("HRBIS")) {
            swal("Check Spouse Benefits Form Again", "HCBIS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("HRBIC")) {
            swal("Check Childern Benefits Form Again", "HCBIC Required..", "error");
            return;
          }
        }

      }

      if (this.riderDetails._mRiders[i].type == "HRBF") {
        if (this.activeSp == "1") {
          if (!spArr.has("HRBFS")) {
            swal("Check Spouse Benefits Form Again", "HCBFS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("HRBFC")) {
            swal("Check Childern Benefits Form Again", "HCBFC Required..", "error");
            return;
          }
        }
      }

      if (this.riderDetails._mRiders[i].type == "SUHRB") {

        if (this.activeSp == "1") {
          if (!spArr.has("SUHRBS")) {
            swal("Check Spouse Benefits Form Again", "SHCBIS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("SUHRBC")) {
            swal("Check Childern Benefits Form Again", "SHCBIC Required..", "error");
            return;
          }
        }
      }

      if (this.riderDetails._mRiders[i].type == "HB") {

        if (this.activeSp == "1") {
          if (!spArr.has("HBS")) {
            swal("Check Spouse Benefits Form Again", "HBS Required..", "error");
            return;
          }
        }
        if (this.activeCh == "1") {
          if (!chArr.has("HBC")) {
            swal("Check Childern Benefits Form Again", "HBC Required..", "error");
            return;
          }
        }

      }
    }*/

    if (this.validity == true) {
      if (this.activeSp == "2") {
        this.riderDetails._sRiders = null;
      }
      if (this.activeCh == "2") {
        this.riderDetails._cRiders = null;
      }

      for (var c in this.personalInfo._childrenList) {
        this._children = this.personalInfo._childrenList[c];
        if (this._children._cTitle == "Son") {
          this._children._cTitle = "M";
        }
        if (this._children._cTitle == "Daughter") {
          this._children._cTitle = "F";
        }
      }

      if (this.personalInfo._mainlife._mOccupation != "285") {
        if (this.personalInfo._mainlife._mAge < 61 && this.personalInfo._mainlife._mAge > 17) {
          if (this.activeSp == "1") {
            if (this.personalInfo._spouse._sOccupation != "285") {
              if (this.personalInfo._spouse._sAge < 61 && this.personalInfo._spouse._sAge > 17) {
                this._invpSaveQuotation._personalInfo = this.personalInfo;
                this._invpSaveQuotation._riderDetails = this.riderDetails;
                this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
                this.isDisableDiv = true;
                document.onkeydown = function (e) { return false; }
                this.saveArpQuotationService.editArp(this._invpSaveQuotation, this.qdId).subscribe(response => {
                  this.isDisableDiv = false;
                  document.onkeydown = function (e) { return true; }
                  if (response.json().status == "Success") {
                    swal("Success", "Quotation has been saved Successfully <br> Quotation No : " + response.json().code, "success");
                    if(sessionStorage.getItem("isUnderwriting") == "true"){
                      setTimeout(function (){
                        window.close();
                      }, 5000);
                    }else{
                      this.router.navigate(['/loadQuo']);
                    }
                    
                  }
                  else {
                    swal("Oopz...", response.json().status, "error");

                  }
                }, error => {
                  swal("Error", "Error code - 213 <br>", "error");
                  document.onkeydown = function (e) { return true; }
                  this.isDisableDiv = false;
                });
              } else {
                swal("Oopz..", "Spouse age must be greater than or equal 18 and less than or equal 60..", "error");
              }
            } else {
              swal("Oopz..", "Please select an occupation for spouse..", "error");
            }

          } else {
            this._invpSaveQuotation._personalInfo = this.personalInfo;
            this._invpSaveQuotation._riderDetails = this.riderDetails;
            this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
            this.isDisableDiv = true;
            document.onkeydown = function (e) { return false; }
            this.saveArpQuotationService.editArp(this._invpSaveQuotation, this.qdId).subscribe(response => {
              this.isDisableDiv = false;
              document.onkeydown = function (e) { return true; }
              if (response.json().status == "Success") {
                swal("Success", "Quotation has been saved Successfully <br> Quotation No : " + response.json().code, "success");
                if(sessionStorage.getItem("isUnderwriting") == "true"){
                  setTimeout(function (){
                    window.close();
                  }, 5000);
                }else{
                  this.router.navigate(['/loadQuo']);
                }
              }
              else {
                swal("Oopz...", response.json().status, "error");

              }
            }, error => {
              swal("Error", "Error code - 213 <br>", "error");
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
            });
          }
        } else {
          swal("Oopz..", "Main Life age must be greater than or equal 18 and less than or equal 60..", "error");
        }
      } else {
        swal("Oopz..", "Please select an occupation for main life..", "error");
      }
    } else {
      swal("Check Form Again", "Fill all Required fields...", "error")
        .then((value) => {
          document.getElementById(this.validity).classList.add("errors");
          document.getElementById(this.validity).focus();
        });
    }

  }

  editCal() {
    this.saveArpQuotationService.getArpQuotationDetailsForEdit(this.qdId).subscribe(response => {
      
      if(sessionStorage.getItem("isUnderwriting") == "true"){
        this._mainLife=JSON.parse(sessionStorage.getItem("mainlife"));
        this._spouse = JSON.parse(sessionStorage.getItem("spouse"));
        this._childrens = JSON.parse(sessionStorage.getItem("children"));

        console.log(this._mainLife);
      }else{
        this._mainLife = response.json()._mainlife;
        this._spouse = response.json()._spouse;
        this._childrens = response.json()._children;
      }

      // this._mainLife = response.json()._mainlife;
      // this._spouse = response.json()._spouse;
      // this._childrens = response.json()._children;
      console.log(this._mainLife);
      this._plan = response.json()._plan;
      

      if (this._spouse._sActive) {
        this.activeSp = "1";
        this.personalInfo._spouse = this._spouse;
      }

      if (this._childrens.length > 0) {
        this.activeCh = "1";
        this.personalInfo._childrenList = this._childrens;

      }

      this.personalInfo._mainlife = this._mainLife;
      this.personalInfo._mainlife._mAge = this._mainLife._mAge;
      this.personalInfo._plan = this._plan;

      this._mainLifeBenefits = response.json()._mainLifeBenefits;
      this._spouseBenefits = response.json()._spouseBenefits;
      this._childrenBenefits = response.json()._childrenBenefits;
      this.riderDetails._mRiders = new Array();
      this.riderDetails._sRiders = new Array();
      this.riderDetails._cRiders = new Array();

      this._quotationCalculation._personalInfo.bsa = this.personalInfo._plan._bsa;
      this._quotationCalculation._personalInfo.frequance = this.personalInfo._plan._frequance;
      this._quotationCalculation._personalInfo.term = this.personalInfo._plan._term;
      this._quotationCalculation._personalInfo.payingterm=this.personalInfo._plan._payingterm;

      this.personalInfo._mainlife._mCivilStatus = this._mainLife._mCivilStatus;

      this._quotationCalculation._personalInfo.childrens = this.personalInfo._childrenList;

      this._quotationCalculation._personalInfo.mage = this.personalInfo._mainlife._mAge;
      this._quotationCalculation._personalInfo.mgenger = this.personalInfo._mainlife._mGender;
      this._quotationCalculation._personalInfo.mocu = this.personalInfo._mainlife._mOccupation;
      this._quotationCalculation._personalInfo.sage = this.personalInfo._spouse._sAge;
      this._quotationCalculation._personalInfo.sgenger = this.personalInfo._spouse._sGender;
      this._quotationCalculation._personalInfo.socu = this.personalInfo._spouse._sOccupation;

      if (this._mainLife._mNic != null && (this._mainLife._mNic.length > 0 || this._mainLife._mNic != "")) {
        //this.end1PersonalInfoComponent.readOnlyDob();
        this.calPreviousRiskM(this._mainLife._mNic);
      }

      if (this._spouse._sActive) {
        if (this._spouse._sNic != null && (this._spouse._sNic.length > 0 || this._spouse._sNic != "")) {
          // this.end1PersonalInfoComponent.readOnlyDobS();
          this.calPreviousRiskS(this._spouse._sNic);
        }
      }


      console.log(this._mainLifeBenefForm);


      for (var q in this._mainLifeBenefits) {

        console.log(this._mainLifeBenefits[q].benfName);
        switch (this._mainLifeBenefits[q].benfName) {
          case "ATPB": {
            this.isImgATPBGActive = false;
            this.isImgATPBActive = true;
            this._mainLifeBenefForm.get("ATPB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("ATPB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("ATPB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "ATPB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);

            break;
          }
          case "ADB": {
            this.isImgADBGActive = false;
            this.isImgADBActive = true;
            this._mainLifeBenefForm.get("ADB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("ADB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("ADB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "ADB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "TPDASB": {
            this.isImgTPDASBGActive = false;
            this.isImgTPDASBActive = true;
            this._mainLifeBenefForm.get("TPDASB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("TPDASB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("TPDASB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "TPDASB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "TPDB": {
            this.isImgTPDBGActive = false;
            this.isImgTPDBActive = true;
            this._mainLifeBenefForm.get("TPDB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("TPDB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("TPDB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "TPDB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "PPDB": {
            this.isImgPPDBGActive = false;
            this.isImgPPDBActive = true;
            this._mainLifeBenefForm.get("PPDB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("PPDB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("PPDB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "PPDB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "CIB": {
            this.isImgCIBGActive = false;
            this.isImgCIBActive = true;
            this._mainLifeBenefForm.get("CIB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("CIB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("CIB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "CIB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "FEB": {
            this.isImgFEBGActive = false;
            this.isImgFEBActive = true;
            this._mainLifeBenefForm.get("FEB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("FEB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("FEB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "FEB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "MFIBD": {
            this.isImgMFIBDGActive = false;
            this.isImgMFIBDActive = true;
            this._mainLifeBenefForm.get("MFIBD").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("MFIBD").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("MFIBD").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "MFIBD";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "MFIBT": {
            this.isImgMFIBTGActive = false;
            this.isImgMFIBTActive = true;
            this._mainLifeBenefForm.get("MFIBT").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("MFIBT").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("MFIBT").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "MFIBT";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "MFIBDT": {
            this.isImgMFIBDTGActive = false;
            this.isImgMFIBDTActive = true;
            this._mainLifeBenefForm.get("MFIBDT").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("MFIBDT").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("MFIBDT").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "MFIBDT";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "SUHRB": {
            this.isImgSUHRBGActive = false;
            this.isImgSUHRBActive = true;
            this.isGetHealthBenef = true;
            this.isGetShcbi = true;
            this._mainLifeBenefForm.get("SUHRB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("SUHRB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("SUHRB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SUHRB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "SHCBI": {
            this.isImgSUHRBGActive = false;
            this.isImgSUHRBActive = true;
            this.isGetHealthBenef = true;
            this.isGetShcbi = true;
            this._mainLifeBenefForm.get("SUHRB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("SUHRB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("SUHRB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SUHRB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "SHCBF": {
            this.isImgSHCBFActive = false;
            this.isImgSHCBFActive = true;
            this.isGetHealthBenef = true;
            this.isGetShcbi = true;
            this._mainLifeBenefForm.get("SHCBF").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("SHCBF").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("SHCBF").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SHCBF";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "HRBI": {
            this.isImgHRBIGActive = false;
            this.isImgHRBIActive = true;
            this.isGetHealthBenef = true;
            this.isGetHcbi = true;
            this._mainLifeBenefForm.get("HRBI").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("HRBI").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("HRBI").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBI";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "HCBI": {
            this.isImgHRBIGActive = false;
            this.isImgHRBIActive = true;
            this.isGetHealthBenef = true;
            this.isGetHcbi = true;
            this._mainLifeBenefForm.get("HRBI").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("HRBI").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("HRBI").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBI";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }

          case "HRBF": {
            this.isImgHRBFGActive = false;
            this.isImgHRBFActive = true;
            this.isGetHealthBenef = true;
            this.isGetHcbf = true;
            this._mainLifeBenefForm.get("HRBF").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("HRBF").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("HRBF").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBF";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "HCBF": {
            this.isImgHRBFGActive = false;
            this.isImgHRBFActive = true;
            this.isGetHealthBenef = true;
            this.isGetHcbf = true;
            this._mainLifeBenefForm.get("HRBF").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("HRBF").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("HRBF").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBF";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }

          case "HB": {
            this.isImgHBGActive = false;
            this.isImgHBActive = true;
            this._mainLifeBenefForm.get("HB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("HB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("HB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          case "WPB": {
            this.isImgWPBGActive = false;
            this.isImgWPBActive = true;
            this._mainLifeBenefForm.get("WPB").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("WPB").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("WPB").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "WPB";
            benifict.premium = 0;
            benifict.sumAssured = this._mainLifeBenefits[q].riderSum;

            this.riderDetails._mRiders.push(benifict);
            break;
          }
          default: {

          }
        }

      }

      for (var q in this._spouseBenefits) {

        console.log(this._spouseBenefits[q].benfName);
        switch (this._spouseBenefits[q].benfName) {
          case "SCB": {
            this.isImgBSASGActive = false;
            this.isImgBSASActive = true;
            this._spouseBenefForm.get("BSAS").get("isActice").setValue(true);
            this._spouseBenefForm.get("BSAS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("BSAS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "BSAS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);

            break;
          }
          case "ADBS": {
            this.isImgADBSGActive = false;
            this.isImgADBSActive = true;
            this._spouseBenefForm.get("ADBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("ADBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("ADBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "ADBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "TPDASBS": {
            this.isImgTPDASBSGActive = false;
            this.isImgTPDASBSActive = true;
            this._spouseBenefForm.get("TPDASBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("TPDASBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("TPDASBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "TPDASBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "TPDBS": {
            this.isImgTPDBSGActive = false;
            this.isImgTPDBSActive = true;
            this._spouseBenefForm.get("TPDBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("TPDBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("TPDBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "TPDBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "PPDBS": {
            this.isImgPPDBSGActive = false;
            this.isImgPPDBSActive = true;
            this._spouseBenefForm.get("PPDBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("PPDBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("PPDBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "PPDBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "SCIB": {
            this.isImgCIBSGActive = false;
            this.isImgCIBSActive = true;
            this._spouseBenefForm.get("CIBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("CIBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("CIBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "CIBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "FEBS": {
            this.isImgFEBSGActive = false;
            this.isImgFEBSActive = true;
            this._spouseBenefForm.get("FEBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("FEBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("FEBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "FEBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "SUHRBS": {
            this.isImgSUHRBSGActive = false;
            this.isImgSUHRBSActive = true;
            this._spouseBenefForm.get("SUHRBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("SUHRBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("SUHRBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SUHRBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "SHCBIS": {
            this.isImgSUHRBSGActive = false;
            this.isImgSUHRBSActive = true;
            this._spouseBenefForm.get("SUHRBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("SUHRBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("SUHRBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SUHRBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }

          case "SHCBFS": {
            this.isImgSHCBFSGActive = false;
            this.isImgSHCBFSActive = true;
            this._spouseBenefForm.get("SHCBFS").get("isActice").setValue(true);
            this._spouseBenefForm.get("SHCBFS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("SHCBFS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SHCBFS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "HRBIS": {
            this.isImgHRBISGActive = false;
            this.isImgHRBISActive = true;
            this._spouseBenefForm.get("HRBIS").get("isActice").setValue(true);
            this._spouseBenefForm.get("HRBIS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("HRBIS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBIS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "HCBIS": {
            this.isImgHRBISGActive = false;
            this.isImgHRBISActive = true;
            this._spouseBenefForm.get("HRBIS").get("isActice").setValue(true);
            this._spouseBenefForm.get("HRBIS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("HRBIS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBIS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "HRBFS": {
            this.isImgHRBFSGActive = false;
            this.isImgHRBFSActive = true;
            this._spouseBenefForm.get("HRBFS").get("isActice").setValue(true);
            this._spouseBenefForm.get("HRBFS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("HRBFS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBFS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "HCBFS": {
            this.isImgHRBFSGActive = false;
            this.isImgHRBFSActive = true;
            this._spouseBenefForm.get("HRBFS").get("isActice").setValue(true);
            this._spouseBenefForm.get("HRBFS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("HRBFS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBFS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "HBS": {
            this.isImgHBSGActive = false;
            this.isImgHBSActive = true;
            this._spouseBenefForm.get("HBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("HBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("HBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          case "WPBS": {
            this.isImgWPBSGActive = false;
            this.isImgWPBSActive = true;
            this._spouseBenefForm.get("WPBS").get("isActice").setValue(true);
            this._spouseBenefForm.get("WPBS").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("WPBS").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "WPBS";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }
          default: {

          }
        }

      }

      for (var q in this._childrenBenefits) {

        console.log(this._childrenBenefits[q].benfName);
        switch (this._childrenBenefits[q].benfName) {
          case "CIBC": {
            this.isImgCIBCGActive = false;
            this.isImgCIBCActive = true;
            this._childrenBenefForm.get("CIBC").get("isActice").setValue(true);
            this._childrenBenefForm.get("CIBC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("CIBC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "CIBC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }

          case "SUHRBC": {
            this.isImgSUHRBCGActive = false;
            this.isImgSUHRBCActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("SUHRBC").get("isActice").setValue(true);
            this._childrenBenefForm.get("SUHRBC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("SUHRBC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SUHRBC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "SHCBFC": {
            this.isImgSHCBFCGActive = false;
            this.isImgSHCBFCActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("SHCBFC").get("isActice").setValue(true);
            this._childrenBenefForm.get("SHCBFC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("SHCBFC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SHCBFC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "SHCBIC": {
            this.isImgSUHRBCGActive = false;
            this.isImgSUHRBCActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("SUHRBC").get("isActice").setValue(true);
            this._childrenBenefForm.get("SUHRBC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("SUHRBC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "SUHRBC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "HRBIC": {
            this.isImgHRBICGActive = false;
            this.isImgHRBICActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("HRBIC").get("isActice").setValue(true);
            this._childrenBenefForm.get("HRBIC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("HRBIC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBIC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "HCBIC": {
            this.isImgHRBICGActive = false;
            this.isImgHRBICActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("HRBIC").get("isActice").setValue(true);
            this._childrenBenefForm.get("HRBIC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("HRBIC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBIC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "HRBFC": {
            this.isImgHRBFCGActive = false;
            this.isImgHRBFCActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("HRBFC").get("isActice").setValue(true);
            this._childrenBenefForm.get("HRBFC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("HRBFC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBFC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "HCBFC": {
            this.isImgHRBFCGActive = false;
            this.isImgHRBFCActive = true;
            for (let c in this._quotationCalculation._personalInfo.childrens) {
              let child = this._quotationCalculation._personalInfo.childrens[c];
              child._cHcbc = true;
            }
            this._childrenBenefForm.get("HRBFC").get("isActice").setValue(true);
            this._childrenBenefForm.get("HRBFC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("HRBFC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HRBFC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }
          case "HBC": {
            this.isImgHBCGActive = false;
            this.isImgHBCActive = true;
            this._childrenBenefForm.get("HBC").get("isActice").setValue(true);
            this._childrenBenefForm.get("HBC").get("sumAssured").setValue(this._childrenBenefits[q].riderSum);
            this._childrenBenefForm.get("HBC").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "HBC";
            benifict.premium = 0;
            benifict.sumAssured = this._childrenBenefits[q].riderSum;

            this.riderDetails._cRiders.push(benifict);
            break;
          }

          default: {

          }
        }

      }

      this._quotationCalculation._riderDetails = this.riderDetails;
      this.setValidity(true);

      this.sendQuo()

    }, error => {
      swal("Error", "Error code - 214 <br>", "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }



  clearquo() {
    this.arpBenefictInfoComponent.loadDefault();
    this.arpPersonolInfoComponent.loadDefault();
    this.sendQuo();
  }

  clearbenef(e) {

    this.arpBenefictInfoComponent.loadDefaultNew();
    //this.sendQuo();
  }

  clearbenefAll(e) {

    this.arpBenefictInfoComponent.loadDefaultBSAChange();
    //this.sendQuo();
  }

  setBsa(e) {
    console.log(e);
    this._quotationCalculation._personalInfo.bsa = e;
  }

  calPreviousRiskM(e) {
    if (e.length > 0) {
      this.isDisableDiv = true;
      document.onkeydown = function (e) { return false; }
      this.dashboardService.getSumAtRiskMainLife(e).subscribe(resp => {
        this.isDisableDiv = false;
        this.arpPersonolInfoComponent.loadDOBFromNic();

        
        document.onkeydown = function (e) { return true; }
        if (resp.json()) {
          this.personalInfo._mainlife._mCustomerCode = resp.json().custCode;
        }
        if (resp.json()) {
          this.sumAtRiskMain = resp.json().sumAtRisk;
          this._quotationCalculation._personalInfo.mPreviousSumAtRisk = resp.json().sumAtRisk;
          this.previousSumMain = resp.json().sumAtRisk;
        } else {
          this.previousSumMain = 0;
        }
        this.sendQuo();
      }, error => {
        swal("Error", "Error code - 215 <br>", "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }

  }

  calPreviousRiskS(e) {
    if (e.length > 0) {
      this.isDisableDiv = true;
      document.onkeydown = function (e) { return false; }
      this.dashboardService.getSumAtRiskMainLife(e).subscribe(resp => {
        this.isDisableDiv = false;
        this.arpPersonolInfoComponent.loadSpouseDOBFromNic();
        
        document.onkeydown = function (e) { return true; }
        if (resp.json()) {
          this.personalInfo._spouse._sCustomerCode = resp.json().custCode;
        }
        if (resp.json()) {
          this.sumAtRiskSpouse = resp.json().sumAtRisk;
          this._quotationCalculation._personalInfo.sPreviousSumAtRisk = resp.json().sumAtRisk;
          this.previousSumSpouse = resp.json().sumAtRisk;
        } else {
          this.previousSumSpouse = 0;
        }
        this.sendQuo();
      }, error => {
        swal("Error", "Error code - 216 <br>", "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }
  }
}
