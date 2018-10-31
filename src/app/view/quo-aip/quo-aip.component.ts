import { AibSummery } from './../../model/quoCal';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { LoginService } from './../../service/login.service';
import { AipPlanInfoComponent } from './aip-plan-info/aip-plan-info.component';
import { AipPersonalInfoComponent } from './aip-personal-info/aip-personal-info.component';
import { ActivatedRoute } from '@angular/router/';
import swal from 'sweetalert2';
import { QuoAipService } from './../../service/quo-aip/quo-aip.service';
import { QuoAipReq } from './../../model/qupaipreq';
import { MainLife } from './../../model/mainlife';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanAip, Plan } from '../../model/plan';
import { Spouse } from '../../model/spouse';
import { personalInfo } from '../../model/personalInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quo-aip',
  templateUrl: './quo-aip.component.html',
  styleUrls: ['./quo-aip.component.css']
})

export class QuoAipComponent implements OnInit {

  @ViewChild(AipPersonalInfoComponent) aipPersonalInfoComponent: AipPersonalInfoComponent;
  @ViewChild(AipPlanInfoComponent) aipPlanInfoComponent: AipPlanInfoComponent;

  clear = true;

  qdId: number;
  isEditUI: boolean = false;

  _plan = new PlanAip();
  _mainLife = new MainLife();
  _quoCalReq = new QuoAipReq(this._mainLife, this._plan);


  _planCommon = new Plan();
  _spouse: Spouse = undefined;
  _childrenList = undefined;

  personalInfomation: personalInfo = new personalInfo(this._mainLife, this._spouse, this._childrenList, this._planCommon);

  _aibSummery: AibSummery = new AibSummery();
  total: number = 0;

  validity: any = false;

  isDisableDiv = false;

  constructor(private loginService: LoginService, private quoAipService: QuoAipService, private router: Router, private route: ActivatedRoute,
    private dashboardService: DashboardService) {
    if (!sessionStorage.getItem("Token")) {
      this.loginService.navigateLigin();
    }

    this.route.params.subscribe(params => {
      this.qdId = params.id;
    },error => {
      swal("Error", error.text() ,"error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });

    this._aibSummery.extraOe = 0;
    this._aibSummery.maturaty = 0;
    this._aibSummery.maturaty10 = 0;
    this._aibSummery.maturaty12 = 0;
    this._mainLife._mTitle = "MR";
    this._mainLife._mOccupation = "285";
    this._mainLife._mAge = 18;
    this._mainLife._mGender = "M";
    this._mainLife._mSmoking = "No";
    this._mainLife._mCivilStatus = "S";
    this._mainLife._mName = "";
    this._mainLife._mNic = "";
    this._plan._frequance = "Monthly";
    this._plan._contribution = 3000;
    this._plan._term = 10;
  }

  ngOnInit() {
    if (this.qdId != undefined) {
      this.isEditUI = true;
      this.editCal();
    }
  }

  onSetCalObj(a: any) {
    this._quoCalReq.mainLife = a;
    this.calculateAIP();
  }

  setClear(e) {
    this.aipPersonalInfoComponent.loadDefault();
    this.aipPlanInfoComponent.setDefault();
  }

  setValidity(validity: any) {
    this.validity = validity;
  }

  onSetPlanInfo(a: any) {
    this._plan = a;
  }
  onSetPlanCal(a: any) {
    this._plan = a;
    this._planCommon._bsa = this._plan._contribution;
    this._planCommon._frequance = this._plan._frequance;
    this._planCommon._term = this._plan._term;
    //alert("called");
    //alert(this._planCommon._term);
    this.calculateAIP();
  }

  calculateAIP() {
    //alert(this._plan._term);
    if(this._plan._frequance == "Single Premium"){
      if(this._mainLife._mAge > 17 && this._mainLife._mAge < 71){
        ////console.log(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()));
        if(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()) < 76){
          if(this._mainLife._mAge > 45){
            
            if(this._plan._contribution < 100000){
              this._plan._contribution=100000;
              this._planCommon._bsa=100000;
            }

          }else if(this._mainLife._mAge < 46){

            if(this._plan._contribution < 50000){
              this._plan._contribution=50000;
              this._planCommon._bsa=50000;
            }
            
          }
          
        }else{
          swal("Opzz", " Age + Term must be Less than or Equal 75 ", "error");
          return;
        }
      }else{
        swal("Opzz", " Age must be Greater than or Equal 18 and Less than or equal 70 Because frequency is Single Premium ", "error");
        return;
      }
    }else{
      if(this._mainLife._mAge > 17 && this._mainLife._mAge < 66){
        ////console.log(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()));
        if(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()) < 76){
          if(this._plan._term < 10){
            swal("Opzz", " Term must be Greater than or Equal 10 , Because frequency is "+ this._plan._frequance , "error");
            return;
          }
          
        }else{
          swal("Opzz", " Age + Term must be Less than or Equal 75 ", "error");
          return;
        }
      }else{
        swal("Opzz", " Age must be Greater than or Equal 18 and Less than or equal 65 , Because frequency is "+ this._plan._frequance , "error");
        return;
      }
    }

    if (this._plan._term >= 5 && !Number.isNaN(this._plan._term)) {
      if (this._plan._contribution >= 3000 && !Number.isNaN(this._plan._contribution)) {
        if (this._mainLife._mAge > 17 && this._mainLife._mAge < 101) {
          this._planCommon.age = this._mainLife._mAge;
          if (this._planCommon._bsa != null && this._planCommon._bsa != undefined &&
            this._planCommon._frequance != null && this._planCommon._frequance != undefined &&
            this._planCommon._term != null && this._planCommon._term != undefined) {
            ////console.log(this._planCommon);
            document.onkeydown = function (e) { return false; }
            this.isDisableDiv = true;
            this.quoAipService.getQouCal(this._planCommon).subscribe(response => {
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
             // //console.log(response.json());

              if (response.json().errorExist) {
                swal("Error", response.json().error, "error")
              } else {
                this._aibSummery = response.json();
                let a: number = this._plan._contribution;
                this._plan._term=this._planCommon._term;
                this.total = parseFloat(this._aibSummery.extraOe.toString()) + parseFloat(a.toString());
              }
            },error => {
              swal("Error", error.text() ,"error");
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
            });

          }
        } else {
          swal("Opzz", "Age must be Greater than or Equal 18 and Less than or equal 100", "error");
        }

      } else {
        swal("Opzz", "Contribution must be greater than or equal Rs.3000", "error");
      }
    } else {
      swal("Opzz", "Term must be greater than or equal 5", "error");
    }
  }

  save(e: any) {
    if (this.validity == true) {
      this.personalInfomation._mainlife = this._quoCalReq.mainLife;
      this.personalInfomation._plan = this._planCommon;

      if(this._plan._frequance == "Single Premium"){
        if(this._mainLife._mAge > 17 && this._mainLife._mAge < 71){
          ////console.log(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()));
          if(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()) < 76){
            if(this._mainLife._mAge > 45){
              
              if(this._plan._contribution < 100000){
                this._plan._contribution=100000;
                this._planCommon._bsa=100000;
              }
  
            }else if(this._mainLife._mAge < 46){
  
              if(this._plan._contribution < 50000){
                this._plan._contribution=50000;
                this._planCommon._bsa=50000;
              }
              
            }
            
          }else{
            swal("Opzz", " Age + Term must be Less than or Equal 75 , Because frequency is Single Premium ", "error");
            return;
          }
        }else{
          swal("Opzz", " Age must be Greater than or Equal 18 and Less than or equal 70 Because frequency is Single Premium ", "error");
          return;
        }
      }else{
        if(this._mainLife._mAge > 17 && this._mainLife._mAge < 66){
          ////console.log(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()));
          if(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()) < 76){
            if(this._plan._term < 10){
              swal("Opzz", " Term must be Greater than or Equal 10 , Because frequency is "+ this._plan._frequance , "error");
              return;
            }
            
          }else{
            swal("Opzz", " Age + Term must be Less than or Equal 75 ", "error");
            return;
          }
        }else{
          swal("Opzz", " Age must be Greater than or Equal 18 and Less than or equal 65 , Because frequency is "+ this._plan._frequance , "error");
          return;
        }
      }

      if (this._plan._term >= 5 && !Number.isNaN(this._plan._term)) {
        if (this._plan._contribution >= 3000 && !Number.isNaN(this._plan._contribution)) {
          if (this._mainLife._mAge > 17 && this._mainLife._mAge < 101) {
            this._planCommon.age = this._mainLife._mAge;
            if (this._mainLife._mOccupation != "285") {
              this.isDisableDiv = true;
              document.onkeydown = function (e) { return false; }
              this.quoAipService.saveQuo(this.personalInfomation).subscribe(response => {
                document.onkeydown = function (e) { return true; }
                this.isDisableDiv = false;
                if (response.json().status == "Success") {
                  swal("Success", "Quotation has been saved Successfully <br> Quotation No : " + response.json().code, "success");
                  this.router.navigate(['/loadQuo']);
                }
                else {
                  swal("Oopz...", response.json().status, "error");

                }
              },error => {
                swal("Error", error.text() ,"error");
                document.onkeydown = function (e) { return true; }
                this.isDisableDiv = false;
              });

            } else {
              swal("Oopz..", "Please select an occupation for main life..", "error");
            }

          } else {
            swal("Opzz", "Age must be Greater than or Equal 18 and Less than or equal 75", "error");
          }

        } else {
          swal("Opzz", "Contribution must be greater than or equal Rs.3000", "error");
        }
      } else {
        swal("Opzz", "Term must be greater than or equal 5", "error");
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

  editCal() {
    this.quoAipService.getAipQuotationDetailsForEdit(this.qdId).subscribe(response => {
      //console.log(response.json());

      let phone : string = response.json()._mainlife._mMobile;

      this._mainLife = response.json()._mainlife;
      this._mainLife._mMobile = phone.substr(1,9); 
      this._quoCalReq.mainLife = this._mainLife;
      this.personalInfomation._mainlife = this._mainLife;
      this.personalInfomation._mainlife._mCivilStatus = this._mainLife._mCivilStatus;
      this._plan._contribution = response.json()._plan.contribution;
      this._plan._frequance = response.json()._plan._frequance;
      this._plan._term = response.json()._plan._term;

      this._planCommon._bsa = this._plan._contribution;
      this._planCommon._frequance = this._plan._frequance;
      this._planCommon._term = this._plan._term;

      this.validity = true;

      if (this._mainLife._mNic != null && (this._mainLife._mNic.length > 0 || this._mainLife._mNic != "")) {
        this.aipPersonalInfoComponent.readOnlyDob();
      }

      this.calculateAIP();
    },error => {
      swal("Error", error.text() ,"error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }

  edit(e: any) {
    if (this.validity == true) {
      ////console.log("called");

      if(this._plan._frequance == "Single Premium"){
        if(this._mainLife._mAge > 17 && this._mainLife._mAge < 71){
          ////console.log(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()));
          if(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()) < 76){
            if(this._mainLife._mAge > 45){
              
              if(this._plan._contribution < 100000){
                this._plan._contribution=100000;
                this._planCommon._bsa=100000;
              }
  
            }else if(this._mainLife._mAge < 46){
  
              if(this._plan._contribution < 50000){
                this._plan._contribution=50000;
                this._planCommon._bsa=50000;
              }
              
            }
            
          }else{
            swal("Opzz", " Age + Term must be Greater than or Equal 75 , Because frequency is Single Premium ", "error");
            return;
          }
        }else{
          swal("Opzz", " Age must be Greater than or Equal 18 and Less than or equal 70 Because frequency is Single Premium ", "error");
          return;
        }
      }else{
        if(this._mainLife._mAge > 17 && this._mainLife._mAge < 66){
          ////console.log(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()));
          if(parseInt(this._plan._term.toString()) + parseInt(this._mainLife._mAge.toString()) < 76){
            if(this._plan._term < 10){
              swal("Opzz", " Term must be Greater than or Equal 10 , Because frequency is "+ this._plan._frequance , "error");
              return;
            }
            
          }else{
            swal("Opzz", " Age + Term must be Greater than or Equal 75 ", "error");
            return;
          }
        }else{
          swal("Opzz", " Age must be Greater than or Equal 18 and Less than or equal 65 , Because frequency is "+ this._plan._frequance , "error");
          return;
        }
      }

      if (this._plan._term >= 5 && !Number.isNaN(this._plan._term)) {
        if (this._plan._contribution >= 3000 && !Number.isNaN(this._plan._contribution)) {
          if (this._mainLife._mAge > 17 && this._mainLife._mAge < 101) {
            this._planCommon.age = this._mainLife._mAge;
            if (this._mainLife._mOccupation != "285") {
              this.isDisableDiv = true;
              document.onkeydown = function (e) { return false; }
              this.quoAipService.edit(this.personalInfomation, this.qdId).subscribe(response => {
                
                this.isDisableDiv = false;
                document.onkeydown = function (e) { return true; }
                if (response.json().status == "Success") {
                  swal("Success", "Quotation has been saved Successfully <br> Quotation No : " + response.json().code, "success");
                  this.router.navigate(['/loadQuo']);
                }
                else {
                  swal("Oopz...", response.json().status, "error");

                }
              },error => {
                swal("Error", error.text() ,"error");
                document.onkeydown = function (e) { return true; }
               this.isDisableDiv = false;
              });
            } else {
              swal("Oopz..", "Please select an occupation for main life..", "error");
            }
          } else {
            swal("Opzz", "Age must be Greater than or Equal 18 and Less than or equal 65", "error");
          }

        } else {
          swal("Opzz", "Contribution must be greater than or equal Rs.3000", "error");
        }
      } else {
        swal("Opzz", "Term must be greater than or equal 5 ", "error");
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
}
