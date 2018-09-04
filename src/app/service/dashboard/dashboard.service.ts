import { personalInfo } from './../../model/personalInfo';
import { LoginService } from './../login.service';
import { Http } from '@angular/http';
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
      console.log(this.userId);
      console.log(this.userCode);
    }

  }


  getDashboardType(userCode: string) {
    return this.http.post('http://10.10.10.120:8084/Infosys/getdashboardpara', userCode);
  }

  getCurrentMonthTarget(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthTarget/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetGWP(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthTargetGWP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetMCFP(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthTargetMCFP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetFYP(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthTargetFYP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthTargetNOP(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthTargetNOP/' + this.userCode + "/" + dashpara + "/" + usertype);
  }


  getCurrentMonthYearlyTarget(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthYearlyTarget/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getCurrentMonthYearlyTargetUNL(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getCurrentMonthYearlyTargetUNL/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getPolicySummery(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getPolicySummery/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getTopIC() {
    return this.http.get('http://10.10.10.120:8084/Infosys/getTopIC');
  }

  getTopIS() {
    return this.http.get('http://10.10.10.120:8084/Infosys/getTopIS');
  }

  getTopUL() {
    return this.http.get('http://10.10.10.120:8084/Infosys/getTopUL');
  }

  getTopBranch() {
    return this.http.get('http://10.10.10.120:8084/Infosys/getTopBranch');
  }

  getTopRegion() {
    return this.http.get('http://10.10.10.120:8084/Infosys/getTopRegion');
  }

  getTopZone() {
    return this.http.get('http://10.10.10.120:8084/Infosys/getTopZone/');
  }

  getGWPAndGWPC(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getGWPAndGWPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getMCFPAndMCFPC(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getMCFPAndMCFPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getFYPAndFYPC(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getFYPAndFYPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getNOPAndNOPC(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getNOPAndNOPC/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getRINY(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getRINY/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getDuePolicies(dashpara: string, usertype: string) {
    return this.http.get('http://10.10.10.120:8084/Infosys/getDuePolicies/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  getPendingPolicies(dashpara: string, usertype: string) {
    console.log(dashpara + " - " + usertype);
    return this.http.get('http://10.10.10.120:8084/Infosys/getPendingPolicies/' + this.userCode + "/" + dashpara + "/" + usertype);
  }

  loadProfilePictures() {
    return this.http.get('http://10.10.10.120:8084/Quotation/getprofilePictures');
  }


  loadProfilePicture(id) {
    return this.http.get("http://10.10.10.120:8084/Quotation/loadPendingProf/" + id)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      })
  }

  approveImage(e) {
    console.log(e + "//////////////////////////////////////////////");
    return this.http.get('http://10.10.10.120:8084/Quotation/approveUserProfile/' + e);
  }
  rejectImage(e) {
    console.log(e + "//////////////////////////////////////////////");
    return this.http.get('http://10.10.10.120:8084/Quotation/rejectUserProfile/' + e);
  }

  loadActiveProducts() {
    return this.http.get('http://10.10.10.120:8084/Quotation/activeprod');
  }

  loadActiveRiders() {
    return this.http.get('http://10.10.10.120:8084/Quotation/activebenef');
  }

  getMcfpReport(fromDate: string, toDate: string, branch: string, advisor: string, status: string) {
    console.log(fromDate + "," + toDate + "," + branch + "," + advisor);

    let resp = 'http://10.10.10.120:8084/Infosys/mcfpReport/' + fromDate + "/" + toDate + "/" + advisor + "/" + branch + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/mcfpReport";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    window.open(url);

    return true;
    //return this.http.get('http://10.10.10.120:8084/Infosys/mcfpReport/' + fromDate + "/" + toDate + "/" + advisor + "/" + branch + "/" + status);

  }

  getProposalRegister(fromDate, toDate, zone, region, branch, unl, frequency, status) {
    console.log(fromDate + "," + toDate + "," + zone + "," + region + "," + branch + "," + unl + "," + frequency);

    let resp = 'http://10.10.10.120:8084/Infosys/proposalRegister/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + frequency + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/proposalRegister";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }

    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/proposalRegister/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + frequency + "/" + status);
  }

  getPendingRequirements(advisor, branch, region, zone, status) {

    let resp = 'http://10.10.10.120:8084/Infosys/pendingRequirements/' + advisor + "/" + branch + "/" + region + "/" + zone + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/pendingRequirements";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/pendingRequirements/' + advisor + "/" + branch + "/" + region + "/" + zone + "/" + status);

  }

  getRetentionUnit(toDate, zone, region, branch, unl) {

    let resp = 'http://10.10.10.120:8084/Infosys/retentionUnit/' + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/retentionUnit";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/retentionUnit/' + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl);

  }

  getRetentionCode(date, zone, region, branch, code) {

    let resp = 'http://10.10.10.120:8084/Infosys/retentionCode/' + date + "/" + zone + "/" + region + "/" + branch + "/" + code;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/retentionCode";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

  }

  getRetentionBranch(date: string, zone: string, region: string, branch: string) {

    let resp = 'http://10.10.10.120:8084/Infosys/retentionBranch/' + date + "/" + zone + "/" + region + "/" + branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/retentionBranch";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/retentionBranch/' + date + "/" + zone + "/" + region + "/" + branch);

  }

  getDetailsOfPolicies(fromDate: string, toDate: string, ic: string, ul: string, branch: string, region: string, zone: string, sp: string, status : string) {

    let resp = 'http://10.10.10.120:8084/Infosys/detailsOfPolicies/' + fromDate + "/" + toDate + "/" + ic + "/" + ul + "/" + branch + "/" + region + "/" + zone + "/" + sp + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/detailsOfPolicies";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/detailsOfPolicies/' + fromDate + "/" + toDate + "/" + ic + "/" + ul + "/" + branch + "/" + region + "/" + zone + "/" + sp);
  }


  getPremiumDueReportLive(asAtDate, code, branchCode, regionCode, zone) {

    let resp = 'http://10.10.10.120:8084/Infosys/premiumDueReportLive/' + asAtDate + "/" + code + "/" + branchCode + "/" + regionCode + "/" + zone;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/premiumDueReportLive";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/premiumDueReportLive/' + asAtDate + "/" + code + "/" + branchCode + "/" + regionCode + "/" + zone);

  }

  getPremiumDueReport(asAtDate, code, branchCode, regionCode, zone, status) {

    let resp = 'http://10.10.10.120:8084/Infosys/premiumDueReport/' + asAtDate + "/" + code + "/" + branchCode + "/" + regionCode + "/" + zone + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/premiumDueReport";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;
    //return this.http.get('http://10.10.10.120:8084/Infosys/premiumDueReport/' + asAtDate + "/" + code + "/" + branchCode + "/" + regionCode + "/" + zone + "/" + status);

  }

  getGrantStmtBranch(branch, year, month, code, status) {

    let resp = 'http://10.10.10.120:8084/Infosys/grantStmtBranch/' + branch + "/" + year + "/" + month + "/" + code + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/grantStmtBranch";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;
    //return this.http.get('http://10.10.10.120:8084/Infosys/grantStmtBranch/' + branch + "/" + year + "/" + month + "/" + code + "/" + status);

  }

  getFirstPremiumLapSummary(fromDate: string, toDate: string, zone: string, region: string, branch: string) {

    let resp = 'http://10.10.10.120:8084/Infosys/firstPremiumLapSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/firstPremiumLapSummary";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/firstPremiumLapSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch);

  }

  getPolicyAcknowledgement(branch: string, year: string, month: string) {

    let resp = 'http://10.10.10.120:8084/Infosys/policyAcknowledgement/' + branch + "/" + year + "/" + month;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/policyAcknowledgement";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/policyAcknowledgement/' + branch + "/" + year + "/" + month);

  }

  getSalesPerfSummaryCode(fromDate, toDate, zone, region, branch, frequency, product) {

    let resp = 'http://10.10.10.120:8084/Infosys/salesPerfSummaryCode/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + frequency + "/" + product;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/salesPerfSummaryCode";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/salesPerfSummaryCode/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + frequency + "/" + product);

  }


  getSalesPerfSummary(fromDate, toDate, zone, region, branch, frequency, product, so) {

    let resp = 'http://10.10.10.120:8084/Infosys/salesPerfSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + frequency + "/" + product + "/" + so;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/salesPerfSummary";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/salesPerfSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + frequency + "/" + product + "/" + so);

  }

  getUnitIsPerfSummary(fromDate, toDate, zone, region, branch, unl, type, frequency, product, status) {

    let resp = 'http://10.10.10.120:8084/Infosys/unitIsPerfSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + type + "/" + frequency + "/" + product + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/unitIsPerfSummary";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/unitIsPerfSummary/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + type + "/" + frequency + "/" + product + "/" + status);

  }

  getSalesPerfDetail(fromDate, toDate, code, zone, region, branch, product, frequency, status) {

    let resp = 'http://10.10.10.120:8084/Infosys/salesPerfDetail/' + fromDate + "/" + toDate + "/" + code + "/" + zone + "/" + region + "/" + branch + "/" + product + "/" + frequency + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/salesPerfDetail";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/salesPerfDetail/' + fromDate + "/" + toDate + "/" + code + "/" + zone + "/" + region + "/" + branch + "/" + product + "/" + frequency + "/" + status);

  }


  getUnitIsPerfDetails(fromDate, toDate, zone, region, branch, unl, type, frequency, product, status) {

    let resp = 'http://10.10.10.120:8084/Infosys/unitIsPerfDetails/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + type + "/" + frequency + "/" + product + "/" + status;
    let respArr: Array<string> = resp.split("/");
    let url = "http://10.10.10.120:8084/Infosys/unitIsPerfDetails";

    for (var _i = 5; _i < respArr.length; _i++) {
      var text = respArr[_i];
      var encodedString = btoa(text);
      url += "/" + encodedString;
    }
    window.open(url);

    return true;

    //return this.http.get('http://10.10.10.120:8084/Infosys/unitIsPerfDetails/' + fromDate + "/" + toDate + "/" + zone + "/" + region + "/" + branch + "/" + unl + "/" + type + "/" + frequency + "/" + product + "/" + status);

  }

  getSumAtRiskMainLife(nic) {
    return this.http.post('http://10.10.10.120:8084/Infosys/previousSumAtRisk', nic);
  }
}




