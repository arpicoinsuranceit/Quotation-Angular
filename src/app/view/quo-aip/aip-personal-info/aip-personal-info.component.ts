import swal from 'sweetalert2';
import { Plan } from './../../../model/plan';
import { MainLife } from './../../../model/mainlife';
import { OccupationService } from './../../../service/occupationService';
import { Occupation } from './../../../model/occupation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AgeCalculationService } from '../../../service/agecalculateservice';
import { personalInfo } from '../../../model/personalInfo';
import { Spouse } from '../../../model/spouse';
import { Children } from '../../../model/childeren';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UppercaseDirective } from '../../../direvtives/uppercase.directive';

@Component({
  selector: 'app-aip-personal-info',
  templateUrl: './aip-personal-info.component.html',
  styleUrls: ['./aip-personal-info.component.css']
})
export class AipPersonalInfoComponent implements OnInit {

  @Output() onSetCalObj = new EventEmitter<any>();
  @Output() setValidity = new EventEmitter<any>();

  ocupations: Occupation[];
  @Input() _mainLife = new MainLife;


  mainLifeForm = new FormGroup({
    mTitle: new FormControl(),
    mName: new FormControl('', [Validators.required]),
    mNic: new FormControl('', [Validators.pattern('^\\d{9}[v,V,x,X]{1}$|^\\d{12}$')]),
    mEmail: new FormControl('', Validators.email),
    mGender: new FormControl(),
    mCivilStatus: new FormControl(),
    mDob: new FormControl('', [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\\d\\d$')]),
    mAge: new FormControl('', [Validators.max(66), Validators.min(17)]),
    mSmoking: new FormControl(),
    mMobile: new FormControl('', [Validators.required, Validators.pattern("^\\d{10}")]),
    mOccu: new FormControl()
  });

  constructor(private occupationService: OccupationService,
    private ageCalculationService: AgeCalculationService) { }

  ngOnInit() {
    this._mainLife._mTitle = "MR";
    this._mainLife._mOccupation = "285";
    this._mainLife._mAge = 18;
    this._mainLife._mGender = "M";
    this._mainLife._mSmoking = "No";
    this._mainLife._mCivilStatus = "S";
    this._mainLife._mName = "";
    this._mainLife._mNic = "";



    this.occupationService.loadOccupation().subscribe(response => {
      this.ocupations = response.json();
    },error => {
      swal("Error", "Error code - 101 <br>","error");
    });

    this.check();

  }


  calculateAgeM(e) {
    if (this.mainLifeForm.get("mDob").valid) {
      this.ageCalculationService.loadAge(this._mainLife._mDob).subscribe(response => {
        this._mainLife._mAge = response.json();
        this.check();
      },error => {swal("Error", "Error code - 102 <br>","error")});
    } else {
      swal("Invalid Date Format!", "Example (30-01-1990)", "error");
      this.mainLifeForm.get("mDob").setValue("");
      this.checkValidity();
    }

  }

  check() {
    if ((this._mainLife._mAge != null && this._mainLife._mAge != undefined
      && this._mainLife._mGender != null && this._mainLife._mGender != undefined
      && this._mainLife._mOccupation != null && this._mainLife._mOccupation != undefined)
      || (this._mainLife._mAge != null && this._mainLife._mAge != undefined
        && this._mainLife._mGender != null && this._mainLife._mGender != undefined)) {
      this.onSetCalObj.emit(this._mainLife);
      this.checkValidity();
    }

  }

  keyup(e) {
    document.getElementById(e.target.id).classList.remove("errors");
  }

  resetActivation() {
    this.check();
  }

  loadDOBFromNic(e) {
    if (this._mainLife._mNic != null && this._mainLife._mNic.length > 0) {
      
      this.ageCalculationService.loadAgeAndDOBFromNic(e.target.value).subscribe(response => {
        this._mainLife._mGender = response.json().Gender;
        this._mainLife._mAge = response.json().Age;
        this._mainLife._mDob = response.json().DOB;
        this.mainLifeForm.get("mDob").disable();
        if (this._mainLife._mGender == "F") {
          this._mainLife._mTitle = "MRS"
        } else {
          this._mainLife._mTitle = "MR"
        }
        this.checkValidity();
        this.check();

      },error => {
        swal("Error", "Error code - 105 <br>","error");
      });
    } else {
      this.mainLifeForm.get("mDob").enable();
    }
    //if (this.mainLifeForm.get("mNic").valid && this.mainLifeForm.get("mNic").value != "") {


    //}

  }

  readOnlyDob(){
    this.mainLifeForm.get("mDob").disable();
  }

  checkValidity() {

    if ((this._mainLife._mName != undefined && this._mainLife._mName != "" && this._mainLife._mName.length>0)
      && ((this._mainLife._mDob != undefined && this._mainLife._mDob != "" && this._mainLife._mDob.length>0) || (this._mainLife._mNic != undefined && this._mainLife._mNic != "" && this._mainLife._mNic.length>0))
      && (this._mainLife._mAge != undefined && this._mainLife._mAge != 0) && this._mainLife._mAge < 101 && this._mainLife._mAge > 17
      && this._mainLife._mOccupation != undefined && (this._mainLife._mMobile != undefined && this._mainLife._mMobile != "")) {


        console.log(this._mainLife);

      if (this._mainLife._mEmail != undefined && this._mainLife._mEmail.length > 0) {
        if (this.mainLifeForm.get("mEmail").touched && this.mainLifeForm.get("mEmail").invalid) {

          this.setValidity.emit("txt-email");
          return;
        }
      }

      if (this._mainLife._mNic != undefined && this._mainLife._mNic.length > 0) {
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

    } else {
      if (this._mainLife._mName == undefined || this._mainLife._mName == "") {
        this.setValidity.emit("txt-insuredName");
        return;
      }

      if ((this._mainLife._mDob == undefined || this._mainLife._mDob == "") && (this._mainLife._mNic == undefined || this._mainLife._mNic == "")) {
        this.setValidity.emit("txt-nic");
        return;
      }

      if (this._mainLife._mAge == undefined || this._mainLife._mAge == 0 && this._mainLife._mAge > 101 && this._mainLife._mAge < 17) {
        this.setValidity.emit("txt-age");
        return;
      }

      if (this._mainLife._mMobile == undefined || this._mainLife._mMobile == "") {
        this.setValidity.emit("txt-mobile");
        return;
      }
    }


  }

  setGender() {
    let title = this.mainLifeForm.get("mTitle").value;
    if (title == "MR" || title == "R") {
      this.mainLifeForm.get("mGender").setValue("M");
    }

    if (title == "MS" || title == "MRS" || title == "MIS" || title == "DRMS") {
      this.mainLifeForm.get("mGender").setValue("F");
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

  loadDefault() {
    console.log("Called");
    this._mainLife._mTitle = "MR";
    this._mainLife._mOccupation = "283";
    this._mainLife._mAge = 18;
    this._mainLife._mGender = "M";
    this._mainLife._mSmoking = "No";
    this._mainLife._mDob = "";
    this._mainLife._mEmail = "";
    this._mainLife._mMobile = "";
    this._mainLife._mName = "";
    this._mainLife._mNic = "";

    this.mainLifeForm.reset;

    document.getElementById("date-dob").removeAttribute("readonly");

  }

}
