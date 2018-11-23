import { CodeTransfer } from './../../model/codetrans';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CodeTransferService {

  constructor(private http:Http) { }

  getAllTransfers(user){

    // let urlParams = new URLSearchParams();
    // urlParams.append('userCode', user.userCode);

    // console.log("user :  " + user.userCode);

    return this.http.get("http://localhost:8084/code_transfer/getCodeTransfersToApprove/"+user.userCode);
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
}
