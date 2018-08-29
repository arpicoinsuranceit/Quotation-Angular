import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoadInquiryService {

  constructor(private http: Http) { }

  getInquiries(userType, dashPara, advcod, offset, limit, equality, column, data) {
    return this.http.get('http://localhost:8085/getallinquiries/' + userType + "/" + dashPara + "/" + advcod + "/" + offset + "/" + limit + "/" + equality + "/" + column + "/" + data.trim());
  }

  getCount(userType, dashPara, advcod, offset, limit, equality, column, data) {
    return this.http.get('http://localhost:8085/getCount/' + userType + "/" + dashPara + "/" + advcod + "/" + offset + "/" + limit + "/" + equality + "/" + column + "/" + data.trim());
  }

  getGereralInfo(proposalNo: string) {
    return this.http.post("http://localhost:8085/getGeneral", proposalNo);
  }

  getChildInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://localhost:8085/getChildren", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getNomineeInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://localhost:8085/getNominee", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getBenefictInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://localhost:8085/getBenefict", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getMedicalReqInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://localhost:8085/getMedQry", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getTransferHistoryInfo(proposalNo: string) {
    return this.http.post("http://localhost:8085/getTransferDetails", proposalNo);
  }

  getSettlementInfo(proposalNo: string) {
    return this.http.post("http://localhost:8085/getSettlementDetails", proposalNo);
  }

  getPaymentInfo(policyNo: string, branchCode: string) {
    if (policyNo != null && policyNo.length > 0) {
      return this.http.post("http://localhost:8085/getPaymentHistory", policyNo + "&" + branchCode);
    } 
    return null;
  }

  getPolicyDispatchAch(policyNo: string) {
    if (policyNo != null && policyNo.length > 0) {
      return this.http.post("http://localhost:8085/getPolicyDisAch", policyNo);
    }
    return null;
  }

}
