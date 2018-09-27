import { DashboardService } from './../../service/dashboard/dashboard.service';
import { LoginService } from './../../service/login.service';
import { DtaplBenefictInfoComponent } from './dtapl-benefict-info/dtapl-benefict-info.component';
import { QuoDtaService } from './../../service/quo-dta/quo-dta.service';
import { personalInfo } from './../../model/personalInfo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SaveInvpQuotationService } from '../../service/quo-invp/save-invp-quotation.service';
import { RiderDetails, QuotationCalculation } from '../../model/quoCal';
import { InvpSaveQuotation } from '../../model/invpSaveQuotation';
import { personalInfoDTA } from '../../model/personalInfo';
import { FormGroup } from '@angular/forms';
import { SummeryInfo } from '../../model/summeryInfo';
import { Benifict } from '../../model/benificts';
import swal from 'sweetalert2';
import { QuoDtaplService } from '../../service/quo-dtapl/quo-dtapl.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Spouse } from '../../model/spouse';
import { Plan } from '../../model/plan';
import { MainLife } from '../../model/mainlife';
import { QuoBenf } from '../../model/quotationView';
import { DtaplPersonalInfoComponent } from './dtapl-personal-info/dtapl-personal-info.component';

@Component({
  selector: 'app-quo-dtapl',
  templateUrl: './quo-dtapl.component.html',
  styleUrls: ['./quo-dtapl.component.css']
})
export class QuoDtaplComponent implements OnInit {

  @ViewChild(DtaplPersonalInfoComponent) dtaplPersonolInfoComponent: DtaplPersonalInfoComponent;
  @ViewChild(DtaplBenefictInfoComponent) dtaplBenefictInfoComponent: DtaplBenefictInfoComponent;

  qdId: number;
  isEditUI: boolean = false;
  _mainLife = new MainLife; //For Mainlife tab
  _spouse = new Spouse;// For Spouse Tab
  _plan = new Plan();

  riderDetails = new RiderDetails();
  _quotationCalculation = new QuotationCalculation();
  _invpSaveQuotation = new InvpSaveQuotation();
  benifictList = new Array();
  _mainLifeBenefits = new Array<QuoBenf>();
  _spouseBenefits = new Array<QuoBenf>();

  _mainLifeBenefForm: FormGroup;
  _spouseBenefForm: FormGroup;

  previousSumMain = 0;
  previousSumSpouse = 0;
  activeSp = "2";

  personalInfo: personalInfo = new personalInfo(this._mainLife, this._spouse, null, this._plan);
  benif: FormGroup;

  payType = "None";
  payTerm = 0;
  summeryInfo = new SummeryInfo;

  validity: any = false;

  isImgTPDDTASPLGActive = true;
  isImgTPDDTASPLActive = false;

  isImgJLBPLGActive = true;
  isImgJLBPLActive = false;

  isImgTPDDTAPLGActive = true;
  isImgTPDDTAPLActive = false;

  isDisableDiv = false;

  sumAtRiskMain = 0;
  sumAtRiskSpouse = 0;

  constructor(private saveDtaplQuotationService: QuoDtaplService, private loginService: LoginService, private router: Router, private route: ActivatedRoute,
    private dashboardService: DashboardService) {
    if (!sessionStorage.getItem("Token")) {
      this.loginService.navigateLigin();
    }
    this.route.params.subscribe(params => {
      this.qdId = params.id;
    }, error => {
      swal("Error", error.text() , "error")
    });

    this._plan._bsa = 250000;
    this._plan._frequance = "Single Premium";
    this._plan._term = 5;
    this.personalInfo._mainlife._mTitle = "MR";
    this.personalInfo._mainlife._mGender = "M";
    this.personalInfo._mainlife._mAge = 18;
    this.personalInfo._mainlife._mSmoking = "No";
    this.personalInfo._mainlife._mOccupation = "285";
    this.personalInfo._spouse._sOccupation = "285";
    this.personalInfo._spouse._sAge = 18;
    this.personalInfo._plan._interestRate = "22";
    this.personalInfo._mainlife._mCivilStatus = "S";
    this.personalInfo._mainlife._mName = "";
    this.personalInfo._mainlife._mNic = "";
    this.personalInfo._spouse._sName = "";
    this.personalInfo._spouse._sNic = "";
  }

  ngOnInit() {
    if (this.qdId != undefined) {
      this.isEditUI = true;
      this.editCal();
    }
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

  setValidity(validity: any) {
    //console.log(validity);
    this.validity = validity;
  }

  onsetBenifMainlifeForm(form) {
    this._mainLifeBenefForm = form;
  }

  onsetBenifSpouseForm(form) {
    this._spouseBenefForm = form;
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

  onSetCalObj(e: any) {
    this._quotationCalculation._personalInfo = e;
    this.sendQuo();
  }

  onSetSpActive(e: any) {
    this.activeSp = e;
  }

  mPreviousSumAtRisk(risk: number) {
    //console.log(risk);
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
    if (this.personalInfo._mainlife._mAge < 66 && this.personalInfo._mainlife._mAge > 17) {
      if (this.activeSp == "1") {
        if (this.personalInfo._spouse._sAge < 66 && this.personalInfo._spouse._sAge > 17) {

        } else {
          swal("Oopz..", "Spouse age must be greater than or equal 18 and less than or equal 65..", "error");
          return;
        }
      }
    } else {
      swal("Oopz..", "Main Life age must be greater than or equal 18 and less than or equal 65..", "error");
      return;
    }
    if (this._quotationCalculation._personalInfo != null) {
      if (this.personalInfo._plan._interestRate != "" && this.personalInfo._plan._interestRate != "0") {
        if (this._plan._bsa >= 250000 && !Number.isNaN(this._plan._bsa)) {
          if (this.personalInfo._plan._term >= 1 && this.personalInfo._plan._term <= 30) {
            document.onkeydown = function (e) { return false; }
            this._quotationCalculation._personalInfo.mPreviousSumAtRisk = this.previousSumMain;
            this._quotationCalculation._personalInfo.sPreviousSumAtRisk = this.previousSumSpouse;
            this.isDisableDiv = true;
            this.saveDtaplQuotationService.getQouCal(this._quotationCalculation).subscribe(response => {
              //console.log(response.json());
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
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
              this.summeryInfo._disablities.TPDDTAPL = response.json().tpddtapl;
              this.summeryInfo._disablities.TPDDTAPLTerm = response.json().tpddtaplTerm;
              this.summeryInfo._disablities.TPDDTASPL = response.json().tpddtaspl;
              this.summeryInfo._disablities.TPDDTASPLTerm = response.json().tpddtasplTerm;
              this.summeryInfo._protection.JLBPL = response.json().jlbpl;
              this.summeryInfo._protection.JLBPLTerm = response.json().jlbplTerm;
              this.summeryInfo._summery.dtaShedules = response.json().dtaShedules;
            }, error => {
              swal("Error", error.text() , "error");
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
            });
          } else {
            swal("Check Form Again", "Term must be greate than or equal 1 and less than or equal 30...", "error");
          }

        } else {
          swal("Check Form Again", "Loan Amount must be greater than 250000...", "error");
        }
      } else {
        swal("Check Form Again", "Interest rate must be greater than 0...", "error");
      }
    }
  }

  save(e: any) {

    //console.log(e);

    if (this.validity == true) {

      if (this.personalInfo._mainlife._mAge < 66 && this.personalInfo._mainlife._mAge > 17) {
        if (this.activeSp == "1") {
          if (this.personalInfo._spouse._sAge < 66 && this.personalInfo._spouse._sAge > 17) {

          } else {
            swal("Oopz..", "Spouse age must be greater than or equal 18 and less than or equal 65..", "error");
            return;
          }
        }
      } else {
        swal("Oopz..", "Main Life age must be greater than or equal 18 and less than or equal 65..", "error");
        return;
      }

      this._invpSaveQuotation._personalInfo = this.personalInfo;
      this._invpSaveQuotation._riderDetails = this.riderDetails;
      this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
      ////console.log(this._invpSaveQuotation);

      if (this.personalInfo._plan._interestRate != "" && this.personalInfo._plan._interestRate != "0") {
        if (this._plan._bsa >= 250000 && !Number.isNaN(this._plan._bsa)) {
          if (this._invpSaveQuotation._personalInfo._mainlife._mAge > 17 && this._invpSaveQuotation._personalInfo._mainlife._mAge < 66) {
            if (this._invpSaveQuotation._personalInfo._plan._term >= 1 && this._invpSaveQuotation._personalInfo._plan._term <= 30) {
              if (this.personalInfo._mainlife._mOccupation != "285") {
                if (this.activeSp == "1") {
                  if (this.personalInfo._spouse._sOccupation != "285") {
                    this.isDisableDiv = true;
                    document.onkeydown = function (e) { return false; }
                    this.saveDtaplQuotationService.saveDta(this._invpSaveQuotation).subscribe(response => {
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
                  this.isDisableDiv = true;
                  document.onkeydown = function (e) { return false; }
                  this.saveDtaplQuotationService.saveDta(this._invpSaveQuotation).subscribe(response => {
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
              swal("Oopz...", "term must be Greater than or Equal 1 and Less than or equal 30", "error");
            }
          } else {
            swal("Oopz...", "Age must be Greater than or Equal 18 and Less than or equal 65", "error");
          }
        } else {
          swal("Check Form Again", "Loan Amount must be greater than 250000...", "error");
        }
      } else {
        swal("Check Form Again", "Interest rate must be greater than 0...", "error");
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
    if (this.validity == true) {
      if (this.activeSp == "2") {
        this.riderDetails._sRiders = null;
      }

      if (this.personalInfo._mainlife._mAge < 66 && this.personalInfo._mainlife._mAge > 17) {
        if (this.activeSp == "1") {
          if (this.personalInfo._spouse._sAge < 66 && this.personalInfo._spouse._sAge > 17) {

          } else {
            swal("Oopz..", "Spouse age must be greater than or equal 18 and less than or equal 65..", "error");
            return;
          }
        }
      } else {
        swal("Oopz..", "Main Life age must be greater than or equal 18 and less than or equal 65..", "error");
        return;
      }
      this._invpSaveQuotation._personalInfo = this.personalInfo;
      this._invpSaveQuotation._riderDetails = this.riderDetails;
      this._invpSaveQuotation._calPersonalInfo = this._quotationCalculation._personalInfo;
      //console.log("a");

      if (this.personalInfo._plan._interestRate != "" && this.personalInfo._plan._interestRate != "0") {
        if (this._plan._bsa >= 250000 && !Number.isNaN(this._plan._bsa)) {
          if (this._invpSaveQuotation._personalInfo._mainlife._mAge > 17 && this._invpSaveQuotation._personalInfo._mainlife._mAge < 66) {
            if (this._invpSaveQuotation._personalInfo._plan._term >= 1 && this._invpSaveQuotation._personalInfo._plan._term <= 30) {
              if (this.personalInfo._mainlife._mOccupation != "285") {
                if (this.activeSp == "1") {
                  if (this.personalInfo._spouse._sOccupation != "285") {
                    this.isDisableDiv = true;
                    document.onkeydown = function (e) { return false; }
                    this.saveDtaplQuotationService.editDtapl(this._invpSaveQuotation, this.qdId).subscribe(response => {
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
                  this.isDisableDiv = true;
                  document.onkeydown = function (e) { return false; }
                  this.saveDtaplQuotationService.editDtapl(this._invpSaveQuotation, this.qdId).subscribe(response => {
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
              swal("Oopz...", "term must be Greater than or Equal 1 and Less than or equal 30", "error");
            }
          } else {
            swal("Oopz...", "Age must be Greater than or Equal 18 and Less than or equal 65", "error");
          }
        } else {
          swal("Check Form Again", "Loan Amount must be greater than 250000...", "error");
        }
      } else {
        swal("Check Form Again", "Interest rate must be greater than 0...", "error");
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
    this.saveDtaplQuotationService.getDtaplQuotationDetailsForEdit(this.qdId).subscribe(response => {

      let phone : string = response.json()._mainlife._mMobile;

      this._mainLife = response.json()._mainlife;
      this._mainLife._mMobile = phone.substr(1,9); 
      this._plan = response.json()._plan;
      this._spouse = response.json()._spouse;

      if (this._spouse._sActive) {
        this.activeSp = "1";
        this.personalInfo._spouse = this._spouse;
      }

      this.personalInfo._mainlife = this._mainLife;
      this.personalInfo._mainlife._mAge = this._mainLife._mAge;
      this.personalInfo._plan = this._plan;
      this.personalInfo._plan._interestRate = this._plan._interestRate;

      this._mainLifeBenefits = response.json()._mainLifeBenefits;
      this._spouseBenefits = response.json()._spouseBenefits;
      this.riderDetails._mRiders = new Array();
      this.riderDetails._sRiders = new Array();
      this.riderDetails._cRiders = new Array();
      this.personalInfo._mainlife._mCivilStatus = this._mainLife._mCivilStatus;
      this._quotationCalculation._personalInfo.bsa = this.personalInfo._plan._bsa;
      this._quotationCalculation._personalInfo.frequance = this.personalInfo._plan._frequance;
      this._quotationCalculation._personalInfo.term = this.personalInfo._plan._term;

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


      for (var q in this._mainLifeBenefits) {

        //console.log(this._mainLifeBenefits[q].benfName);
        switch (this._mainLifeBenefits[q].benfName) {
          case "TPDDTAPL": {
            this.isImgTPDDTAPLGActive = false;
            this.isImgTPDDTAPLActive = true;
            this._mainLifeBenefForm.get("TPDDTAPL").get("isActice").setValue(true);
            this._mainLifeBenefForm.get("TPDDTAPL").get("sumAssured").setValue(this._mainLifeBenefits[q].riderSum);
            this._mainLifeBenefForm.get("TPDDTAPL").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "TPDDTAPL";
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

        //console.log(this._spouseBenefits[q].benfName);
        switch (this._spouseBenefits[q].benfName) {
          case "JLBPL": {
            this.isImgJLBPLGActive = false;
            this.isImgJLBPLActive = true;
            this._spouseBenefForm.get("JLBPL").get("isActice").setValue(true);
            this._spouseBenefForm.get("JLBPL").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("JLBPL").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "JLBPL";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);

            break;
          }
          case "TPDDTASPL": {
            this.isImgTPDDTASPLGActive = false;
            this.isImgTPDDTASPLActive = true;
            this._spouseBenefForm.get("TPDDTASPL").get("isActice").setValue(true);
            this._spouseBenefForm.get("TPDDTASPL").get("sumAssured").setValue(this._spouseBenefits[q].riderSum);
            this._spouseBenefForm.get("TPDDTASPL").get("sumAssured").enable();
            let benifict = new Benifict();
            benifict.active = "true";
            benifict.type = "TPDDTASPL";
            benifict.premium = 0;
            benifict.sumAssured = this._spouseBenefits[q].riderSum;

            this.riderDetails._sRiders.push(benifict);
            break;
          }

          default: {

          }
        }

      }


      this._quotationCalculation._riderDetails = this.riderDetails;

      this.sendQuo();
      this.setValidity(true);

    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }

  clearquo() {
    this.dtaplPersonolInfoComponent.loadDefault();
    this.dtaplBenefictInfoComponent.loadDefault();
  }


  clearbenef(e) {

    this.dtaplBenefictInfoComponent.loadDefaultNew();
    //this.sendQuo();
  }

  clearbenefAll(e) {

    this.dtaplBenefictInfoComponent.loadDefaultBSAChange();
    //this.sendQuo();
  }

  setBsa(e) {
    //console.log(e);
    this._quotationCalculation._personalInfo.bsa = e;
  }

  calPreviousRiskM(e) {
    if(e.length >0){
    this.isDisableDiv = true;
    document.onkeydown = function (e) { return false; }
    this.dashboardService.getSumAtRiskMainLife(e).subscribe(resp => {
      this.isDisableDiv = false;
      this.dtaplPersonolInfoComponent.loadDOBFromNic();
      document.onkeydown = function (e) { return true; }
      if (resp.json()) {
        this.personalInfo._mainlife._mCustomerCode = resp.json().custCode;
      }
      if (resp.json()) {
        this.sumAtRiskMain = resp.json().sumAtRisk;
        this._quotationCalculation._personalInfo.mPreviousSumAtRisk = resp.json().sumAtRisk;
        this.previousSumMain = resp.json().sumAtRisk;
      }else{
        this.previousSumMain = resp.json().sumAtRisk;
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
      this.dtaplPersonolInfoComponent.loadSpouseDOBFromNic();
      document.onkeydown = function (e) { return true; }
      if (resp.json()) {
        this.personalInfo._spouse._sCustomerCode = resp.json().custCode;
      }
      if (resp.json()) {
        this.sumAtRiskSpouse = resp.json().sumAtRisk;
        this._quotationCalculation._personalInfo.sPreviousSumAtRisk = resp.json().sumAtRisk;
        this.previousSumSpouse =  resp.json().sumAtRisk;
      }else{
        this.previousSumSpouse =  0;
      }
      this.sendQuo();
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }
  }
}
