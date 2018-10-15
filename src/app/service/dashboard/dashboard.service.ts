import { personalInfo } from './../../model/personalInfo';
import { LoginService } from './../login.service';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class DashboardService {

  userId: string;
  userCode: string;

  constructor(private http: Http, private loginService: LoginService) {
    if (loginService.currentUser) {
      this.userId = loginService.currentUser.userId;
      this.userCode = loginService.currentUser.userCode;
      //console.log(this.userId);
      //console.log(this.userCode);
    }

  }


  getDashboardType(userCode: string) {
    return this.http.post('http://localhost:8085/getdashboardpara', userCode);
  }

  getCurrentMonthTarget(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthTarget/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetGWP(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthTargetGWP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetMCFP(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthTargetMCFP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetFYP(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthTargetFYP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetNOP(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthTargetNOP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }


  getCurrentMonthYearlyTarget(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthYearlyTarget/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthYearlyTargetUNL(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getCurrentMonthYearlyTargetUNL/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getPolicySummery(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getPolicySummery/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getTopIC() {
    return this.http.get('http://localhost:8085/getTopIC');
  }

  getTopIS() {
    return this.http.get('http://localhost:8085/getTopIS');
  }

  getTopUL() {
    return this.http.get('http://localhost:8085/getTopUL');
  }

  getTopBranch() {
    return this.http.get('http://localhost:8085/getTopBranch');
  }

  getTopRegion() {
    return this.http.get('http://localhost:8085/getTopRegion');
  }

  getTopZone() {
    return this.http.get('http://localhost:8085/getTopZone/');
  }

  getGWPAndGWPC(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getGWPAndGWPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getMCFPAndMCFPC(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getMCFPAndMCFPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getFYPAndFYPC(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getFYPAndFYPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getNOPAndNOPC(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getNOPAndNOPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getRINY(dashpara: string, usertype: string) {
    return this.http.get('http://localhost:8085/getRINY/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getDuePolicies(dashpara: string, usertype: string) {
    //console.log(this.userCode);
    //console.log(dashpara);
    //console.log(usertype);
    return this.http.get('http://localhost:8085/getDuePolicies/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getPendingPolicies(dashpara: string, usertype: string) {
    //console.log(dashpara + " - " + usertype);
    return this.http.get('http://localhost:8085/getPendingPolicies/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  loadProfilePictures() {
    return this.http.get('http://localhost:8084/getprofilePictures');
  }


  loadProfilePicture(id) {
    return this.http.get("http://localhost:8084/loadPendingProf/" + id)
      .map((response: Response) => {
        //console.log(response);
        return response.json();
      })
  }

  approveImage(e) {
    //console.log(e + "//////////////////////////////////////////////");
    return this.http.get('http://localhost:8084/approveUserProfile/' + e);
  }
  rejectImage(e) {
    //console.log(e + "//////////////////////////////////////////////");
    return this.http.get('http://localhost:8084/rejectUserProfile/' + e);
  }

  loadActiveProducts() {
    return this.http.get('http://localhost:8084/activeprod');
  }

  loadActiveRiders() {
    return this.http.get('http://localhost:8084/activebenef');
  }

  getMcfpReport(fromDate: string, toDate: string, branch: string, advisor: string, status: string) {
    //console.log(fromDate + "," + toDate + "," + branch + "," + advisor);

    let resp = 'http://localhost:8085/mcfpReport/' + fromDate + "/" + toDate + "/" + advisor + "/" + branch + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/mcfpReport";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getProposalRegister(fromDate, toDate, zone, region, branch, unl, frequency, status) {
    //console.log(fromDate + "," + toDate + "," + zone + "," + region + "," + branch + "," + unl + "," + frequency);

    let resp = 'http://localhost:8085/proposalRegister/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + frequency + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/proposalRegister";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getPendingRequirements(advisor, branch, region, zone, status) {

    let resp = 'http://localhost:8085/pendingRequirements/' + advisor + "/" + branch + "/" + region + "/" + zone + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/pendingRequirements";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getRetentionUnit(toDate, zone, region, branch, unl) {

    let resp = 'http://localhost:8085/retentionUnit/' + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/retentionUnit";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });


  }

  getRetentionCode(date, zone, region, branch, code) {

    let resp = 'http://localhost:8085/retentionCode/' + date + "/" + zone + "/" + region + "/" + branch + "/" + code;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/retentionCode";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getRetentionBranch(date: string, zone: string, region: string, branch: string) {

    let resp = 'http://localhost:8085/retentionBranch/' + date + "/" + zone + "/" + region + "/" + branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/retentionBranch";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getDetailsOfPolicies(fromDate: string, toDate: string, ic: string, ul: string, branch: string, region: string, zone: string, sp: string, status : string) {

    let resp = 'http://localhost:8085/detailsOfPolicies/' + fromDate + "/" + toDate + "/" + ic + "/" + ul + "/" + branch + "/" + region + "/" + zone + "/" + sp + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/detailsOfPolicies";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }


  getPremiumDueReportLive(asAtDate, code, branchCode, regionCode, zone) {

    let resp = 'http://localhost:8085/premiumDueReportLive/' + asAtDate + "/" + code + "/" + branchCode + "/" + regionCode + "/" + zone;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/premiumDueReportLive";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    
    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getPremiumDueReport(asAtDate, code, branchCode, regionCode, zone, status) {

    let resp = 'http://localhost:8085/premiumDueReport/' + asAtDate + "/" + code + "/" + branchCode + "/" + regionCode + "/" + zone + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/premiumDueReport";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getGrantStmtBranch(branch, year, month, code, status) {

    let resp = 'http://localhost:8085/grantStmtBranch/' + branch + "/" + year + "/" + month + "/" + code + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/grantStmtBranch";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getFirstPremiumLapSummary(fromDate: string, toDate: string, zone: string, region: string, branch: string) {

    let resp = 'http://localhost:8085/firstPremiumLapSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/firstPremiumLapSummary";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getPolicyAcknowledgement(branch: string, year: string, month: string) {

    let resp = 'http://localhost:8085/policyAcknowledgement/' + branch + "/" + year + "/" + month;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/policyAcknowledgement";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getSalesPerfSummaryCode(fromDate, toDate, zone, region, branch, frequency, product) {

    let resp = 'http://localhost:8085/salesPerfSummaryCode/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + frequency + "/" + product;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/salesPerfSummaryCode";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }


  getSalesPerfSummary(fromDate, toDate, zone, region, branch, frequency, product, so) {

    let resp = 'http://localhost:8085/salesPerfSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + frequency + "/" + product + "/" + so;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/salesPerfSummary";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

   return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getUnitIsPerfSummary(fromDate, toDate, zone, region, branch, unl, type, frequency, product, status) {

    let resp = 'http://localhost:8085/unitIsPerfSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + type + "/" + frequency + "/" + product + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/unitIsPerfSummary";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getSalesPerfDetail(fromDate, toDate, code, zone, region, branch, product, frequency, status) {

    let resp = 'http://localhost:8085/salesPerfDetail/' + fromDate + "/" + toDate + "/" + code + "/" + zone + "/" + region + "/" + branch + "/" + product + "/" + frequency + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/salesPerfDetail";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    console.log(url);

    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

    

  }


  getUnitIsPerfDetails(fromDate, toDate, zone, region, branch, unl, type, frequency, product, status) {

    let resp = 'http://localhost:8085/unitIsPerfDetails/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + type + "/" + frequency + "/" + product + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://localhost:8085/unitIsPerfDetails";

    for (var _i = 4; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    
    return this.http.get(url, { responseType: ResponseContentType.Blob }).map((res) => {
        return new Blob([res.blob()], { type: 'application/pdf' })
    });

  }

  getSumAtRiskMainLife(nic) {
    return this.http.post('http://localhost:8085/previousSumAtRisk', nic);
  }
}




