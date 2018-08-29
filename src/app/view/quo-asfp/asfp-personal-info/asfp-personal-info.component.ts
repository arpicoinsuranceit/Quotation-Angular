import { personalInfo } from './../../../model/personalInfo';
import { Plan } from './../../../model/plan';
import { Occupation } from './../../../model/occupation';
import { MainLife } from './../../../model/mainlife';
import { Spouse } from './../../../model/spouse';
import { OccupationService } from './../../../service/occupationService';
import { SummeryInfo } from './../../../model/summeryInfo';
import { AgeCalculationService } from './../../../service/agecalculateservice';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Children } from './../../../model/childeren';
import swal from 'sweetalert2';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UppercaseDirective } from '../../../direvtives/uppercase.directive';

@Component({
  selector: 'app-asfp-personal-info',
  templateUrl: './asfp-personal-info.component.html',
  styleUrls: ['./asfp-personal-info.component.css']
})
export class AsfpPersonalInfoComponent implements OnInit {

  ocupations: Occupation[];

  _mainLife = new MainLife; //For Mainlife tab
  _spouse = new Spouse;// For Spouse Tab
  @Input() _childrens = new Array<Children>(); // For Child Tab
  _children = new Children();
  _plan = new Plan();
  @Input() _personalInfo = new personalInfo(this._mainLife, this._spouse, this._childrens, this._plan);


  @Input() activeSp = "2";
  @Input() activeCh = "2";


  a = true;
  calObj: any;
  _cActive: boolean;

  @Output() onSet = new EventEmitter<personalInfo>();
  @Output() onSetCalObj = new EventEmitter<any>();

  @Output() onSetSpActive = new EventEmitter<any>();
  @Output() onSetChActive = new EventEmitter<any>();

  @Output() setValidity = new EventEmitter<any>();

  @Input() summeryInfo: SummeryInfo;

  @Output() clearbenef = new EventEmitter<any>();
  @Output() clearbenefAll = new EventEmitter<any>();
  @Output() calPreviousRiskM = new EventEmitter<any>();
  @Output() calPreviousRiskS = new EventEmitter<any>();
  @Output() setBsa = new EventEmitter<any>();

  constructor(private occupationService: OccupationService,
    private ageCalculationService: AgeCalculationService) {

  }

  ngOnInit() {
    this.occupationService.loadOccupation().subscribe(response => {
      this.ocupations = response.json();
    },error => {swal("Error", "Error code - 301 <br>","error")});

    this._personalInfo._plan._msfb = 10000;
    this._personalInfo._plan._frequance = "Monthly";
    this._personalInfo._plan._term = 5;
    this._personalInfo._plan._bsa = 600000;
    this._personalInfo._plan._nomineeName="";
    this._personalInfo._mainlife._mTitle = "MR";
    this._personalInfo._mainlife._mGender = "M";
    this._personalInfo._mainlife._mSmoking = "No";
    this._personalInfo._mainlife._mOccupation = "285";
    this._personalInfo._mainlife._mAge = 18;
    this._personalInfo._mainlife._mCivilStatus = "S";
    this._personalInfo._mainlife._mName = "";
    this._personalInfo._mainlife._mNic = "";
    this._personalInfo._spouse._sName = "";
    this._personalInfo._spouse._sNic = "";
    this._personalInfo._spouse._sOccupation = "285";
    this._children._cTitle = "M";
    this._children._cName = "";
    this._children._cHrbic = false;
    this._children._cHrbfc = false;
    this._children._cSuhrbc = false;
    this._personalInfo._plan._hidbsa = 10000;
    this._personalInfo._plan._nomoneeRelation = "Son";

    this.check();
  }

  mainLifeForm = new FormGroup({
    mTitle: new FormControl(),
    mName: new FormControl('', Validators.required),
    mNic: new FormControl('', Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')),
    mEmail: new FormControl('', Validators.email),
    mGender: new FormControl(),
    mCivilStatus: new FormControl(),
    mDob: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$')]),
    mAge: new FormControl('', [Validators.max(66), Validators.min(17)]),
    mSmoking: new FormControl(),
    mMobile: new FormControl('', [Validators.required, Validators.pattern("^\\d{10}")]),
    mOccu: new FormControl()
  });

  spouseForm = new FormGroup({
    sActive: new FormControl(),
    sTitle: new FormControl(),
    sName: new FormControl('', Validators.required),
    sNic: new FormControl('', Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')),
    sGender: new FormControl(),
    sDob: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$')]),
    sAge: new FormControl('', [Validators.max(66), Validators.min(17)]),
    sSmoking: new FormControl(),
    sOccu: new FormControl()
  });

  resetActivation() {
    this.activeSp = '2';
    this.activeCh = '2';
    this.activeS();
    this.activeC();
    this._personalInfo._spouse._sOccupation = "285";
    this._personalInfo._spouse._sAge = 18;
    this._personalInfo._spouse._sName = "";
    this._personalInfo._spouse._sNic = "";
    this._personalInfo._spouse._sDob = "";
    this._childrens = new Array<Children>();
    this._children._cName = "";

    this.clearbenef.emit(true);
  }


  change(e) {
    if(this._personalInfo._plan._term < 5 || this._personalInfo._plan._term > 40 || Number.isNaN(this._personalInfo._plan._term)){
      swal("Check Form Again", "Term must be greater than 5 and less than 40", "error")
        .then((value) => {
          document.getElementById("txt-term").classList.add("errors");
          document.getElementById("txt-term").focus();

        });
        this._personalInfo._childrenList = this._childrens;
        this.check();
      return;
    }
    this._personalInfo._childrenList = this._childrens;
    this.check();
  }


  regexp = new RegExp('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$');

  nicMain(){
    this.calPreviousRiskM.emit(this._personalInfo._mainlife._mNic);
  }

  nicSpouse(){
    this.calPreviousRiskS.emit(this._personalInfo._spouse._sNic);
  }

  loadDOBFromNic() {

    if (this._personalInfo._mainlife._mNic != null && this._personalInfo._mainlife._mNic.length > 0) {
      this.ageCalculationService.loadAgeAndDOBFromNic(this._personalInfo._mainlife._mNic).subscribe(response => {
        this._personalInfo._mainlife._mGender = response.json().Gender;
        this._personalInfo._mainlife._mAge = response.json().Age;
        this._personalInfo._mainlife._mDob = response.json().DOB;
        this.mainLifeForm.get("mDob").disable();

        if (!this.regexp.test(this._personalInfo._mainlife._mDob)) {
          swal("Invalid Date Format!", "Example (30-01-1990)", "error");
          this.mainLifeForm.get("mDob").setValue("");
          this._personalInfo._mainlife._mAge=18;
          this._personalInfo._mainlife._mNic="";
          this._personalInfo._mainlife._mDob="";
          this.mainLifeForm.get("mDob").enable();
          //return;
        }else{
          if (this._personalInfo._mainlife._mGender == "F") {
            this._personalInfo._mainlife._mTitle = "MRS"
          } else {
            this._personalInfo._mainlife._mTitle = "MR"
          }
          //this.calPreviousRiskM.emit(this._personalInfo._mainlife._mNic);
        }

        this.checkValidity();
        this.check();

      },error => {swal("Error", "Error code - 305 <br>","error")});

    } else {
      this.mainLifeForm.get("mDob").enable();
    }

  }


  loadSpouseDOBFromNic() {
    if (this._personalInfo._spouse._sNic != null && this._personalInfo._spouse._sNic.length > 0) {
      this.ageCalculationService.loadAgeAndDOBFromNic(this._personalInfo._spouse._sNic).subscribe(response => {
        if (this._personalInfo._mainlife._mNic != undefined) {

          if (this._personalInfo._mainlife._mGender == response.json().Gender) {
            if (this._personalInfo._mainlife._mGender == "M") {
              swal("Spouse Can not be Male.", "", "error").then((value) => {
                this._personalInfo._spouse._sNic = "";
                document.getElementById("txt-snic").classList.add("errors");
                document.getElementById("txt-snic").focus();
                this._personalInfo._spouse._sTitle = "MRS";
              });
            }
            if (this._personalInfo._mainlife._mGender == "F") {
              swal("Spouse Can not be Female.", "", "error").then((value) => {
                this._personalInfo._spouse._sNic = "";
                document.getElementById("txt-snic").classList.add("errors");
                document.getElementById("txt-snic").focus();
                this._personalInfo._spouse._sTitle = "MR";
              });
            }
            return;
          } else {
            this._personalInfo._spouse._sGender = response.json().Gender;
            this._personalInfo._spouse._sAge = response.json().Age;
            this._personalInfo._spouse._sDob = response.json().DOB;
            this.spouseForm.get("sDob").disable();

            if (!this.regexp.test(this._personalInfo._spouse._sDob)) {
              swal("Invalid Date Format!", "Example (30-01-1990)", "error");
              this.spouseForm.get("sDob").setValue("");
              this._personalInfo._spouse._sAge=18;
              this._personalInfo._spouse._sNic="";
              this._personalInfo._spouse._sDob="";
              this.spouseForm.get("sDob").enable();

            } else {
              if (this._personalInfo._spouse._sGender == "F") {
                this._personalInfo._spouse._sTitle = "MRS"
              } else {
                this._personalInfo._spouse._sTitle = "MR"
              }
  
             // this.calPreviousRiskS.emit(this._personalInfo._spouse._sNic);
            }
            

          }
        }

      },error => {swal("Error", "Error code - 306 <br>","error")});
      this.checkValidity();
    } else {
      this.spouseForm.get("sDob").enable();
    }
  }

  readOnlyDob() {
    this.mainLifeForm.get("mDob").disable();
  }

  readOnlyDobS() {
    this.spouseForm.get("sDob").disable();
  }


  addChild(e) {
    if (this._childrens.length < 6) {
      let child = new Children;
      child._cActive = true;
      child._cTitle = this._children._cTitle;
      child._cAge = this._children._cAge;
      child._cCibc = this._children._cCibc;
      child._cDob = this._children._cDob;
      child._cHbc = this._children._cHbc;
      child._cName = this._children._cName;
      child._cHcbc = this._children._cHcbc;

      if (child._cName != undefined && child._cName != "" && child._cTitle != undefined && child._cAge != undefined && child._cDob != undefined) {
        if (child._cAge >= 1 && child._cAge <= 18) {
          /*if (child._cAge < 3) {
            swal("", "CIBC can't get for this child", "warning");
          }*/
          //console.log(this._children._cCibc);
          //console.log(this._children._cHbc);
          //console.log(this._children._cHcbc);

          this._childrens.push(child);
          this._children = new Children();
          this._children._cTitle = "M";
          this._personalInfo._childrenList = this._childrens;
          this.check();
        } else {
          swal("Oopz..", "Child age must be less than 18 and greater than 1", "error");
        }

      } else {
        if (child._cTitle == undefined) {
          document.getElementById("selectOTitle").focus();
          swal("Check Children Form Again", "Fill all required details..", "error");
          return;
        }
        if (child._cName == undefined || child._cName == "") {
          document.getElementById("txt-childName").focus();
          swal("Check Children Form Again", "Fill all required details..", "error");
          return;
        }
        if (child._cAge == undefined) {
          document.getElementById("date-cdob").focus();
          swal("Check Children Form Again", "Fill all required details..", "error");
          return;
        }
      }

    } else {
      swal("Children count has limited..!");
      this._children._cTitle = "M";
      this._children._cName = "";
      this._children._cDob = "";
      this._children._cAge = 1;
      this._children._cCibc = false;
      this._children._cHbc = false;
      this._children._cHcbc = false;
    }

  }

  onRemove(e, child) {
    let index = this._childrens.indexOf(child);
    this._childrens.splice(index, 1);
    this.change(new Event("e"));
  }
  removeChild(e) {
    this._childrens = new Array<Children>();
    this.change("e");
  }
  checkSp() {

    if (this._personalInfo._spouse._sDob != null && this._personalInfo._spouse._sDob != undefined
      && this._personalInfo._spouse._sGender != null && this._personalInfo._spouse._sGender != undefined
      && this._personalInfo._spouse._sOccupation != null && this._personalInfo._spouse._sOccupation != undefined) {

      this.check();
    }
  }

  checkBSA() {
    if (this._personalInfo._plan._msfb < 5000 || Number.isNaN(this._personalInfo._plan._msfb)) {

      if(Number.isNaN(this._personalInfo._plan._msfb)){
        this._personalInfo._plan._msfb=0;
      }


      swal("Check Form Again", "MSFB must be greater than 5000...", "error")
        .then((value) => {
          document.getElementById("txt-msfb").classList.add("errors");
          document.getElementById("txt-msfb").focus();

        });
        this.check();
      return;
    }

    if (this._personalInfo._plan._msfb != this._personalInfo._plan._hidbsa) {
      this._personalInfo._plan._hidbsa = this._personalInfo._plan._msfb;
      this._childrens.forEach(e => {
        e._cHbc = false;
        e._cHcbc = false;
        e._cHrbc = false;
        e._cHrbfc = false;
        e._cHrbic = false;
        e._cShcbfc = false;
        e._cCibc = false;
      });
      this.check(); 
      this.clearbenefAll.emit(true);
    } else {
    }
  }


  check() {

    if ((this._personalInfo._mainlife._mAge != null && this._personalInfo._mainlife._mAge != undefined
      && this._personalInfo._mainlife._mGender != null && this._personalInfo._mainlife._mGender != undefined
      && this._personalInfo._mainlife._mOccupation != null && this._personalInfo._mainlife._mOccupation != undefined)
      || (this._personalInfo._mainlife._mAge != null && this._personalInfo._mainlife._mAge != undefined
        && this._personalInfo._mainlife._mGender != null && this._personalInfo._mainlife._mGender != undefined)) {

      if (this.activeSp == "1") {

        if ((this._personalInfo._spouse._sAge != null && this._personalInfo._spouse._sAge != undefined
          && this._personalInfo._spouse._sGender != null && this._personalInfo._spouse._sGender != undefined
          && this._personalInfo._spouse._sOccupation != null && this._personalInfo._spouse._sOccupation != undefined)
          || (this._personalInfo._spouse._sAge != null && this._personalInfo._spouse._sAge != undefined
            && this._personalInfo._spouse._sGender != null && this._personalInfo._spouse._sGender != undefined)) {

          if (this._personalInfo._childrenList.length > 0) {
            this.calObj = {
              mage: this._personalInfo._mainlife._mAge,
              mgenger: this._personalInfo._mainlife._mGender,
              mocu: this._personalInfo._mainlife._mOccupation,
              sage: this._personalInfo._spouse._sAge,
              sgenger: this._personalInfo._spouse._sGender,
              socu: this._personalInfo._spouse._sOccupation,
              childrens: this._personalInfo._childrenList,
              bsa: this._personalInfo._plan._bsa,
              msfb: this._personalInfo._plan._msfb,
              term: this._personalInfo._plan._term,
              frequance: this._personalInfo._plan._frequance
            }

          } else {
            this.calObj = {
              mage: this._personalInfo._mainlife._mAge,
              mgenger: this._personalInfo._mainlife._mGender,
              mocu: this._personalInfo._mainlife._mOccupation,
              sage: this._personalInfo._spouse._sAge,
              sgenger: this._personalInfo._spouse._sGender,
              socu: this._personalInfo._spouse._sOccupation,
              bsa: this._personalInfo._plan._bsa,
              msfb: this._personalInfo._plan._msfb,
              term: this._personalInfo._plan._term,
              frequance: this._personalInfo._plan._frequance

            }

          }

        }

      } else {
        if (this._personalInfo._childrenList.length > 0) {
          this.calObj = {
            mage: this._personalInfo._mainlife._mAge,
            mgenger: this._personalInfo._mainlife._mGender,
            mocu: this._personalInfo._mainlife._mOccupation,
            childrens: this._personalInfo._childrenList,
            bsa: this._personalInfo._plan._bsa,
            msfb: this._personalInfo._plan._msfb,
            term: this._personalInfo._plan._term,
            frequance: this._personalInfo._plan._frequance
          }

        } else {
         // alert(this._personalInfo._plan._bsa);
          this.calObj = {
            mage: this._personalInfo._mainlife._mAge,
            mgenger: this._personalInfo._mainlife._mGender,
            mocu: this._personalInfo._mainlife._mOccupation,
            msfb: this._personalInfo._plan._msfb,
            bsa: this._personalInfo._plan._bsa,
            term: this._personalInfo._plan._term,
            frequance: this._personalInfo._plan._frequance
          }

        }
      }


    } else {
      this.calObj = null;
    }

    this.onSetCalObj.emit(this.calObj);
    this.checkValidity();
  }

  keyup(e) {
    document.getElementById(e.target.id).classList.remove("errors");
  }

  checkValidity(){
    if(this.calObj!=null){
      this.onSet.emit(this._personalInfo);
    }

    if(this.activeSp == "1"){
      if((this._personalInfo._mainlife._mName != undefined && this._personalInfo._mainlife._mName != "") && 
      ((this._personalInfo._mainlife._mDob != undefined && this._personalInfo._mainlife._mDob != "") || (this._personalInfo._mainlife._mNic != undefined && this._personalInfo._mainlife._mNic != "")) && 
      (this._personalInfo._mainlife._mAge != undefined && this._personalInfo._mainlife._mAge != 0) && 
     this._personalInfo._mainlife._mOccupation != undefined && 
     (this._personalInfo._mainlife._mMobile != undefined && this._personalInfo._mainlife._mMobile != "") && 
     (this._personalInfo._spouse._sName != undefined && this._personalInfo._spouse._sName != "") && 
     ((this._personalInfo._spouse._sDob != undefined && this._personalInfo._spouse._sDob != "") || (this._personalInfo._spouse._sNic != undefined && this._personalInfo._spouse._sNic != "")) && 
     (this._personalInfo._spouse._sAge != undefined && this._personalInfo._spouse._sAge != 0) && 
     this._personalInfo._spouse._sOccupation != undefined && 
    this._personalInfo._plan._nomineeName != undefined && this._personalInfo._plan._nomineeName != "" &&
    this._personalInfo._plan._nomineedob != undefined && this._personalInfo._plan._nomineedob != "" &&
    this._personalInfo._plan._nomineeAge != undefined && this._personalInfo._plan._nomineeAge != 0){

      

        if (this._personalInfo._mainlife._mEmail != undefined && this._personalInfo._mainlife._mEmail.length > 0) {
          if (this.mainLifeForm.get("mEmail").touched && this.mainLifeForm.get("mEmail").invalid) {

            this.setValidity.emit("txt-email");
            return;
          }
        }

        if (this._personalInfo._mainlife._mNic != undefined && this._personalInfo._mainlife._mNic.length > 0) {
          if (this.mainLifeForm.get("mNic").touched && this.mainLifeForm.get("mNic").invalid) {

            this.setValidity.emit("txt-nic");
            return;
          }
        }

        if (this._personalInfo._spouse._sNic != undefined && this._personalInfo._spouse._sNic.length > 0) {
          if (this.spouseForm.get("sNic").touched && this.spouseForm.get("sNic").invalid) {

            this.setValidity.emit("txt-snic");
            return;
          }
        }

        if (this.mainLifeForm.get("mMobile").invalid) {
          this.setValidity.emit("txt-mobile");
          return;
        } else {
          this.setValidity.emit(true);
          return;
        }

      }else{
        if(this._personalInfo._mainlife._mName == undefined || this._personalInfo._mainlife._mName == ""){
          this.setValidity.emit("txt-insuredName");
          return;
        }

        if((this._personalInfo._mainlife._mDob == undefined || this._personalInfo._mainlife._mDob == "") && (this._personalInfo._mainlife._mNic == undefined || this._personalInfo._mainlife._mNic == "")){
          this.setValidity.emit("txt-nic");
          return;
        }

        if(this._personalInfo._mainlife._mAge == undefined){
          this.setValidity.emit("txt-age");
          return;
        }

        if (this._personalInfo._mainlife._mMobile == undefined || this._personalInfo._mainlife._mMobile == "") {
          this.setValidity.emit("txt-mobile");
          return;
        }

        if(this._personalInfo._spouse._sName == undefined || this._personalInfo._spouse._sName == ""){
          this.setValidity.emit("txt-spouseName");
          return;
        }

        if((this._personalInfo._spouse._sDob == undefined || this._personalInfo._spouse._sDob == "") && (this._personalInfo._spouse._sNic == undefined || this._personalInfo._spouse._sNic == "")){
          this.setValidity.emit("txt-snic");
          return; 
        }

        if(this._personalInfo._spouse._sAge == undefined){
          this.setValidity.emit("txt-sage");
          return;
        }

        if(this._personalInfo._plan._nomineeName == undefined || this._personalInfo._plan._nomineeName == ""){
          this.setValidity.emit("txt-nName");
          return;
        }

        if((this._personalInfo._plan._nomineedob == undefined || this._personalInfo._plan._nomineedob == "")){
          this.setValidity.emit("date-ndob");
          return; 
        }

        if(this._personalInfo._plan._nomineeAge == undefined){
          this.setValidity.emit("txt-nAge");
          return;
        }
      }
    }else{
      if((this._personalInfo._mainlife._mName != undefined && this._personalInfo._mainlife._mName != "") && 
      ((this._personalInfo._mainlife._mDob != undefined && this._personalInfo._mainlife._mDob != "") || (this._personalInfo._mainlife._mNic != undefined && this._personalInfo._mainlife._mNic != "")) && 
      (this._personalInfo._mainlife._mAge != undefined && this._personalInfo._mainlife._mAge != 0) && 
     this._personalInfo._mainlife._mOccupation != undefined && 
     (this._personalInfo._mainlife._mMobile != undefined && this._personalInfo._mainlife._mMobile != "")&&
     this._personalInfo._plan._nomineeName != undefined && this._personalInfo._plan._nomineeName != "" &&
     this._personalInfo._plan._nomineedob != undefined && this._personalInfo._plan._nomineedob != "" &&
     this._personalInfo._plan._nomineeAge != undefined && this._personalInfo._plan._nomineeAge != 0){
        if (this._personalInfo._mainlife._mEmail != undefined && this._personalInfo._mainlife._mEmail.length > 0) {
          if (this.mainLifeForm.get("mEmail").touched && this.mainLifeForm.get("mEmail").invalid) {
  
            this.setValidity.emit("txt-email");
            return;
          }
        }
  
        if (this._personalInfo._mainlife._mNic != undefined && this._personalInfo._mainlife._mNic.length > 0) {
          if (this.mainLifeForm.get("mNic").touched && this.mainLifeForm.get("mNic").invalid) {
  
            this.setValidity.emit("txt-nic");
            return;
          }
        }
  
        if (this.mainLifeForm.get("mMobile").invalid) {
          this.setValidity.emit("txt-mobile");
          return;
        } else {
          this.setValidity.emit(true);
          return;
        }

      }else{
        if(this._personalInfo._mainlife._mName == undefined || this._personalInfo._mainlife._mName == ""){
          this.setValidity.emit("txt-insuredName");
          return;
        }

        if((this._personalInfo._mainlife._mDob == undefined || this._personalInfo._mainlife._mDob == "") && (this._personalInfo._mainlife._mNic == undefined || this._personalInfo._mainlife._mNic == "")){
          this.setValidity.emit("txt-nic");
          return;
        }

        if(this._personalInfo._mainlife._mAge == undefined){
          this.setValidity.emit("txt-age");
          return;
        }

        if (this._personalInfo._mainlife._mMobile == undefined || this._personalInfo._mainlife._mMobile == "") {
          this.setValidity.emit("txt-mobile");
          return;
        }

        if(this._personalInfo._plan._nomineeName == undefined || this._personalInfo._plan._nomineeName == ""){
          this.setValidity.emit("txt-nName");
          return;
        }

        if((this._personalInfo._plan._nomineedob == undefined || this._personalInfo._plan._nomineedob == "")){
          this.setValidity.emit("date-ndob");
          return; 
        }

        if(this._personalInfo._plan._nomineeAge == undefined){
          this.setValidity.emit("txt-nAge");
          return;
        }
      }
    }
    
  }


  activeS() {

    console.log(this.activeSp + " sdsds" );

    if (this.activeSp == "1") {
      this._personalInfo._spouse._sActive = true;
      this._personalInfo._spouse._sSmoking = "No";
      if (this.mainLifeForm.get("mGender").value == "F") {
        this._personalInfo._spouse._sGender = "M";
        this._personalInfo._spouse._sTitle = "MR";
      } else {
        this._personalInfo._spouse._sGender = "F";
        this._personalInfo._spouse._sTitle = "MRS";
      }

      this.onSetSpActive.emit("1");
      this.checkValidity();
      this.check();
    } else {
      this._personalInfo._spouse._sActive = false;
      this.onSetSpActive.emit("2");
      this.checkValidity();
    }

  }
  
  activeC() {

    if (this.activeCh == "1") {
      this.onSetChActive.emit("1");
    } else {
      this.onSetChActive.emit("2");
    }
  }

  calculateAgeS(e) {
    if (this.spouseForm.get("sDob").valid) {
      this.ageCalculationService.loadAge(this._personalInfo._spouse._sDob).subscribe(response => {
        this._personalInfo._spouse._sAge = response.json();
        this.check();
      },error => {swal("Error", "Error code - 303 <br>","error")});
    } else {
      swal("Invalid Date Format!", "Example (30-01-1990)", "error");
      this.spouseForm.get("sDob").setValue("");
      this.checkValidity();
    }
  }

  calculateAgeM(e) {
    if (this.mainLifeForm.get("mDob").valid) {
      this.ageCalculationService.loadAge(this._personalInfo._mainlife._mDob).subscribe(response => {
        this._personalInfo._mainlife._mAge = response.json();
        this.check();
      },error => {swal("Error", "Error code - 302 <br>","error")});
    } else {
      swal("Invalid Date Format!", "Example (30-01-1990)", "error");
      this.mainLifeForm.get("mDob").setValue("");
      this.checkValidity();
    }

  }

  calculateAgeC() {

    let regex=new RegExp('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$');
    if(regex.test(this._children._cDob)){
      this.ageCalculationService.loadAge(this._children._cDob).subscribe(response => {
        this._children._cAge = response.json();
      },error => {swal("Error", "Error code - 304 <br>","error")});
    }else{
      swal("Invalid Date Format!", "Example (30-01-1990)", "error");
      this._children._cDob = "";
      this.checkValidity();
    }
    
  }

  calculateAgeN() {

    let regex=new RegExp('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$');
    if(regex.test(this._personalInfo._plan._nomineedob)){
      this.ageCalculationService.loadAgeNominee(this._personalInfo._plan._nomineedob).subscribe(response => {
        this._personalInfo._plan._nomineeAge = response.json();
      },error => {swal("Error", "Error code - 307 <br>","error")});
    }else{
      swal("Invalid Date Format!", "Example (30-01-1990)", "error");
      this._children._cDob = "";
    }
    
  }

  checkChildCibcActive() {
    if (this._children._cCibc) {
      return this._children._cAge <= 3 && this._children._cAge >= 18;
    }
    return false;
  }

  setGender() {
    let title = this.mainLifeForm.get("mTitle").value;
    if (title == "MR" || title == "DR") {
      this.mainLifeForm.get("mGender").setValue("M");
      this.activeS();
    }

    if (title == "MS" || title == "MRS" || title == "MIS" || title == "DRMS") {
      this.mainLifeForm.get("mGender").setValue("F");
      this.activeS();
    }

    this.check();
    this.activeS();
  }

  checkTitle() {
    let gender = this.spouseForm.get("sGender").value;

    let title = this.spouseForm.get("sTitle").value;
    if (gender == "M" && (title == "MR" || title == "DR")) {

    }
    else if (gender == "F" && (title == "MS" || title == "MRS" || title == "MIS" || title == "DRMS")) {

    } else {
      this.spouseForm.get("sTitle").reset();
      swal("Error!", "Title not match with gender!", "error");
    }
    this.check();
  }

  canChangeGender() {
    let title = this.mainLifeForm.get("mTitle").value;
    if (title == "REV" || title == "VEN") {
      return true;
    } else {
      return false;
    }

  }


  loadDefault(){

    this._personalInfo._plan._bsa = 600000;
    this._personalInfo._plan._frequance = "Monthly";
    this._personalInfo._plan._term = 10;

    this._personalInfo._mainlife._mTitle = "MR";
    this._personalInfo._mainlife._mGender = "M";
    this._personalInfo._mainlife._mAge = 18;
    this._personalInfo._mainlife._mSmoking = "No";
    this._personalInfo._mainlife._mOccupation = "283";
    this._personalInfo._mainlife._mDob="";
    this._personalInfo._mainlife._mEmail="";
    this._personalInfo._mainlife._mMobile="";
    this._personalInfo._mainlife._mName="";
    this._personalInfo._mainlife._mNic="";
    this._personalInfo._mainlife._mCivilStatus="S";

    this._personalInfo._spouse._sOccupation = "283";
    this._personalInfo._spouse._sAge = 18;
    this._personalInfo._spouse._sActive= false;
    this._personalInfo._spouse._sDob="";
    this._personalInfo._spouse._sName="";
    this._personalInfo._spouse._sNic="";
    this._childrens = new Array<Children>();

    this.activeSp = "2";
    this.activeCh = "2";
    if(this._personalInfo._mainlife._mNic.length > 0){
      document.getElementById("date-dob").removeAttribute("readonly");
    }
    if(this._personalInfo._spouse._sNic.length > 0){
      document.getElementById("date-sdob").removeAttribute("readonly");
    }
    this.check();
  }

}
