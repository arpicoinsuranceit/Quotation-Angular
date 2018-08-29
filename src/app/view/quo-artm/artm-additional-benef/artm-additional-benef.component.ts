import { DashboardService } from './../../../service/dashboard/dashboard.service';
import { Children } from './../../../model/childeren';
import { Benifict } from './../../../model/benificts';
import { SummeryInfo } from './../../../model/summeryInfo';
import { CalPersonalInfo } from './../../../model/quoCal';
import swal from 'sweetalert2';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BenefitsValidations } from '../../../validation/benefitsValidations';
import { NestedForm } from '../../../model/nested-form';
import { LIFECYCLE_HOOKS_VALUES } from '@angular/compiler/src/lifecycle_reflector';
import { UppercaseDirective } from '../../../direvtives/uppercase.directive'

@Component({
  selector: 'app-artm-additional-benef',
  templateUrl: './artm-additional-benef.component.html',
  styleUrls: ['./artm-additional-benef.component.css']
})
export class ArtmAdditionalBenefComponent implements OnInit {

  @Output() onsetBenifMainlife = new EventEmitter<FormGroup>();
  @Output() onsetBenifSpouse = new EventEmitter<FormGroup>();
  @Output() onsetBenifChildren = new EventEmitter<FormGroup>();
  @Output() onsetBenifMainlifeForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifSpouseForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifChildrenForm = new EventEmitter<FormGroup>();
  @Output() onsetBenifAllForm = new EventEmitter<NestedForm>();
  @Input() summeryInfo = new SummeryInfo;
  @Input() personalInfo = new CalPersonalInfo;

  @Input() _childrens = new Array<Children>();


  benefitsValidations = new BenefitsValidations();
  _benif = new Benifict;


  @Input() activeSp = "2";
  @Input() activeCh = "2";

  isBsaChecked = true;
  isBsaSChecked = true;

  @Input() isImgCIBGActive = true;
  @Input() isImgCIBActive = false;

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

  @Input() isImgSUHRBGActive = true;
  @Input() isImgSUHRBActive = false;

  @Input() isImgSUHRBSGActive = true;
  @Input() isImgSUHRBSActive = false;

  @Input() isImgSUHRBCGActive = true;
  @Input() isImgSUHRBCActive = false;

  @Input() isImgSHCBFGActive = true;
  @Input() isImgSHCBFActive = false;

  @Input() isImgSHCBFSGActive = true;
  @Input() isImgSHCBFSActive = false;

  @Input() isImgSHCBFCGActive = true;
  @Input() isImgSHCBFCActive = false;

  @Input() isImgWPBGActive = true;
  @Input() isImgWPBActive = false;

  @Input() isImgWPBSGActive = true;
  @Input() isImgWPBSActive = false;

  @Input() isImgL2GActive = false;
  @Input() isImgL2Active = true;

  @Input() isImgHBGActive = true;
  @Input() isImgHBActive = false;

  @Input() isImgHBSGActive = true;
  @Input() isImgHBSActive = false;

  @Input() isImgHBCGActive = true;
  @Input() isImgHBCActive = false;

  allForms: NestedForm = new NestedForm();
  activeRiders:string[] = new Array<string>();


  abcForm = new FormGroup({
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
    }),
    HBC: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })
  });

  absForm = new FormGroup({
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
    SUHRBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    SHCBFS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HCBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    WPBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    }),
    HBS: new FormGroup({
      isActice: new FormControl(''),
      sumAssured: new FormControl({ value: '0', disabled: true }),
      premium: new FormControl({ value: '0', disabled: true })
    })
  });

  @Input()
   abmForm : FormGroup;



  validateCIB = 1;
  validateHRBI = 1;
  validateHRBF = 1;
  validateSUHRB = 1;
  validateSHCBF = 1;
  validateWPB = 1;
  validateL2 = 1;
  validateHB = 1;

  ////////Spouse//////
  validateHRBIS = 1;
  validateHRBFS = 1;
  validateSUHRBS = 1;
  validateSHCBFS = 1;
  validateWPBS = 1;
  validateHBS = 1;
  ////////Children//////
  validateHRBIC = 1;
  validateHRBFC = 1;
  validateSUHRBC = 1;
  validateHBC = 1;


  constructor(private dashService:DashboardService) {
    this.loadActiveRiders();
  }

  ngOnInit() {
    //this.checkValidateL2();
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

    console.log(this.personalInfo.frequance);
  }

  //adb.............................................
  imgL2GUrl = "assets/images/scbG.png";
  imgL2Url = "assets/images/scb.png";
  imgCibGUrl = "assets/images/cibG.png";
  imgCibUrl = "assets/images/cib.png";
  imgHrbiGUrl = "assets/images/hrbG.png";
  imgHrbiUrl = "assets/images/hrb.png";
  imgHrbfGUrl = "assets/images/hrbG.png";
  imgHrbfUrl = "assets/images/hrb.png";
  imgSuhrbGUrl = "assets/images/suhrbG.png";
  imgSuhrbUrl = "assets/images/suhrb.png";
  imgShcbfGUrl = "assets/images/suhrbG.png";
  imgShcbfUrl = "assets/images/suhrb.png";
  imgwpbGUrl = "assets/images/wpbG.png";
  imgwpbUrl = "assets/images/wpb.png";
  imgHbGUrl = "assets/images/hbG.png";
  imgHbUrl = "assets/images/hb.png";

  ////spouce//////
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
  imgwpbsGUrl = "assets/images/wpbG.png";
  imgwpbsUrl = "assets/images/wpb.png";
  imgHbsGUrl = "assets/images/hbG.png";
  imgHbsUrl = "assets/images/hb.png";

  ////children//////

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

  loadActiveRiders(){
    this.dashService.loadActiveRiders().subscribe(response => {
      this.activeRiders=response.json();
    }, error => {
      //swal("Error", "Error code - 1452 <br> ", "error");
      document.onkeydown = function (e) { return true; }
    });
  }


  isActive(e, frm) {
    //console.log(this._childrens);
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

  isActiveCIB(e) {
    if (e.target.checked) {
      
      if (this.abmForm.get('L2').get('isActice').value) {
        this.isImgCIBGActive = false;
        this.isImgCIBActive = true;
      } else {
        this.abmForm.get('CIB').get('isActice').setValue(false);
        this.abmForm.get('CIB').get('sumAssured').disable();
        swal("CIB Required!", "Can't get this benefict without getting L2", "warning");
      }

    } else {
      this.isImgCIBGActive = true;
      this.isImgCIBActive = false;
      this.clearCIB();
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

        //console.log(this._childrens);
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

        //console.log(this._childrens);
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

        //console.log(this._childrens);
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

        ///console.log(this._childrens);
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
      this.isImgWPBSGActive = false;
      this.isImgWPBSActive = true;
    } else {
      this.isImgWPBSGActive = true;
      this.isImgWPBSActive = false;
      this.clearWPBS();
    }
  }


  isActiveL2(e) {
    /*if (e.target.checked) {
      this.isImgL2GActive = false;
      this.isImgL2Active = true;
    } else {
      this.abmForm.get('L2').get('isActice').setValue(true);
      this.isImgL2GActive = true;
      this.isImgL2Active = false;
      
      this.abmForm.get('L2').get('sumAssured').setValue('0');
      this.abmForm.get('L2').get('premium').setValue('0');

      this.abmForm.get('CIB').get('isActice').setValue(false);
      this.clearCIB();
      //this.clearL2();
    }*/

    this.abmForm.get('L2').get('isActice').setValue(true);
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

  clearHBS() {
    this.absForm.get('HBS').get('sumAssured').setValue('0');
    this.absForm.get('HBS').get('premium').setValue('0');

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


  clearCIB() {
    
    this.abmForm.get('CIB').get('premium').setValue('0');
    this.abmForm.get('CIB').get('sumAssured').setValue('0');
    this.abmForm.get('CIB').get('sumAssured').disable();
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

    //console.log(this._childrens);


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

    //console.log(this._childrens);

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

    //console.log(this._childrens);

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

    //console.log(this._childrens);

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

    //console.log(this._childrens);

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

    //console.log(this._childrens);

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

    //console.log(this._childrens);

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

    //console.log(this._childrens);

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

  clearL2() {
    this.abmForm.get('L2').get('sumAssured').setValue('0');
    this.abmForm.get('L2').get('premium').setValue('0');
    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");
  }


  checkValidateCIB() {
    let bSA = this.personalInfo.bsa;
    let aTPB = 0.0;
    let rBSA = this.abmForm.get('CIB').get('sumAssured').value;
    let l2 = this.abmForm.get('L2').get('sumAssured').value;
    this.validateCIB = this.benefitsValidations.validateCIBARTM(rBSA,l2);

    if (this.validateCIB == 1) {
    } else {
      swal("Error!", "CIB must be greater than or equal 100,000 and less than or equal 6,000,000 and 10 times of L2 and CIB mod 100,000 must be equal to 0", "error");
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

  checkValidateL2() {
    let rBSA = this.abmForm.get('L2').get('sumAssured').value;
    this.validateL2 = this.benefitsValidations.validateL2(rBSA);

    if (this.validateL2 == 0) {
      swal("Error!", "L2 must be greater than or equal 100,000 and less than or equal 1,000,000", "error");
    }

    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    this.onsetBenifAll("", "");

  }


  ///////////spouse//////////

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

  ///////children///////


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
    // this.allForms.abmForm = this.abmForm;
    // this.allForms.absForm = this.absForm;
    // this.allForms.abcForm = this.abcForm;
    // this.onsetBenifAll("", "");
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
      //this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
    } else {
      swal("HB Required!", "Can't get this benefict without getting HB..!", "warning");
    }
    //this.allForms.abmForm = this.abmForm; this.allForms.absForm = this.absForm; this.allForms.abcForm = this.abcForm; this.onsetBenifAll("", "");
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
      swal("Error!", "HB must be greater than or equal 500 and less than or equal 15,000 and multi value of 100  and Less than 20% of Yearly Premium", "error");
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


    this.isImgCIBGActive = true;
    this.isImgCIBActive = false;

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

  loadDefaultNew() {

    this.absForm.reset();
    this.abcForm.reset();

    this.isImgCIBGActive = true;
    this.isImgCIBActive = false;

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

    this.isImgHBActive=false;
    this.isImgHBGActive=true;

    this.isImgHBSActive=false;
    this.isImgHBSGActive=true;

    this.isImgHBCActive=false;
    this.isImgHBCGActive=true;

    
    for (var i in this.abmForm.value) {
      if(i != "L2" && i != "WPB" ){
        this.abmForm.get(i).get('sumAssured').setValue(0);
        this.abmForm.get(i).get('sumAssured').disable();
        this.abmForm.get(i).get('premium').setValue(0);
        this.abmForm.get(i).get('isActice').setValue(false);
      }
     
    }

    for (var i in this.abcForm.value) {
      this.abcForm.get(i).get('sumAssured').setValue(0);
      this.abcForm.get(i).get('sumAssured').disable();
      this.abcForm.get(i).get('premium').setValue(0);
      this.abcForm.get(i).get('isActice').setValue(false);
    }

    for (var i in this.absForm.value) {
      this.absForm.get(i).get('sumAssured').setValue(0);
      this.absForm.get(i).get('sumAssured').disable();
      this.absForm.get(i).get('premium').setValue(0);
      this.absForm.get(i).get('isActice').setValue(false);
    }


    this.allForms.abmForm = this.abmForm;
    this.allForms.absForm = this.absForm;
    this.allForms.abcForm = this.abcForm;
    //this.onsetBenifAll("", "");


  }

  loadDefaultBSAChange() {
    this.abmForm.reset();
    this.absForm.reset();
    this.abcForm.reset();

    this.isImgCIBGActive = true;
    this.isImgCIBActive = false;

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

    this.isImgWPBActive=false;
    this.isImgWPBGActive=true;

    this.isImgWPBSActive=false;
    this.isImgWPBSGActive=true;

    this.isImgL2Active=false;
    this.isImgL2GActive=true;

    this.isImgHBActive=false;
    this.isImgHBGActive=true;

    this.isImgHBSActive=false;
    this.isImgHBSGActive=true;

    this.isImgHBCActive=false;
    this.isImgHBCGActive=true;

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

  removeError(e) {
    switch (e) {
      case "CIB":
        this.validateCIB = 1;
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
      case "HB":
        this.validateHB = 1;
        break;
      case "HBS":
        this.validateHBS = 1;
        break;

      default:
        break;
    }
  }

}
