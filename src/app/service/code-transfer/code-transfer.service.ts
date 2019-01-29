import { CodeTransfer } from './../../model/codetrans';
import { Http,URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CodeTransferService {

  constructor(private http:Http) { }

  // getAllTransfers(user){

  //   // let urlParams = new URLSearchParams();
  //   // urlParams.append('userCode', user.userCode);
  //   // urlParams.append('dashPara', dashPara);
  //   // urlParams.append('userType', userType);

  //   console.log("user :  " + user.userCode);

  //   return this.http.get("http://localhost:8084/code_transfer/getCodeTransfersToApprove/"+user.userCode);
  // }

  getAllTransfers(user,dashPara,userType){

    let urlParams = new URLSearchParams();
    urlParams.append('userCode', user.userCode);
    urlParams.append('dashPara', dashPara);
    urlParams.append('userType', userType);

    console.log("user :  " + user.userCode);

    return this.http.post("http://localhost:8084/code_transfer/getCodeTransfersToApprove/",urlParams);
  }

  approveTransfers(user, code, remark){

    let trans : CodeTransfer = new CodeTransfer();

    trans.remark = remark;
    trans.transId = code;
    trans.user = user;

    return this.http.post("http://localhost:8084/code_transfer/approveCodeTransfer", trans);
  }

  rejectTransfers(user, code, remark){

    let trans : CodeTransfer = new CodeTransfer();

    trans.remark = remark;
    trans.transId = code;
    trans.user = user;
    
    return this.http.post("http://localhost:8084/code_transfer/rejectCodeTransfer", trans);
  }

  getAgent(agentCode: any) {
    let token: string = sessionStorage.getItem("Token");
    let branchCode: string = sessionStorage.getItem("dashpara");
    let urlParams = new URLSearchParams();
    urlParams.append('token', token);
    urlParams.append('agentCode', agentCode);
    urlParams.append('branchCode', branchCode);
    return this.http.post("http://localhost:8084/code_transfer/getAgentByBranch/", urlParams);
  }

  getAgentDetails(agentCode){
    return this.http.post("http://localhost:8084/code_transfer/getAgentsDetails/", agentCode);
  }
  
  loadPendingCodeTranPrp(token){
    return this.http.get("http://localhost:8084/code_transfer/getPendingCodeTransfersPrp/"+token);
  }

  loadPendingCodeTranPol(token){
    return this.http.get("http://localhost:8084/code_transfer/getPendingCodeTransfersPol/"+token);
  }

  loadCanceledCodeTranPrp(token){
    return this.http.get("http://localhost:8084/code_transfer/getCanceledCodeTransfersPrp/"+token);
  }

  loadCanceledCodeTranPol(token){
    return this.http.get("http://localhost:8084/code_transfer/getCanceledCodeTransfersPol/"+token);
  }

  loadCodePendingProposal(token){
    return this.http.get("http://localhost:8084/code_transfer/getCodePendingProposalDetails/"+token);
  }

  saveCodeTranPrp(saveCodeTransferModel){
    console.log(saveCodeTransferModel);
    
    return this.http.post("http://localhost:8084/code_transfer/saveCodeTranPrp/", saveCodeTransferModel);
  }

}
