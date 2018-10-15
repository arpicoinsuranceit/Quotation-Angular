import { MainLifeBenificts } from './../../model/benificts';
import { GeneralData, Inquiry, MainlifeInquiry, SpouseInquiry, ChildInquiry, NomineeInquiry, BenefictInquiry, MedicalReq, TransferHistory, Settlement, PaymentHistory, PolicyDispatchAcknow } from './../../model/inquiry';
import { LoginService } from './../../service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadInquiry } from './../../model/loadinquiry';
import { Page } from './../../model/datatable/page';
import { DataTableResponse } from './../../model/datatable/datatableresponse';
import { LoadInquiryService } from './../../service/load-inquiry/load-inquiry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClickType } from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';

@Component({
  selector: 'app-load-inquiries',
  templateUrl: './load-inquiries.component.html',
  styleUrls: ['./load-inquiries.component.css']
})
export class LoadInquiriesComponent implements OnInit {

  view = "load";

  dataTableResponse: DataTableResponse;

  rows = new Array<LoadInquiry>();

  temp = [];

  page = new Page();

  userCode: string;

  settlementTot: number = 0;

  isDisableDiv = false;

  generalDate: GeneralData = new GeneralData;
  mainlifeInquiry: MainlifeInquiry = new MainlifeInquiry;
  spouseInquiry: SpouseInquiry = new SpouseInquiry;
  childInquirys: ChildInquiry[] = new Array<ChildInquiry>();
  nomineeInquirys: NomineeInquiry[] = new Array<NomineeInquiry>();

  benefictMainlife: BenefictInquiry[] = new Array<BenefictInquiry>();
  benefictSpouse: BenefictInquiry[] = new Array<BenefictInquiry>();
  benefictChildren: BenefictInquiry[] = new Array<BenefictInquiry>();

  medicalReqMainlife: MedicalReq[] = new Array<MedicalReq>();
  medicalReqSpouse: MedicalReq[] = new Array<MedicalReq>();
  medicalReqChildren: MedicalReq[] = new Array<MedicalReq>();

  transferHistory: TransferHistory[] = new Array<TransferHistory>();

  settlement: Settlement[] = new Array<Settlement>();

  paymentHistory: PaymentHistory[] = new Array<PaymentHistory>();

  policyDispatchAcknow: PolicyDispatchAcknow = new PolicyDispatchAcknow;


  inruiry: Inquiry = new Inquiry(this.generalDate, this.mainlifeInquiry, this.spouseInquiry, this.childInquirys, this.nomineeInquirys,
    this.benefictMainlife, this.benefictSpouse, this.benefictChildren, this.medicalReqMainlife, this.medicalReqSpouse, this.medicalReqChildren
    , this.transferHistory, this.settlement, this.paymentHistory, this.policyDispatchAcknow);

  columns = [
    { prop: 'proposalNo' },
    { prop: 'policyNo' },
    { prop: 'mainLifeName' },
    { prop: 'nic' },
    { prop: 'product' },
    { prop: 'proposalStatus' },
    { prop: 'advisorCode' }

  ];

  form_search = new FormGroup({
    equality: new FormControl("equal"),
    column: new FormControl("pprnum"),
    data: new FormControl("", Validators.required)
  });

  get equality() {
    return this.form_search.get("equality").value;
  }
  get column() {
    return this.form_search.get("column").value;
  }
  get data() {
    return this.form_search.get("data").value;
  }

  constructor(private loadInquiryService: LoadInquiryService, private loginService: LoginService) {
    if(!sessionStorage.getItem("Token")){
      this.loginService.navigateLigin();
    }

    ////console.log(sessionStorage.getItem("userType"));
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.isDisableDiv = true;
  }

  ngOnInit() {
    this.setTotalElements();
  }

  search() {
    this.isDisableDiv = true;
    this.page.pageNumber = 0;
    this.rows = new Array<LoadInquiry>();
    this.setTotalElements();
  }

  setTotalElements() {
    this.loadInquiryService.getCount(sessionStorage.getItem("userType"), sessionStorage.getItem("dashpara"), this.loginService.currentUser.userCode, this.page.pageNumber * this.page.size, this.page.size, this.equality, this.column, this.data).subscribe(response => {
      this.page.totalElements = parseInt(response.text());
      this.setPage({ offset: 0 });
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });

  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.loadInquiryService.getInquiries(sessionStorage.getItem("userType"), sessionStorage.getItem("dashpara"), this.loginService.currentUser.userCode, this.page.pageNumber * this.page.size, this.page.size, this.equality, this.column, this.data).subscribe(response => {
      this.dataTableResponse = response.json();
      this.rows = this.dataTableResponse.data;
      this.isDisableDiv = false;
     // //console.log(this.dataTableResponse);
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }

  getDetails(activityInfo) {


    if (activityInfo.type == "dblclick" || activityInfo.type == "click") {
      this.isDisableDiv = true;
      this.settlementTot = 0;

      this.generalDate = new GeneralData;
      this.mainlifeInquiry = new MainlifeInquiry;
      this.spouseInquiry = new SpouseInquiry;
      this.childInquirys = new Array<ChildInquiry>();
      this.nomineeInquirys = new Array<NomineeInquiry>();

      this.benefictMainlife = new Array<BenefictInquiry>();
      this.benefictSpouse = new Array<BenefictInquiry>();
      this.benefictChildren = new Array<BenefictInquiry>();

      this.medicalReqMainlife = new Array<MedicalReq>();
      this.medicalReqSpouse = new Array<MedicalReq>();
      this.medicalReqChildren = new Array<MedicalReq>();

      this.transferHistory = new Array<TransferHistory>();

      this.settlement = new Array<Settlement>();

      this.paymentHistory = new Array<PaymentHistory>();

      this.policyDispatchAcknow = new PolicyDispatchAcknow;

      this.inruiry = new Inquiry(this.generalDate, this.mainlifeInquiry, this.spouseInquiry, this.childInquirys, this.nomineeInquirys,
        this.benefictMainlife, this.benefictSpouse, this.benefictChildren, this.medicalReqMainlife, this.medicalReqSpouse, this.medicalReqChildren,
        this.transferHistory, this.settlement, this.paymentHistory, this.policyDispatchAcknow);

      this.view = "details";

      this.inruiry.generalData.policyNo = activityInfo.row.policyNo;
      this.inruiry.generalData.proposanNo = activityInfo.row.proposalNo;
      this.inruiry.generalData.productName = activityInfo.row.product;

      this.loadInquiryService.getGereralInfo(this.generalDate.proposanNo).subscribe(response => {
        ////console.log(response.json());
        let res = response.json();
        if (res) {
          this.inruiry.generalData.productName = res.productName + " / " + res.productCode;
          this.inruiry.generalData.branchCode = res.branchCode;
          this.inruiry.generalData.commeencementDate = res.commencementDate;
          this.inruiry.generalData.expDate = res.expDate;
          this.inruiry.generalData.seqNo = res.seqNo;
          this.inruiry.generalData.quotationNum = res.quotationNum;
          this.inruiry.generalData.payTerm= res.payTerm;
          this.inruiry.generalData.targetPremium= res.targetPremium;
          this.inruiry.generalData.relTerm= res.relTerm;
          this.inruiry.generalData.topTerm= res.topTerm;
          this.inruiry.generalData.basicSum= res.basicSum;
          this.inruiry.generalData.premiumForBasicSum= res.premiumForBasicSum;
          this.inruiry.generalData.totalPremiun= res.totalPremiun;
          this.inruiry.generalData.proposalStatus= res.proposalStatus;
          this.inruiry.generalData.proposalDescription= res.proposalDescription;

          this.inruiry.mainlifeInquiry.address = res.mainlifeAddress;
          this.inruiry.mainlifeInquiry.ageNext = res.mainLifeNextAge;
          this.inruiry.mainlifeInquiry.bankAcc = res.accountNo;
          this.inruiry.mainlifeInquiry.bankCode = res.bankNo;
          this.inruiry.mainlifeInquiry.dob = res.mainLifeDob;
          this.inruiry.mainlifeInquiry.email = res.mainLifeEmail;
          this.inruiry.mainlifeInquiry.fName = res.mainLifeName;
          this.inruiry.mainlifeInquiry.iniName = res.mainLifeNameIni;
          this.inruiry.mainlifeInquiry.mobile = res.mainLifeMob;
          this.inruiry.mainlifeInquiry.nic = res.mainLifeNic;
          this.inruiry.mainlifeInquiry.occupation = res.mainLifeOcu;
          this.inruiry.mainlifeInquiry.previlageCard = res.previlageCardNo;
          this.inruiry.mainlifeInquiry.sex = res.mainLifesex == "M" ? "Male" : "Female";
          this.inruiry.mainlifeInquiry.status = res.mainLifeStatus == "M" ? "Married" : "Single";
          this.inruiry.mainlifeInquiry.tele = res.mainLifeTel;

          this.inruiry.spouseInquiry.fName = res.spouseName;
          this.inruiry.spouseInquiry.iniName = res.spouseNameIni;
          this.inruiry.spouseInquiry.nic = res.spouseNic;
          this.inruiry.spouseInquiry.occupation = res.spouseocu;
          this.inruiry.spouseInquiry.dob = res.spouseDob;
        }
        this.loadInquiryService.getChildInfo(this.generalDate.proposanNo, this.generalDate.branchCode, this.generalDate.seqNo).subscribe(response => {
          console.log(response.json());

          let childArray = response.json();
          if (childArray) {
            for (let i in childArray) {
              let rsp = childArray[i];
              let child: ChildInquiry = new ChildInquiry;
              child.age = rsp.age;
              child.cibc = rsp.cibc == "Y" ? "Yes" : "No";
              child.dob = rsp.dob;
              child.hbc = rsp.hbc == "Y" ? "Yes" : "No";
              child.hrbc = rsp.hrbc == "Y" ? "Yes" : "No";
              child.name = rsp.name;
              child.relation = rsp.relation;
              child.sex = rsp.sex == "Male" ? "Male" : "Female";
              child.suhrbc = rsp.suhrbc == "Y" ? "Yes" : "No";

              this.inruiry.childInquirys.push(child);
            }
          }

          this.loadInquiryService.getNomineeInfo(this.generalDate.proposanNo, this.generalDate.branchCode, this.generalDate.seqNo).subscribe(response => {
            ////console.log(response.json());

            let nomineeArray = response.json();

            if (nomineeArray) {
              for (let i in nomineeArray) {
                let temp = nomineeArray[i];

                let nomine: NomineeInquiry = new NomineeInquiry;

                nomine.name = temp.name;
                nomine.relation = temp.relation;
                nomine.nic = temp.nic;
                nomine.dob = temp.dob;
                nomine.shared = temp.shared;
                nomine.gName = temp.gName;
                nomine.gNic = temp.gNic;
                nomine.gDob = temp.gDob;
                nomine.gRelation = temp.gRelation;
                this.inruiry.nomineeInquires.push(nomine);
              }
            }

            this.loadInquiryService.getBenefictInfo(this.generalDate.proposanNo, this.generalDate.branchCode, this.generalDate.seqNo).subscribe(response => {
              ////console.log(response.json());

              let benefictArray = response.json();

              if (benefictArray) {
                for (let i in benefictArray) {
                  let rsp = benefictArray[i];

                  let benefictInquiry: BenefictInquiry = new BenefictInquiry;

                  benefictInquiry.code = rsp.riderCode;
                  benefictInquiry.name = rsp.riderName;
                  benefictInquiry.premium = rsp.premium;
                  benefictInquiry.sumAssured = rsp.sumAssured;
                  benefictInquiry.term = rsp.term;

                  if (rsp.type == "main") {
                    this.inruiry.benefictMainlife.push(benefictInquiry)
                  }
                  if (rsp.type == "spouse") {
                    this.inruiry.benefictSpouse.push(benefictInquiry)
                  }
                  if (rsp.type == "children") {
                    this.inruiry.benefictChildren.push(benefictInquiry)
                  }
                }
              }

              this.loadInquiryService.getMedicalReqInfo(this.generalDate.proposanNo, this.generalDate.branchCode, this.generalDate.seqNo).subscribe(response => {

                let medReqArr = response.json();

                if (medReqArr) {
                  for (let i in medReqArr) {
                    let rsp = medReqArr[i];

                    let medicalReq: MedicalReq = new MedicalReq;

                    medicalReq.testCode = rsp.testCode;
                    medicalReq.testName = rsp.testName;
                    medicalReq.origin = rsp.origin;
                    medicalReq.hospital = rsp.hospital;
                    medicalReq.recived = rsp.recived;
                    medicalReq.testDate = rsp.testDate;
                    medicalReq.payAmount = rsp.payAmount;
                    medicalReq.payStatus = rsp.payStatus;
                    medicalReq.additionalNotes = rsp.additionalNotes;

                    if (rsp.type == "main") {
                      this.inruiry.medicalReqMainlife.push(medicalReq);
                    }
                    if (rsp.type == "spouse") {
                      this.inruiry.medicalReqSpouse.push(medicalReq);
                    }
                    if (rsp.type == "children") {
                      this.inruiry.medicalReqChildren.push(medicalReq);
                    }

                  }
                }

                this.loadInquiryService.getTransferHistoryInfo(this.inruiry.generalData.proposanNo).subscribe(response => {
                  let transferArr = response.json();

                  if (transferArr) {
                    for (let i in transferArr) {
                      let rsp = transferArr[i];

                      let transInfo: TransferHistory = new TransferHistory;

                      transInfo.agentCode = rsp.agentCode;
                      transInfo.name = rsp.name;
                      transInfo.agentClass = rsp.agentClass;
                      transInfo.toDate = rsp.toDate;
                      transInfo.fromDate = rsp.fromDate;

                      this.inruiry.transferHistory.push(transInfo);
                    }
                  }
                }, error => {
                  swal("Error", error.text() , "error");
                  document.onkeydown = function (e) { return true; }
                  this.isDisableDiv = false;
                });

                this.loadInquiryService.getSettlementInfo(this.inruiry.generalData.proposanNo).subscribe(response => {
                  let settlementArr = response.json();

                  if (settlementArr) {

                    for (let i in settlementArr) {
                      let rsp = settlementArr[i];

                      let settlement: Settlement = new Settlement;

                      settlement.branch = rsp.branch;
                      settlement.Code = rsp.docCode;
                      settlement.mode = rsp.payMode;
                      settlement.Name = rsp.name;
                      settlement.number = rsp.docnum;
                      settlement.status = rsp.chqRel;
                      settlement.totPremium = rsp.totPremium;

                      this.settlementTot += settlement.totPremium;

                      this.inruiry.settlement.push(settlement);
                    }
                  }

                  if (this.inruiry.generalData.policyNo) {
                    this.loadInquiryService.getPaymentInfo(this.inruiry.generalData.policyNo, this.inruiry.generalData.branchCode).subscribe(response => {

                      ////console.log(response.json());

                      let paymentArr = response.json();

                      if (paymentArr) {
                        for (let i in paymentArr) {
                          let rsp = paymentArr[i];

                          let payment: PaymentHistory = new PaymentHistory;

                          let date : string= rsp.date;
                         

                          payment.date =  date.substr(0, 10);
                          payment.dueAmt = rsp.dueAmt;
                          payment.dueDate = rsp.dueDate;
                          payment.month = rsp.month;
                          payment.outstanding = rsp.outstanding;
                          payment.remark = rsp.remark;
                          payment.settledAmt = rsp.settledAmt;
                          payment.year = rsp.year;


                          this.inruiry.paymentHistory.push(payment);
                        }
                      }

                      if (this.inruiry.generalData.policyNo) {
                        this.loadInquiryService.getPolicyDispatchAch(this.inruiry.generalData.policyNo).subscribe(response => {
                          ////console.log(response.json());
                          this.isDisableDiv = false;

                          let rsp = response.json();

                          if (rsp) {

                            if (rsp.care != null) {
                              this.policyDispatchAcknow.care.cadsdt = rsp.care.cadsdt;
                              this.policyDispatchAcknow.care.remark = rsp.care.remark;
                            }

                            if (rsp.dispatch != null) {
                              this.policyDispatchAcknow.dispatch.ackdat = rsp.dispatch.ackdat;
                              this.policyDispatchAcknow.dispatch.agncod = rsp.dispatch.agncod;
                              this.policyDispatchAcknow.dispatch.agnnam = rsp.dispatch.agnnam;
                              this.policyDispatchAcknow.dispatch.cusdat = rsp.dispatch.cusdat;
                              this.policyDispatchAcknow.dispatch.dspdat = rsp.dispatch.dspdat;
                            }

                          }
                        }, error => {
                          swal("Error", error.text() , "error");
                          document.onkeydown = function (e) { return true; }
                          this.isDisableDiv = false;
                        });
                      } else {
                        this.isDisableDiv = false;
                      }
                    }, error => {
                      swal("Error", error.text() , "error");
                      document.onkeydown = function (e) { return true; }
                      this.isDisableDiv = false;
                    });
                  } else {
                    this.isDisableDiv = false;
                  }

                }, error => {
                  swal("Error", error.text() , "error");
                  document.onkeydown = function (e) { return true; }
                  this.isDisableDiv = false;
                });

              }, error => {
                swal("Error", error.text() , "error");
                document.onkeydown = function (e) { return true; }
                this.isDisableDiv = false;
              });

            }, error => {
              swal("Error", error.text() , "error");
              document.onkeydown = function (e) { return true; }
              this.isDisableDiv = false;
            });

          }, error => {
            swal("Error", error.text(), "error");
            document.onkeydown = function (e) { return true; }
            this.isDisableDiv = false;
          });

        }, error => {
          swal("Error", error.text(), "error");
          document.onkeydown = function (e) { return true; }
          this.isDisableDiv = false;
        });

      }, error => {
        swal("Error", error.text(), "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }
  }

  loadView(e) {
    this.view = "load";
  }
}
