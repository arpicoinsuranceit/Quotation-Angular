import { WPB, WPBS } from './../../model/benificts';
import { ArtmSummeryComponent } from './artm-summery/artm-summery.component';
import { SaveArtmQuotationService } from './../../service/quo-artm/save-artm-quotation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { QuoAipService } from './../../service/quo-aip/quo-aip.service';
import { LoginService } from './../../service/login.service';
import { personalInfo } from './../../model/personalInfo';
import { Spouse } from './../../model/spouse';
import { QuoAipReq } from './../../model/qupaipreq';
import { MainLife } from './../../model/mainlife';
import { PlanAip, Plan, PlanArtm } from './../../model/plan';
import { AtrmPersonalInfoComponent } from './../quo-atrm/atrm-personal-info/atrm-personal-info.component';
import swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtmPersonalInfoComponent } from './artm-personal-info/artm-personal-info.component';
import { AibSummery, RiderDetails, QuotationCalculation } from '../../model/quoCal';
import { SummeryInfo } from '../../model/summeryInfo';
import { FormGroup, FormControl } from '@angular/forms';
import { QuoBenf } from '../../model/quotationView';
import { InvpSaveQuotation } from '../../model/invpSaveQuotation';
import { Children } from '../../model/childeren';
import { Benifict } from '../../model/benificts';
import { AtrmAdditionalBenefComponent } from '../quo-atrm/atrm-additional-benef/atrm-additional-benef.component';
import { ArtmAdditionalBenefComponent } from './artm-additional-benef/artm-additional-benef.component';

@Component({
  selector: 'app-quo-artm',
  templateUrl: './quo-artm.component.html',
  styleUrls: ['./quo-artm.component.css']
})
export class QuoArtmComponent implements OnInit {

  @ViewChild(ArtmPersonalInfoComponent) artmPersonalInfoComponent: ArtmPersonalInfoComponent;
  @ViewChild(ArtmAdditionalBenefComponent) artmAdditionalBenefComponent: ArtmAdditionalBenefComponent;
  @ViewChild(ArtmSummeryComponent) artmSummeryComponent: ArtmSummeryComponent;

  qdId: number;
  isEditUI: boolean = false;
  _mainLife = new MainLife; //For Mainlife tab
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

  _mainLifeBenefForm: FormGroup = new FormGroup({
    L2: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    CIB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),

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

    SUHRB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),/*
    */
    SHCBF: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    WPB: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HB: new FormGroup({
      isActice: new FormControl(null),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
  });
  _spouseBenefForm: FormGroup;
  _childrenBenefForm: FormGroup;


  activeSp = "2";
  activeCh = "2";

  sumAtRiskMain = 0;
  sumAtRiskSpouse = 0;

  previousSumMain = 0;
  previousSumSpouse = 0;

  isGetHealthBenef = false;
  isGetHcbf = false;
  isGetHcbi = false;
  isGetShcbf = false;
  isGetShcbi = false;


  isImgCIBGActive = true;
  isImgCIBActive = false;

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

  isImgSUHRBGActive = true;
  isImgSUHRBActive = false;

  isImgSUHRBSGActive = true;
  isImgSUHRBSActive = false;

  isImgSUHRBCGActive = true;
  isImgSUHRBCActive = false;

  isImgSHCBFGActive = true;
  isImgSHCBFActive = false;

  isImgSHCBFCGActive = true;
  isImgSHCBFCActive = false;

  isImgSHCBFSGActive = false;
  isImgSHCBFSActive = true;

  isImgWPBGActive = true;
  isImgWPBActive = false;

  isImgWPBSGActive = true;
  isImgWPBSActive = false;

  isImgL2GActive = false;
  isImgL2Active = true;

  isImgHBGActive = true;
  isImgHBActive = false;

  isImgHBSGActive = true;
  isImgHBSActive = false;

  isImgHBCGActive = true;
  isImgHBCActive = false;

  personalInfo: personalInfo = new personalInfo(this._mainLife, this._spouse, this._childrens, this._plan);
  benif: FormGroup;

  payType = "None";
  payTerm = 0;
  summeryInfo = new SummeryInfo;

  validity: any = false;

  isDisableDiv = false;

  beforeFrequency:string="Monthly";

  constructor(private loginService: LoginService, private quoArtmService: SaveArtmQuotationService, private router: Router, private route: ActivatedRoute,
    private dashboardService: DashboardService) {
    if (!sessionStorage.getItem("Token")) {
      this.loginService.navigateLigin();
    }

    this.route.params.subscribe(params => {
      this.qdId = params.id;
    }, error => { swal("Error", error.text() , "error") });

    this.personalInfo._mainlife._mTitle = "MR";
    this.personalInfo._mainlife._mGender = "M";
    this.personalInfo._mainlife._mSmoking = "No";
    this.personalInfo._mainlife._mOccupation = "285";
    this.personalInfo._mainlife._mAge = 18;
    this.personalInfo._spouse._sOccupation = "285";
    this.personalInfo._spouse._sAge = 18;
    this.personalInfo._mainlife._mCivilStatus = "S";
    this._children._cTitle = "M";
    this._plan._frequance = "Monthly";
    this._plan._bsa = 3000;
    this._plan._term = 47;
    this._plan.retAge = 65;
    this._plan._payingterm = "10";
    this._plan.pensionPaingTerm = 10;

  }

  ngOnInit() {
    if (this.qdId != undefined) {
      this.isEditUI = true;
      this.editCal();
    } else {
      this.loadL2();
    }
  }

  onSetCalObj(e: any) {
    this._quotationCalculation._personalInfo = e;
    if (this._quotationCalculation._personalInfo.childrens != null) {
      //this._childrens = this._quotationCalculation._personalInfo.childrens;
      for (let i in this._quotationCalculation._personalInfo.childrens) {
        let child: Children = this._quotationCalculation._personalInfo.childrens[i];
        for (let j in this._quotationCalculation._riderDetails._cRiders) {
          //console.log(j);
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
    ////console.log(this._childrens);
    this.sendQuo();

  }

  onsetBenifAll(allForm) {
    this._mainLifeBenefForm = allForm.abmForm;
    this._spouseBenefForm = allForm.absForm;
    this._childrenBenefForm = allForm.abcForm;

    ////console.log( this._mainLifeBenefForm.get("WPB").get("isActice").value);
    ////console.log( this._mainLifeBenefForm.get("WPB").get("isActice").value);

    this.benif = this._mainLifeBenefForm;
    this.riderDetails._mRiders = new Array();
    for (var i in this._mainLifeBenefForm.value) {
      let benifict = this._mainLifeBenefForm.value[i];
      if (benifict.isActice == true) {
        if (benifict.sumAssured && i != "WPB") {
          let benifict1 = new Benifict();
          benifict1.active = "true";
          benifict1.type = i;
          benifict1.premium = benifict.premium;
          benifict1.sumAssured = benifict.sumAssured;

          this.riderDetails._mRiders.push(benifict1);
        }
        if(i == "WPB"){
           let benifict1 = new Benifict();
           benifict1.active = "true";
           benifict1.type = i;
           benifict1.premium = benifict.premium;
           benifict1.sumAssured = benifict.sumAssured;

           this.riderDetails._mRiders.push(benifict1);
         }
      }
    }

    if(this.isEditUI == true){
      let isL2Active=false;
      for(var i in this.riderDetails._mRiders){
        if(this.riderDetails._mRiders[i].type == "L2"){
          isL2Active=true;
        }
      }

      if(!isL2Active){
        let benifict = new Benifict();
        benifict.active = "true";
        benifict.type = "L2";
        benifict.premium = this._mainLifeBenefForm.get("L2").get("premium").value;
        benifict.sumAssured = 100000;
        this.riderDetails._mRiders.push(benifict);
      }
      
    }
    
    this._quotationCalculation._riderDetails = this.riderDetails;

    this.benif = this._spouseBenefForm;
    this.riderDetails._sRiders = new Array();
    for (var i in this._spouseBenefForm.value) {

      let benifict = this._spouseBenefForm.value[i];
      if (benifict.isActice == true) {
        ////console.log(benifict.sumAssured);
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

  setClear(e) {
    this.artmPersonalInfoComponent.loadDefault();
    this.artmAdditionalBenefComponent.loadDefault();
  }

  setValidity(validity: any) {
    this.validity = validity;
  }

  /*onSetPlanInfo(a: any) {
    this._plan = a;
  }

  onSetPlanCal(a: any) {
    this._plan = a;
    this._planCommon._bsa = this._plan._contribution;
    this._planCommon._frequance = this._plan._frequance;
    this._planCommon._term = this._plan._term;
    this._planCommon.pensionPaingTerm = this._plan.pensionPaingTerm;
    this._planCommon.retAge = this._plan.retAge;
    this._planCommon.age = this._mainLife._mAge;
    this._planCommon._payingterm = this._plan.payingTerm;
    this.sendQuo();
  }*/

  onSet(type: personalInfo) {
    //alert("onset called");
    this.personalInfo = type;
    this.payType = this.personalInfo._plan._frequance;
    this._plan._frequance = this.personalInfo._plan._frequance;

    if (type._plan._term != null || type._plan._term != undefined) {
      this.payTerm = type._plan._term;
    } else {
      this.personalInfo._plan._term = 0;
    }
    this.summeryInfo._summery._payType = this.personalInfo._plan._frequance;
    this.summeryInfo._summery._term = this.personalInfo._plan._term;
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
    ////console.log(risk);
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
    this.isDisableDiv = true;
    
    //console.log("///////////////////////////////////");
    //console.log(this._quotationCalculation);
    let payTerm = parseInt(this.personalInfo._plan._payingterm);
    let age = parseInt(this.personalInfo._mainlife._mAge.toString());
    let rtAge = parseInt(this.personalInfo._plan.retAge.toString());

    this._plan._term = rtAge - age;
    ////console.log(this.personalInfo._mainlife._mAge);

    this._plan.age = this.personalInfo._mainlife._mAge;
    this.personalInfo._plan._term = this._plan._term;

    this.personalInfo._plan.age = this._plan.age;

    this._plan = this.personalInfo._plan;

    //remove WPB rider from array if frequency is single premium
    if (this.personalInfo._plan._frequance == "Single Premium") {
      //alert("single ok");
      for (let i in this._quotationCalculation._riderDetails._mRiders) {
        //console.log(this._quotationCalculation._riderDetails._mRiders[i].type);
        if (this._quotationCalculation._riderDetails._mRiders[i].type != "L2") {
          this._quotationCalculation._riderDetails._mRiders.splice(parseInt(i), 1);
        }
      }
      this.beforeFrequency="Single Premium";
      this._quotationCalculation._riderDetails._sRiders=new Array();
      this._quotationCalculation._riderDetails._cRiders=new Array();
      this.artmAdditionalBenefComponent.loadDefaultNew();
    }else{
      if(this.beforeFrequency == "Single Premium"){
        for (let i in this._quotationCalculation._riderDetails._mRiders) {
          //console.log(this._quotationCalculation._riderDetails._mRiders[i].type);
          if (this._quotationCalculation._riderDetails._mRiders[i].type != "L2") {
            this._quotationCalculation._riderDetails._mRiders.splice(parseInt(i), 1);
          }
        }

        this._quotationCalculation._riderDetails._sRiders=new Array();
        this._quotationCalculation._riderDetails._cRiders=new Array();
        this.artmAdditionalBenefComponent.loadDefaultNew();
      }
      let existWPB=false;
      
      for (let i in this._quotationCalculation._riderDetails._mRiders) {
        if (this._quotationCalculation._riderDetails._mRiders[i].type == "WPB") {
          existWPB=true;
        }
      }

      if(existWPB == false){
        this.isImgWPBGActive = false;
        this.isImgWPBActive = true;
        this._mainLifeBenefForm.get("WPB").get("isActice").setValue(true);
        this._mainLifeBenefForm.get("WPB").get("sumAssured").setValue('0');
        this._mainLifeBenefForm.get("WPB").get("sumAssured").enable();
        let benifict1 = new Benifict();
        benifict1.active = "true";
        benifict1.type = "WPB";
        benifict1.premium = 0;
        benifict1.sumAssured = 0;

        this._quotationCalculation._riderDetails._mRiders.push(benifict1);
      }

      this.beforeFrequency=this.personalInfo._plan._frequance;
    }


    if (this.personalInfo._plan.retAge >= 40 && this.personalInfo._plan.retAge <= 65 && !Number.isNaN(this.personalInfo._plan.retAge)) {

      if ((this.personalInfo._plan._frequance != "Single Premium" && (payTerm >= 10 && payTerm <= 47) && (payTerm <= (rtAge - age))) ||
        (this.personalInfo._plan._frequance == "Single Premium" && payTerm == 0) && !Number.isNaN(payTerm)) {

        if (this.personalInfo._plan._bsa >= 3000 && !Number.isNaN(this.personalInfo._plan._bsa)) {
          if (this.personalInfo._mainlife._mAge > 17 && this.personalInfo._mainlife._mAge < 56) {
            if (this.personalInfo._plan._bsa != null && this.personalInfo._plan._bsa != undefined &&
              this.personalInfo._plan._frequance != null && this.personalInfo._plan._frequance != undefined &&
              this.personalInfo._plan._term != null && this.personalInfo._plan._term != undefined) {
              ////console.log(this._plan);
              ////console.log(this.personalInfo._plan);
              this._quotationCalculation._personalInfo.sPreviousSumAtRisk = this.previousSumSpouse;
              this._quotationCalculation._personalInfo.mPreviousSumAtRisk = this.previousSumMain;

              this.quoArtmService.getQouCal(this._quotationCalculation).subscribe(response => {
                document.onkeydown = function (e) { return true; }
                this.isDisableDiv = false;
                //console.log(response.json());
                if (response.json().errorExist == true) {
                  swal("Error!", "Error exist in " + response.json().error, "error");
                }

                this.summeryInfo._summery.healthBenMain = response.json().mainLifeHealthReq;
                this.summeryInfo._summery.healthBenSpouse = response.json().spouseHealthReq;
                this.summeryInfo._summery.sumAssured = response.json().basicSumAssured.toLocaleString();
                this.summeryInfo._summery.oc = response.json().extraOE.toLocaleString();
                this.summeryInfo._summery.withoutLoadingTot = response.json().withoutLoadingTot.toLocaleString();
                this.summeryInfo._summery.occuLodingTot = response.json().occuLodingTot.toLocaleString();
                this.summeryInfo._summery.totPremium = response.json().totPremium.toLocaleString();
                this.summeryInfo._summery.at6 = response.json().at6.toLocaleString();
                this.summeryInfo._summery.at8 = response.json().at8.toLocaleString();
                this.summeryInfo._summery.at10 = response.json().at10.toLocaleString();
                this.summeryInfo._summery.pensionPremium1 = response.json().pensionPremium1.toLocaleString();
                this.summeryInfo._summery.pensionPremium2 = response.json().pensionPremium2.toLocaleString();
                this.summeryInfo._summery.pensionPremium3 = response.json().pensionPremium3.toLocaleString();
                this.summeryInfo._health.CIB = response.json().cib;
                this.summeryInfo._health.CIBTerm = response.json().cibTerm;
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
                this.summeryInfo._health.HB = response.json().hb;
                this.summeryInfo._health.HBTerm = response.json().hbTerm;
                this.summeryInfo._health.HBC = response.json().hbc;
                this.summeryInfo._health.HBCTerm = response.json().hbcTerm;
                this.summeryInfo._health.HBS = response.json().hbs;
                this.summeryInfo._health.HBSTerm = response.json().hbsTerm;

                this.summeryInfo._protection.WPB = response.json().wpb;
                this.summeryInfo._protection.WPBTerm = response.json().wpbTerm;
                this.summeryInfo._protection.WPBS = response.json().wpbs;
                this.summeryInfo._protection.WPBSTerm = response.json().wpbsTerm;
                this.summeryInfo._protection.L2 = response.json().l2;
                this.summeryInfo._protection.L2Term = response.json().l2term;
              }, error => {
                swal("Error", error.text() , "error");
                document.onkeydown = function (e) { return true; }
                this.isDisableDiv = false;
              });

            }
          } else {
            swal("Opzz", "Age must be Greater than or Equal 18 and Less than or equal 55", "error");
            this.isDisableDiv = false;
            return;
          }

        } else {
          swal("Opzz", "Contribution must be greater than or equal Rs.3000", "error");
          this.isDisableDiv = false;
          return;
        }

      } else {
        swal("Opzz", "Paying Term must be between 10 and 47 and Less than or equal (RetirementAge - Age)", "error");
        this.isDisableDiv = false;
        return;
      }
    } else {
      swal("Opzz", "Retirement Age must be Greater than or Equal 40 and Less than or equal 65", "error");
      this.isDisableDiv = false;
      return;
    }
  }

  riderArr = [];

  save(e: any) {
    if (this.validity == true) {
      let payTerm = parseInt(this.personalInfo._plan._payingterm);
      let age = parseInt(this.personalInfo._mainlife._mAge.toString());
      let rtAge = parseInt(this.personalInfo._plan.retAge.toString());

      this._plan._term = rtAge - age;
      ////console.log(this.personalInfo._mainlife._mAge);

      this._plan.age = this.personalInfo._mainlife._mAge;
      this.personalInfo._plan._term = this._plan._term;

      this.personalInfo._plan.age = this._plan.age;

      this._plan = this.personalInfo._plan;

      //remove WPB rider from array if frequency is single premium
      if (this.personalInfo._plan._frequance == "Single Premium") {
        for (let i in this._quotationCalculation._riderDetails._mRiders) {
          if (this._quotationCalculation._riderDetails._mRiders[i].type != "L2") {
            this._quotationCalculation._riderDetails._mRiders.splice(parseInt(i), 1);
          }
        }
        this._quotationCalculation._riderDetails._sRiders=new Array();
        this._quotationCalculation._riderDetails._cRiders=new Array();
        this.artmAdditionalBenefComponent.loadDefaultNew();
        
      }


      if (this.personalInfo._plan.retAge >= 40 && this.personalInfo._plan.retAge <= 65 && !Number.isNaN(this.personalInfo._plan.retAge)) {

        if ((this.personalInfo._plan._frequance != "Single Premium" && (payTerm >= 10 && payTerm <= 47) && (payTerm <= (rtAge - age))) ||
          (this.personalInfo._plan._frequance == "Single Premium" && payTerm == 0) && !Number.isNaN(payTerm)) {

          if (this.personalInfo._plan._bsa >= 3000 && !Number.isNaN(this.personalInfo._plan._bsa)) {
            if (this.personalInfo._mainlife._mAge > 17 && this.personalInfo._mainlife._mAge < 56) {
              if (this.personalInfo._mainlife._mOccupation != "285") {
                if (this.activeSp == "1") {
                  if (this.personalInfo._spouse._sOccupation != "285") {
                    this._invpSaveQuotation._personalInfo = this.personalInfo;
                    this._invpSaveQuotation._riderDetails = this.riderDetails;
                    this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
                    // //console.log("|||||||||||||||||||||||||||||||||||||||");
                    ////console.log(this._invpSaveQuotation);
                    this.isDisableDiv = true;
                    document.onkeydown = function (e) { return false; }
                    this.quoArtmService.saveQuo(this._invpSaveQuotation).subscribe(response => {
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
                      swal("Error", error.text() , "error");
                      document.onkeydown = function (e) { return true; }
                      this.isDisableDiv = false;
                    });
                  } else {
                    swal("Oopz..", "Please select an occupation for spouse..", "error");
                  }

                } else {
                  this._invpSaveQuotation._personalInfo = this.personalInfo;
                  this._invpSaveQuotation._riderDetails = this.riderDetails;
                  this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
                  this.isDisableDiv = true;
                  document.onkeydown = function (e) { return false; }

                  this.quoArtmService.saveQuo(this._invpSaveQuotation).subscribe(response => {
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
                    swal("Error", error.text() , "error");
                    document.onkeydown = function (e) { return true; }
                    this.isDisableDiv = false;
                  });
                }
              } else {
                swal("Oopz..", "Please select an occupation for main life..", "error");
              }
            } else {
              swal("Opzz", "Age must be Greater than or Equal 18 and Less than or equal 55", "error");
              return;
            }

          } else {
            swal("Opzz", "Contribution must be greater than or equal Rs.3000", "error");
            return;
          }

        } else {
          swal("Opzz", "Paying Term must be between 10 and 47 and Less than or equal (RetirementAge - Age)", "error");
          return;
        }
      } else {
        swal("Opzz", "Retirement Age must be Greater than or Equal 40 and Less than or equal 65", "error");
        return;
      }

    } else {
      ////console.log(this.validity);
      swal("Check Form Again", "Fill all Required fields...", "error")
        .then((value) => {
          document.getElementById(this.validity).classList.add("errors");
          document.getElementById(this.validity).focus();
        });
    }
  }

  artmSchedule(e: any) {
    this.isDisableDiv = true;
    this.quoArtmService.getArtmShedule(this._quotationCalculation).subscribe(response => {
      document.onkeydown = function (e) { return true; }
      //console.log(response.json());

      this.isDisableDiv = false;
      this.artmSummeryComponent.displaySchedule(response.json().pensionShedules);
    });
  }


  loadL2() {

    this.isImgL2GActive = false;
    this.isImgL2Active = true;
    //console.log(this._mainLifeBenefForm);
    this._mainLifeBenefForm.get("L2").get("isActice").setValue(true);
    this._mainLifeBenefForm.get("L2").get("sumAssured").setValue('100000');
    this._mainLifeBenefForm.get("L2").get("sumAssured").enable();
    let benifict = new Benifict();
    benifict.active = "true";
    benifict.type = "L2";
    benifict.premium = 0;
    benifict.sumAssured = 0;

    this.riderDetails._mRiders.push(benifict);

    this.isImgWPBGActive = false;
    this.isImgWPBActive = true;
    this._mainLifeBenefForm.get("WPB").get("isActice").setValue(true);
    this._mainLifeBenefForm.get("WPB").get("sumAssured").setValue('0');
    this._mainLifeBenefForm.get("WPB").get("sumAssured").enable();
    let benifict1 = new Benifict();
    benifict1.active = "true";
    benifict1.type = "WPB";
    benifict1.premium = 0;
    benifict1.sumAssured = 0;

    this.riderDetails._mRiders.push(benifict1);

  }

  editCal() {
    this.quoArtmService.getArtmQuotationDetailsForEdit(this.qdId).subscribe(response => {
      

      let phone : string = response.json()._mainlife._mMobile;
      this._mainLife = response.json()._mainlife;
      this._mainLife._mMobile = phone.substr(1,9); 
      this._plan = response.json()._plan;
      this._plan._bsa = this._plan.contribution;
      this._spouse = response.json()._spouse;

      this._childrens = response.json()._children;

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
      this.personalInfo._mainlife._mCivilStatus = this._mainLife._mCivilStatus;

      this._mainLifeBenefits = response.json()._mainLifeBenefits;
      this._spouseBenefits = response.json()._spouseBenefits;
      this._childrenBenefits = response.json()._childrenBenefits;
      this.riderDetails._mRiders = new Array();
      this.riderDetails._sRiders = new Array();
      this.riderDetails._cRiders = new Array();

      this._quotationCalculation._personalInfo.bsa = this.personalInfo._plan.contribution;
      this._quotationCalculation._personalInfo.frequance = this.personalInfo._plan._frequance;
      this._quotationCalculation._personalInfo.term = this.personalInfo._plan._term;
      this._quotationCalculation._personalInfo.payingterm = this.personalInfo._plan._payingterm;
      this._quotationCalculation._personalInfo.pensionPaingTerm = this.personalInfo._plan.pensionPaingTerm;
      this._quotationCalculation._personalInfo.retAge = this.personalInfo._plan.retAge;
      this._quotationCalculation._personalInfo.age = this.personalInfo._plan.age;

      this.beforeFrequency=this.personalInfo._plan._frequance;

      this._quotationCalculation._personalInfo.childrens = this.personalInfo._childrenList;

      this._quotationCalculation._personalInfo.mage = this.personalInfo._mainlife._mAge;
      this._quotationCalculation._personalInfo.mgenger = this.personalInfo._mainlife._mGender;
      this._quotationCalculation._personalInfo.mocu = this.personalInfo._mainlife._mOccupation;
      this._quotationCalculation._personalInfo.sage = this.personalInfo._spouse._sAge;
      this._quotationCalculation._personalInfo.sgenger = this.personalInfo._spouse._sGender;
      this._quotationCalculation._personalInfo.socu = this.personalInfo._spouse._sOccupation;

      this.summeryInfo._summery._payType = this.personalInfo._plan._frequance;


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


      this.validity = true;

      for (var q in this._mainLifeBenefits) {

        ////console.log(this._mainLifeBenefits[q].benfName);
        switch (this._mainLifeBenefits[q].benfName) {

          case "L2": {
            this.isImgL2GActive = false;
            this.isImgL2Active = true;
            this._mainLifeBenefForm.get("L2").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("L2").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("L2").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "L2";
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

        ////console.log(this._spouseBenefits[q].benfName);
        switch (this._spouseBenefits[q].benfName) {

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

          default: {

          }
        }

      }

      for (var q in this._childrenBenefits) {

        ////console.log(this._childrenBenefits[q].benfName);
        switch (this._childrenBenefits[q].benfName) {

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

      this.sendQuo()

    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }

  edit(e: any) {
    if (this.validity == true) {
      let payTerm = parseInt(this.personalInfo._plan._payingterm);
      let age = parseInt(this.personalInfo._mainlife._mAge.toString());
      let rtAge = parseInt(this.personalInfo._plan.retAge.toString());

      this._plan._term = rtAge - age;
      ////console.log(this.personalInfo._mainlife._mAge);

      this._plan.age = this.personalInfo._mainlife._mAge;
      this.personalInfo._plan._term = this._plan._term;

      this.personalInfo._plan.age = this._plan.age;

      this._plan = this.personalInfo._plan;

      //remove WPB rider from array if frequency is single premium
      if (this.personalInfo._plan._frequance == "Single Premium") {
        for (let i in this._quotationCalculation._riderDetails._mRiders) {
          if (this._quotationCalculation._riderDetails._mRiders[i].type != "L2") {
            this._quotationCalculation._riderDetails._mRiders.splice(parseInt(i), 1);
          }
        }
        this._quotationCalculation._riderDetails._sRiders=new Array();
        this._quotationCalculation._riderDetails._cRiders=new Array();
        this.artmAdditionalBenefComponent.loadDefaultNew();
      }

      //alert(this._plan._term);
      if (this.personalInfo._plan.retAge >= 40 && this.personalInfo._plan.retAge <= 65 && !Number.isNaN(this.personalInfo._plan.retAge)) {

        if ((this.personalInfo._plan._frequance != "Single Premium" && (payTerm >= 10 && payTerm <= 47) && (payTerm <= (rtAge - age))) ||
          (this.personalInfo._plan._frequance == "Single Premium" && payTerm == 0) && !Number.isNaN(payTerm)) {

          if (this.personalInfo._plan._bsa >= 3000 && !Number.isNaN(this.personalInfo._plan._bsa)) {
            if (this.personalInfo._mainlife._mAge > 17 && this.personalInfo._mainlife._mAge < 56) {
              if (this.personalInfo._mainlife._mOccupation != "285") {
                if (this.activeSp == "1") {
                  if (this.personalInfo._spouse._sOccupation != "285") {
                    this._invpSaveQuotation._personalInfo = this.personalInfo;
                    this._invpSaveQuotation._riderDetails = this.riderDetails;
                    this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
                    ////console.log("|||||||||||||||||||||||||||||||||||||||");
                    ////console.log(this._invpSaveQuotation);
                    this.isDisableDiv = true;
                    document.onkeydown = function (e) { return false; }
                    this.quoArtmService.editArtm(this._invpSaveQuotation, this.qdId).subscribe(response => {
                      this.personalInfo._plan._frequance = this.getFreq(this._invpSaveQuotation._personalInfo._plan._frequance);
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
                      swal("Error", error.text() , "error");
                      document.onkeydown = function (e) { return true; }
                      this.isDisableDiv = false;
                    });
                  } else {
                    swal("Oopz..", "Please select an occupation for spouse..", "error");
                  }

                } else {
                  this._invpSaveQuotation._personalInfo = this.personalInfo;
                  this._invpSaveQuotation._riderDetails = this.riderDetails;
                  this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
                  this.isDisableDiv = true;
                  document.onkeydown = function (e) { return false; }

                  this.quoArtmService.editArtm(this._invpSaveQuotation, this.qdId).subscribe(response => {
                    this.personalInfo._plan._frequance = this.getFreq(this._invpSaveQuotation._personalInfo._plan._frequance);
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
                    swal("Error", error.text() , "error");
                    document.onkeydown = function (e) { return true; }
                    this.isDisableDiv = false;
                  });
                }
              } else {
                swal("Oopz..", "Please select an occupation for main life..", "error");
              }
            } else {
              swal("Opzz", "Age must be Greater than or Equal 18 and Less than or equal 55", "error");
              return;
            }

          } else {
            swal("Opzz", "Contribution must be greater than or equal Rs.3000", "error");
            return;
          }

        } else {
          swal("Opzz", "Paying Term must be between 10 and 47 and Less than or equal (RetirementAge - Age)", "error");
          return;
        }
      } else {
        swal("Opzz", "Retirement Age must be Greater than or Equal 40 and Less than or equal 65", "error");
        return;
      }

    } else {
      ////console.log(this.validity);
      swal("Check Form Again", "Fill all Required fields...", "error")
        .then((value) => {
          document.getElementById(this.validity).classList.add("errors");
          document.getElementById(this.validity).focus();
        });
    }

  }


  clearbenef(e) {

    this.artmAdditionalBenefComponent.loadDefaultNew();
    //this.sendQuo();
  }

  clearbenefAll(e) {

    this.artmAdditionalBenefComponent.loadDefaultBSAChange();
    //this.sendQuo();
  }

  calPreviousRiskM(e) {
    if(e.length >0){
    this.isDisableDiv = true;
    document.onkeydown = function (e) { return false; }
    this.dashboardService.getSumAtRiskMainLife(e).subscribe(resp => {
      this.isDisableDiv = false;
      this.artmPersonalInfoComponent.loadDOBFromNic();
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
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }
  }

  calPreviousRiskS(e) {
    if(e.length >0){
    this.isDisableDiv = true;
    document.onkeydown = function (e) { return false; }
    this.dashboardService.getSumAtRiskMainLife(e).subscribe(resp => {
      this.isDisableDiv = false;
      this.artmPersonalInfoComponent.loadSpouseDOBFromNic();
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
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }
  }

  getFreq(_frequance: string): string {
    switch (_frequance) {
      case "M":
        return "Monthly";
      case "Q":
        return "Quartaly";
      case "H":
        return "Half Yearly";
      case "Y":
        return "Yearly";
      case "S":
        return "Single Premium";
      default:
        break;
    }
  }
}
