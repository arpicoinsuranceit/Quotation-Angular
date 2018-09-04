import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoadInquiryService {

  constructor(private http: Http) { }

  getInquiries(userType, dashPara, advcod, offset, limit, equality, column, data) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getallinquiries/' + userType + "/" + dashPara + "/" + advcod + "/" + offset + "/" + limit + "/" + equality + "/" + column + "/" + data.trim());
  }

  getCount(userType, dashPara, advcod, offset, limit, equality, column, data) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCount/' + userType + "/" + dashPara + "/" + advcod + "/" + offset + "/" + limit + "/" + equality + "/" + column + "/" + data.trim());
  }

  getGereralInfo(proposalNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getGeneral", proposalNo);
  }

  getChildInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getChildren", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getNomineeInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getNominee", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getBenefictInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getBenefict", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getMedicalReqInfo(proposalNo: string, branchCode: string, seqNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getMedQry", proposalNo + "&" + branchCode + "&" + seqNo);
  }

  getTransferHistoryInfo(proposalNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getTransferDetails", proposalNo);
  }

  getSettlementInfo(proposalNo: string) {
    return this.http.post("http://10.10.10.120:8084/Infosys/getSettlementDetails", proposalNo);
  }

  getPaymentInfo(policyNo: string, branchCode: string) {
    if (policyNo != null && policyNo.length > 0) {
      return this.http.post("http://10.10.10.120:8084/Infosys/getPaymentHistory", policyNo + "&" + branchCode);
    } 
    return null;
  }

  getPolicyDispatchAch(policyNo: string) {
    if (policyNo != null && policyNo.length > 0) {
      return this.http.post("http://10.10.10.120:8084/Infosys/getPolicyDisAch", policyNo);
    }
    return null;
  }

}
