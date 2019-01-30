import { CodeTransferService } from './../../service/code-transfer/code-transfer.service';
import { LoginService } from './../../service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeTransfer } from './../../model/codetransfer';
import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { AgentModel } from '../../model/agentmodel';
import { CodeTransferHelperModel } from '../../model/codetransferhelpermodel';
import { CodeTransferModel } from '../../model/codetransfermodel';
import { SaveCodeTransfer } from '../../model/savecodeTransferModel';
import { Session } from 'protractor';

@Component({
  selector: 'app-code-transfer',
  templateUrl: './code-transfer.component.html',
  styleUrls: ['./code-transfer.component.css']
})
export class CodeTransferComponent implements OnInit {

  agentCodeArray : AgentModel []= new Array();
  prpCodeTranArray: CodeTransferHelperModel[]=new Array();
  
  isSelectRow: boolean = false;
  selectedPrpCodeTranArray: CodeTransferHelperModel[]=new Array();
  polCodeTranArray: CodeTransferHelperModel[]=new Array();
  pendingCodeTranPprArray : CodeTransferModel[] = new Array();
  pendingCodeTranPolArray : CodeTransferModel[] = new Array();
  canceledCodeTranPprArray : CodeTransferModel[] = new Array();
  canceledCodeTranPolArray : CodeTransferModel[] = new Array();

  transferlist: CodeTransfer[] = new Array();

  isDisableDiv = true;

  form_search = new FormGroup({
    column: new FormControl("pprnum"),
    data: new FormControl("", Validators.required)
  });
  userType: string = null;

  transferAgentCode;

  existingAgentCode;
  existingAgentName;
  existingBranch;
  newAgentCode;
  newAgentName;
  newBranch;
  pprNum;

  constructor(private loginService: LoginService, private codeTransferService: CodeTransferService) {
    if (!sessionStorage.getItem("Token")) {
      this.loginService.navigateLigin();
    }
  }

  ngOnInit() {
    this.userType = sessionStorage.getItem("userType");
    
    if(this.userType == "BRANCH" || this.userType == "REGION"){
      this.loadCodePendingProposal();
      this.loadCanceledCodeTranPrp();
      this.loadPendingCodeTranPrp();
      this.getTransfers();
    }else{
      this.getTransfers();
    }
    

  }

  getTransfers() {
    let user = this.loginService.currentUser;

    this.isDisableDiv = true;
    this.codeTransferService.getAllTransfers(user,sessionStorage.getItem("dashpara"),sessionStorage.getItem("userType")).subscribe(resp => {
      this.isDisableDiv = false;
      // console.log(resp.json());
      this.transferlist = new Array();
      for (let i in resp.json()) {

        let transfer: CodeTransfer = resp.json()[i];

        transfer.requestDate = new Date(resp.json()[i].requestDate).toDateString();

        this.transferlist.push(transfer);
      }

    }, error => {
      this.isDisableDiv = false;
      swal("Error", "Error at loading", "error");
    });
  }

  getInputValues(input: any, data: string, map: Map<string, string>) {
    map.set(data, input.value);
  }

  approve(code) {

    console.log(code);

    let user = this.loginService.currentUser;

    let isOk = false;

    let htmlTxt = "<hr class='seperator'>";

    htmlTxt += "<div>" +
      "<lable>Please Enter New Agent Code for Confirmation</lable>" +
      "<br>" +
      "<lable> Agent Code : " + code.newAgentCode + "</lable></div>" +
      "<br>" +
      "<div class='form-group'>" +
      "<div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'>" +
      "<label for='confirm' style='padding-top:10px;text-align: justify;'>Confirm</label> " +
      "</div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'>" +
      "<input type='text' id='agentCode' class='form-control' placeholder='New Agent Code'/>" +
      "</div></div>" +
      "</div>";

    swal({
      title: 'Confirmation',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.getInputValues(document.getElementById("agentCode"), 'agentCode', map);

        if (map.get("agentCode") == code.newAgentCode) {



          swal({
            title: 'Approve',
            html: "<lable>Are you sure ? </lable>",
            showCancelButton: true,
            showConfirmButton: true
          }).then(resp => {

            this.isDisableDiv = true;
            this.codeTransferService.approveTransfers(user.userCode, code.codeTransferId, map.get("remark")).subscribe(resp => {
              this.isDisableDiv = false;
              if (resp.json().code == '200') {
                swal("Success", resp.json().message, "success");
              } else {
                swal("Error", resp.json().message, "error");
              }
              this.getTransfers();
            }, error => {
              this.isDisableDiv = false;
              swal("Error", "Internal Error", "error")
            });

          });

          console.log(true);
        } else {
          swal("Error", "Code is Incorrect", "error");
        }
      }

    });

  }

  reject(code) {

    let user = this.loginService.currentUser;

    let htmlTxt = "<hr class='seperator'>";
    htmlTxt += "<div class='form-group'>" +
      "<div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'>" +
      "<label for='remark' style='padding-top:10px;text-align: justify;'>Remark</label> " +
      "</div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'>" +
      "<input type='text' id='remark' class='form-control' placeholder='Remark'/>" +
      "</div></div>" +
      "</div>";

    swal({
      title: 'Reject',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.getInputValues(document.getElementById("remark"), 'remark', map);

        this.isDisableDiv = true;
        this.codeTransferService.rejectTransfers(user.userCode, code.codeTransferId, map.get("remark")).subscribe(resp => {
          this.isDisableDiv = false;
          if (resp.json().code == '200') {
            swal("Success", resp.json().message, "success");
          } else {
            swal("Error", resp.json().message, "error");
          }
          this.getTransfers();
        }, error => {
          this.isDisableDiv = false;
          swal("Error", "Internal Error", "error")
        });


      }

    });
  }

  getAgents(event) {
    if (this.transferAgentCode.length >= 2 && event.key != "Enter" && event.key != "ArrowUp"
      && event.key != "ArrowDown" && event.key != "ArrowLeft" && event.key != "ArrowRight" &&
      event.key != "Tab" && event.key != "Enter" && event.key != "Backspace") {
        this.isDisableDiv=true;
      this.agentCodeArray = new Array();
      console.log(this.transferAgentCode);
      this.codeTransferService.getAgent(this.transferAgentCode).subscribe(response => {
        console.log(response.json());
        let htmlTxt="<div style=\"overflow-x:auto;\"><table class=\"table table-striped table-hover table-responsive\">";
        // "<tr><th>Agent Code</th><th>Agent Name</th><th>Loc Code</th></tr>";
          for (let i in response.json()) {
            let agnTemp = response.json()[i];
            let agentModel: AgentModel = new AgentModel();

            agentModel.AgentCode = agnTemp.agentCode;
            agentModel.AgentName = agnTemp.agentName;
            agentModel.Location = agnTemp.location;

            agentModel.AgentCombine = agnTemp.agentCode + " | " + agnTemp.agentName + " | " + agnTemp.location;

            htmlTxt+="<tr>"+
                      "<td><input type=\"radio\" name=\"selectagent\" value=\""+agnTemp.agentCode+"\"></td>"+
                      "<td>"+agnTemp.agentCode+"</td>"+
                      "<td>"+agnTemp.agentName+"</td>"+
                      "<td>"+agnTemp.location+"</td>"+
                      "</tr>";

            this.agentCodeArray.push(agentModel);
          }
      
         htmlTxt+="</table></div>";

        this.isDisableDiv=false;

        if(this.agentCodeArray.length > 0){
          swal({
            title: 'Transfer Agents',
            html: htmlTxt,
            width: '450px',
            showCancelButton: false,
            showConfirmButton: true
      
          }).then((resp) => {
            if (resp.value == true) {

              let selectedagent="";

              if(document.querySelector('input[name="selectagent"]:checked') != null){
                selectedagent = document.querySelector('input[name="selectagent"]:checked').getAttribute("value");
              }
              

              if(selectedagent.length == 4){
                this.loadNewAgentDetails(selectedagent);
              }else{
                this.newAgentCode="";
                this.newAgentName="";
                this.newBranch="";
                this.transferAgentCode="";
              }
              

            }else{
              if(this.transferAgentCode.length > 4){
                this.newAgentCode="";
                this.newAgentName="";
                this.newBranch="";
                this.transferAgentCode="";
              }
            }
          });
        }
        
        
      });
      this.isDisableDiv=false;
    }
  }


  loadNewAgentDetails(agentCode){
    this.transferAgentCode=agentCode;
    let code:string=this.transferAgentCode.toString();

    if(code.length == 4){
      this.isDisableDiv=true;
      this.codeTransferService.getAgentDetails(code).subscribe(response => {
        console.log(response.json());
        this.isDisableDiv=false;
        this.newAgentName=response.json().agentName;
        this.newBranch=response.json().location;
        this.newAgentCode=response.json().agentCode;
      },error =>{
        swal("Oopz...", "Error occour at Loading New Agent Details", "error");
        this.isDisableDiv=false;
      });
    }
    
  }

  loadCodePendingProposal(){
    this.isDisableDiv=true;
    this.codeTransferService.loadCodePendingProposal(sessionStorage.getItem("Token"),sessionStorage.getItem("userType"),sessionStorage.getItem("dashpara")).subscribe(response =>{
      console.log("//////////////////////////////");
      console.log(response.json());
      this.isDisableDiv=false;
      if(response.json().code == "204"){
        swal("Oopz...", response.json().message, "error");
        
      }else{
        let helperDto  : CodeTransferHelperModel[]=response.json();

        this.prpCodeTranArray = helperDto;

      }
      
    },error => {
      swal("Oopz...", "Error occour at Loading Code Pending Proposals", "error");
      this.isDisableDiv=false;
    });
    
  }

  loadPendingCodeTranPrp(){
    this.isDisableDiv=true;
    this.codeTransferService.loadPendingCodeTranPrp(sessionStorage.getItem("Token")).subscribe(response => {
      this.pendingCodeTranPprArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;

        this.pendingCodeTranPprArray.push(codetrans);

       });

      this.isDisableDiv=false;
      
    },error=>{
      swal("Oopz...", "Error occour at Loading Pending New Code Transfers", "error");
      this.isDisableDiv=false;
    });
  }

  loadPendingCodeTranPol(){
    this.isDisableDiv=true;
    this.codeTransferService.loadPendingCodeTranPol(sessionStorage.getItem("Token")).subscribe(response => {
      this.pendingCodeTranPolArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;

        this.pendingCodeTranPolArray.push(codetrans);

       });

      this.isDisableDiv=false;
      
    },error=>{
      swal("Oopz...", "Error occour at Loading Pending Old Code Transfers", "error");
      this.isDisableDiv=false;
    });
  }

  loadCanceledCodeTranPrp(){
    this.isDisableDiv=true;
    this.codeTransferService.loadCanceledCodeTranPrp(sessionStorage.getItem("Token")).subscribe(response => {
      this.canceledCodeTranPprArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;
        codetrans.ApprovedBy=i.approvedBy;
        codetrans.ApprovedDate=i.approvedDate;
        codetrans.ApproverRemark=i.approverRemark;

        this.canceledCodeTranPprArray.push(codetrans);

       });

      this.isDisableDiv=false;
      
    },error=>{
      swal("Oopz...", "Error occour at Loading Canceled New Code Transfers", "error");
      this.isDisableDiv=false;
    });
  }

  loadCanceledCodeTranPol(){
    this.isDisableDiv=true;
    this.codeTransferService.loadCanceledCodeTranPol(sessionStorage.getItem("Token")).subscribe(response => {
      this.canceledCodeTranPolArray=new Array();
      console.log(response.json());
      response.json().forEach(i => {
        let codetrans:CodeTransferModel=new CodeTransferModel();

        codetrans.PprNum=i.pprNum;
        codetrans.PolNum=i.polNum;
        codetrans.OldAgentCode=i.oldAgentCode;
        codetrans.NewAgentCode=i.newAgentCode;
        codetrans.CreateDate=i.createDate;
        codetrans.LocCode=i.locCode;
        codetrans.Status=i.status;
        codetrans.RequestDate=i.requestDate;
        codetrans.Reason=i.reason;
        codetrans.ApprovedBy=i.approvedBy;
        codetrans.ApprovedDate=i.approvedDate;
        codetrans.ApproverRemark=i.approverRemark;

        this.canceledCodeTranPolArray.push(codetrans);

       });

      this.isDisableDiv=false;
      
    },error=>{
      swal("Oopz...", "Error occour at Loading Canceled Old Code Transfers", "error");
      this.isDisableDiv=false;
    });
  }

  loadDataToExisting(agentCode,agentName,branch,pprNum){
    this.isSelectRow=true;
    this.existingAgentCode=agentCode;
    this.existingAgentName=agentName;
    this.existingBranch=branch;
    this.pprNum=pprNum;
    this.newAgentCode="";
    this.newAgentName="";
    this.newBranch="";
    //this.propCodeTranForm.get("agentCode").setValue("");

    let helperModel:CodeTransferHelperModel=new CodeTransferHelperModel();
    helperModel.AgentCode=agentCode;
    helperModel.AgentName=agentName;
    helperModel.Branch=branch;
    helperModel.PprNo=pprNum;

    this.selectedPrpCodeTranArray=new Array();
    this.selectedPrpCodeTranArray.push(helperModel);
  }

  savePropCodeTransfer(){
    if(this.isSelectRow && this.selectedPrpCodeTranArray.length > 0 && this.transferAgentCode != null && this.transferAgentCode != "" && this.newAgentCode != ""){
      this.isDisableDiv=true;
      let saveCodeTransferModel=new SaveCodeTransfer();
      saveCodeTransferModel.Agent=this.transferAgentCode;
      saveCodeTransferModel.Reason="";
      saveCodeTransferModel.Token=sessionStorage.getItem("Token");
      saveCodeTransferModel.CodeTransferHelpers=this.selectedPrpCodeTranArray;

      this.codeTransferService.saveCodeTranPrp(saveCodeTransferModel).subscribe(response => {
        this.isDisableDiv=false;
        console.log(response.json());
        if(response.json().code == "204"){
          swal("Oopz...", response.json().message, "error");
        }else{
          swal("Success", "Code Transfer Request Send Successfully", "success");
          this.isSelectRow=false;
          this.newAgentCode="";
          this.selectedPrpCodeTranArray=new Array();
          this.clearProp();
          this.loadCodePendingProposal();
          this.loadPendingCodeTranPol();
          this.loadPendingCodeTranPrp();
          this.loadCanceledCodeTranPol();
          this.loadCanceledCodeTranPrp();
        }
        
      },error => {
        swal("Oopz...", "Error occour at Saving Proposal Code Transfers", "error");
        this.isDisableDiv=false;
      });
    }else{
      swal("Oopz...", "Please Fill All Details Correctly.", "error");
    }
  }

  clearProp(){
    this.prpCodeTranArray=new Array();
    this.transferAgentCode="";
    this.newAgentCode="";
    this.newAgentName="";
    this.newBranch="";
    this.existingAgentCode="";
    this.existingAgentName="";
    this.existingBranch="";
    this.loadCodePendingProposal();
  }

}
