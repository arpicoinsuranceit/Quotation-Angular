import { DashboardService } from './../service/dashboard/dashboard.service';
import swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { AgentService } from './../service/agentprofile/agent.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  curUser = null;
  imgUserUrl = "assets/images/dummy.png";
  imgUserAlt = "assets/images/alt_user.png";
  userType = null;
  dashPara: string;
  dashParam: string[];
  zonecode: string = null;
  isCollapsed=false;

  private sanitizer: DomSanitizer;
  private image: any;
  private readonly imageType: string = 'data:image/PNG;base64,';

  lockReports = false;

  productArray:string[]=new Array<string>();

  constructor(private loginService: LoginService, private agentService: AgentService, private dashboardService: DashboardService,
    ) {
      // if (this.loginService.isLoggedIn()) {
      //   this.agentService.getImage()
      //     .subscribe((data) => {
      //       this.imgUserUrl = this.imageType + data.content;
      //     }, error => {
      //       this.imgUserUrl = "assets/images/dummy.png";
      //       //swal("Error", "Error code - 1451 <br> ", "error");
      //       document.onkeydown = function (e) { return true; }
      //     });
      // }

    this.init();
    this.loadActiveProducts();
  }

  ngOnInit() {
  }

  loadActiveProducts(){
    this.dashboardService.loadActiveProducts().subscribe(response => {
      this.productArray=response.json();
    }, error => {
      //swal("Error", "Error code - 1452 <br> ", "error");
      document.onkeydown = function (e) { return true; }
    });
  }

  init() {
    if (this.loginService.isLoggedIn()) {
      this.userType = sessionStorage.getItem("userType");
      this.dashboardService.getDashboardType(this.dashboardService.userCode).subscribe(response => {
        this.userType = response.json().usertype;
        this.dashPara = response.json().dashpara;
        this.dashParam = new Array();
        this.dashParam = this.dashPara.split(",");
        console.log(" -------------------------- ");
        console.log(this.dashParam);
        console.log(this.userType);
      }, error => {
        //swal("Error", "Error code - 1452 <br> ", "error");
        document.onkeydown = function (e) { return true; }
      });
    }


  }

  isLog() {
    if (this.loginService.isLoggedIn()) {
      this.curUser = this.loginService.currentUser.fullName;
    }
    return this.loginService.isLoggedIn();
  }

  logOut() {
    this.curUser = null;
    this.loginService.logOut();
  }


  getInputValues(input: any, data: string, map: Map<string, string>) {
    map.set(data, input.value);
  }

  ///////////////////////////////MCFP REPORT//////////////////////////////////
  mcfpReport() {
    this.init();
    let htmlTxt = "";
    let status = "N";
    let locName = "Zone"
    if (this.userType == "IC" || this.userType == "UNL") {
      htmlTxt = "<hr class='seperator'><div class='form-group'><label for='fromDate'>From Date</label><input type='date' id='fromDate' class='form-control'/></div>" +
        "<div class='form-group'><label for='toDate'>To Date</label><input type='date' id='toDate' class='form-control'/></div>";

    } else if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='advisor' style='padding-top:10px;text-align: justify;'>Advisor</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='advisor' class='form-control' value='ALL'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' class='form-control' value='ALL'/>";
    } else {

      if (this.userType == "BRANCH") {
        locName = "Branch";
      } else if (this.userType == "REGION") {
        locName = "Region";
      } else if (this.userType == "ZONE") {
        locName = "Zone";
      } else {
        return;
      }

      htmlTxt = "<hr class='seperator'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='advisor' style='padding-top:10px;text-align: justify;'>Advisor</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='advisor' class='form-control' value='ALL'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>" + locName + "</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";
    }

    swal({
      title: 'MCFP Report',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {

      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
        this.getInputValues(document.getElementById("toDate"), 'toDate', map);
        map.set("advisor", sessionStorage.getItem("Token"));
        status = "Y";
        if (this.userType != "IC" && this.userType != "UNL" && this.userType != "HO") {

          this.getInputValues(document.getElementById("advisor"), 'advisor', map);
          console.log(map.get('advisor'));
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          status = "N";
          console.log(map.get('branch'));
        }

        if (this.userType == "HO") {
          this.getInputValues(document.getElementById("advisor"), 'advisor', map);
          console.log(map.get('advisor'));
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";
          console.log(map.get('branch'));
        }

        this.dashboardService.getMcfpReport(map.get('fromDate'), map.get('toDate'), map.get('branch'), map.get('advisor'), status).subscribe(
          (res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
        });
      }
    });
  }

  ///////////////////////////////PROPOSAL REGISTER//////////////////////////////////
  proposalRegister() {

    this.init();
    let htmlTxt = "";

    let status = "Y";

    if (this.userType == "UNL") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='N'>No</option>" +
        "<option value='Y'>Yes</option>" +
        "</select></div></div>";

    } else if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='N'>No</option>" +
        "<option value='Y'>Yes</option>" +
        "</select></div></div>";



    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='N'>No</option>" +
        "<option value='Y'>Yes</option>" +
        "</select></div></div>";

    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value'ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='N'>No</option>" +
        "<option value='Y'>Yes</option>" +
        "</select></div></div>";

    } else if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='N'>No</option>" +
        "<option value='Y'>Yes</option>" +
        "</select></div></div>";

    } else {
      return;
    }

    swal({
      title: 'Proposal Register',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "UNL") {
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);

          this.dashboardService.getProposalRegister(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", "ALL", sessionStorage.getItem("Token"), map.get('frequency'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";
          this.dashboardService.getProposalRegister(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", map.get('branch'), map.get('code'), map.get('frequency'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });


        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";
          this.dashboardService.getProposalRegister(map.get('fromDate'), map.get('toDate'), "ALL", map.get('region'), map.get('branch'), map.get('code'), map.get('frequency'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";

          this.dashboardService.getProposalRegister(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('code'), map.get('frequency'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";

          this.dashboardService.getProposalRegister(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('code'), map.get('frequency'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });
            
        }
      }
    });

  }

  ///////////////////////////////PENDING REQUIRENMENT//////////////////////////////////
  pendingRequirements() {
    this.init();
    let htmlTxt = "";
    let status = "Y";

    if (this.userType == "IC" || this.userType == "UNL") {
      this.dashboardService.getPendingRequirements(sessionStorage.getItem("Token"), "ALL", "All", "All", status).subscribe(
        (res) => {
          var fileURL = URL.createObjectURL(res);
          window.open(fileURL); // if you want to open it in new tab
          this.lockReports=false;
          return;
      });
    }

    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='advisor' style='padding-top:10px;text-align: justify;'>Advisor</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='advisor' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='advisor' style='padding-top:10px;text-align: justify;'>Advisor</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='advisor' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='advisor' style='padding-top:10px;text-align: justify;'>Advisor</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='advisor' value='ALL' class='form-control'/></div></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt += "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='advisor' style='padding-top:10px;text-align: justify;'>Advisor</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='advisor' value='ALL' class='form-control'/></div></div></div>";

    } else {
      return;
    }

    swal({
      title: 'Pending Requirements',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("advisor"), 'advisor', map);
          console.log(map.get('advisor'));
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          status = "N";

          this.dashboardService.getPendingRequirements(map.get('advisor'), map.get('branch'), "ALL", "ALL", status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });
            

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("advisor"), 'advisor', map);
          console.log(map.get('advisor'));
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";

          this.dashboardService.getPendingRequirements(map.get('advisor'), map.get('branch'), map.get('region'), "ALL", status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("advisor"), 'advisor', map);
          console.log(map.get('advisor'));
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";

          this.dashboardService.getPendingRequirements(map.get('advisor'), map.get('branch'), map.get('region'), map.get('zone'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("advisor"), 'advisor', map);
          console.log(map.get('advisor'));
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";

          this.dashboardService.getPendingRequirements(map.get('advisor'), map.get('branch'), map.get('region'), map.get('zone'), status).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });
        }
      }
    });

  }

  ///////////////////////////////RETENTION UNIT//////////////////////////////////
  retentionUnit() {
    this.init();
    let htmlTxt = "";

    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>UNL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>UNL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>UNL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>UNL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";

    } else {
      return;
    }

    swal({
      title: 'Premium Based Persistency UNL SUM',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);

          this.dashboardService.getRetentionUnit(map.get('toDate'), "ALL", "ALL", map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getRetentionUnit(map.get('toDate'), "ALL", map.get('region'), map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getRetentionUnit(map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getRetentionUnit(map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });
        }
      }
    });
  }

  ///////////////////////////////RETENTION CODE//////////////////////////////////

  retentionCode() {

    this.init();
    let htmlTxt = "";

    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As At Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As At Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As At Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";

    } else if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As At Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div></div>";


    } else {
      return;
    }

    swal({
      title: 'Premium Based Persistency - Summary',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);

          this.dashboardService.getRetentionCode(map.get('toDate'), "ALL", "ALL", map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getRetentionCode(map.get('toDate'), "ALL", map.get('region'), map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getRetentionCode(map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('unl')).subscribe(
            (res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL); // if you want to open it in new tab
              this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getRetentionCode(map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('unl')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }
      }
    });

  }

  ///////////////////////////////RETENTION BRANCH//////////////////////////////////
  retentionBranch() {

    this.init();
    let htmlTxt = "";
    if (this.userType == "BRANCH") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='date' style='padding-top:10px;text-align: justify;'>Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='date' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";

    } else if (this.userType == "REGION") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='date' style='padding-top:10px;text-align: justify;'>Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='date' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";
    } else if (this.userType == "ZONE") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='date' style='padding-top:10px;text-align: justify;'>Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='date' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input id='region' value='ALL' class='form-control'></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";


      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='date' style='padding-top:10px;text-align: justify;'>Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='date' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input id='region' value='ALL' class='form-control'></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input id='zone' value='ALL' class='form-control'></div></div>";

    }


    swal({
      title: 'Premium Based Persistency Summary',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("date"), 'date', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);

          this.dashboardService.getRetentionBranch(map.get('date'), "ALL", "ALL", map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("date"), 'date', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);

          this.dashboardService.getRetentionBranch(map.get('date'), "ALL", map.get('region'), map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("date"), 'date', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);

          this.dashboardService.getRetentionBranch(map.get('date'), map.get('zone'), map.get('region'), map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("date"), 'date', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);

          this.dashboardService.getRetentionBranch(map.get('date'), map.get('zone'), map.get('region'), map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }
      }
    });
  }

  ///////////////////////////////DETAILS OF POLICY//////////////////////////////////
  detailsOfPolicies() {

    this.init();
    let htmlTxt = "";
    let status = "N";
    if (this.userType == "IC") {
      htmlTxt = "<hr class='seperator'><div class='form-group'><label for='fromDate'>From Date</label><input type='date' id='fromDate' class='form-control'/></div>" +
        "<div class='form-group'><label for='toDate'>To Date</label><input type='date' id='toDate' class='form-control'/></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sp' style='padding-top:10px;text-align: justify;'>SP</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='sp' class='form-control'>" +
        "<option value='1'>Yes</option>" +
        "<option value='0'>No</option></select></div></div>";


    } else if (this.userType == "UNL") {
      htmlTxt = "<hr class='seperator'><div class='form-group'><label for='fromDate'>From Date</label><input type='date' id='fromDate' class='form-control'/></div>" +
        "<div class='form-group'><label for='toDate'>To Date</label><input type='date' id='toDate' class='form-control'/></div>" +
        "<div class='form-group'><label for='ic'>IC</label><input type='text' id='ic' value='ALL' class='form-control'/></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sp' style='padding-top:10px;text-align: justify;'>SP</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='sp' class='form-control'>" +
        "<option value='1'>Yes</option>" +
        "<option value='0'>No</option></select></div></div>";



    } else if (this.userType == "BRANCH") {

      htmlTxt = "<hr class='seperator'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ic' style='padding-top:10px;text-align: justify;'>IC</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ic' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ul' style='padding-top:10px;text-align: justify;'>UL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ul' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sp' style='padding-top:10px;text-align: justify;'>SP</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='sp' class='form-control'>" +
        "<option value='1'>Yes</option>" +
        "<option value='0'>No</option></select></div></div>";

    } else if (this.userType == "REGION") {


      htmlTxt = "<hr class='seperator'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ic' style='padding-top:10px;text-align: justify;'>IC</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ic' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ul' style='padding-top:10px;text-align: justify;'>UL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ul' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sp' style='padding-top:10px;text-align: justify;'>SP</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='sp' class='form-control'>" +
        "<option value='1'>Yes</option>" +
        "<option value='0'>No</option></select></div></div>";

    } else if (this.userType == "ZONE") {

      htmlTxt = "<hr class='seperator'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ic' style='padding-top:10px;text-align: justify;'>IC</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ic' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ul' style='padding-top:10px;text-align: justify;'>UL/label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ul' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' value='ALL' id='branch' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' value='ALL' id='region' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";


      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }
      htmlTxt += "</select></div></div>" + "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sp' style='padding-top:10px;text-align: justify;'>SP</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='sp' class='form-control'>" +
        "<option value='1'>Yes</option>" +
        "<option value='0'>No</option></select></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ic' style='padding-top:10px;text-align: justify;'>IC</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ic' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='ul' style='padding-top:10px;text-align: justify;'>UL</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='ul' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' value='ALL' id='branch' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' value='ALL' id='region' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' value='ALL' id='zone' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sp' style='padding-top:10px;text-align: justify;'>SP</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='sp' class='form-control'>" +
        "<option value='1'>Yes</option>" +
        "<option value='0'>No</option></select></div></div>";


    } else {
      return;
    }


    swal({
      title: 'Details Of Policies',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "IC") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("sp"), 'sp', map);
          status = "ic";
          this.dashboardService.getDetailsOfPolicies(map.get('fromDate'), map.get('toDate'), sessionStorage.getItem("Token"), "ALL", "ALL", "ALL", "ALL", map.get('sp'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "UNL") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("ic"), 'ic', map);
          this.getInputValues(document.getElementById("sp"), 'sp', map);

          status = "ul";
          this.dashboardService.getDetailsOfPolicies(map.get('fromDate'), map.get('toDate'), map.get('ic'), sessionStorage.getItem("Token"), "ALL", "ALL", "ALL", map.get('sp'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("ic"), 'ic', map);
          this.getInputValues(document.getElementById("ul"), 'ul', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("sp"), 'sp', map);

          this.dashboardService.getDetailsOfPolicies(map.get('fromDate'), map.get('toDate'), map.get('ic'), map.get('ul'), map.get('branch'), "ALL", "ALL", map.get('sp'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("ic"), 'ic', map);
          this.getInputValues(document.getElementById("ul"), 'ul', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("sp"), 'sp', map);

          this.dashboardService.getDetailsOfPolicies(map.get('fromDate'), map.get('toDate'), map.get('ic'), map.get('ul'), map.get('branch'), map.get('region'), "ALL", map.get('sp'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("ic"), 'ic', map);
          this.getInputValues(document.getElementById("ul"), 'ul', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("sp"), 'sp', map);


          this.dashboardService.getDetailsOfPolicies(map.get('fromDate'), map.get('toDate'), map.get('ic'), map.get('ul'), map.get('branch'), map.get('region'), map.get('zone'), map.get('sp'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("ic"), 'ic', map);
          this.getInputValues(document.getElementById("ul"), 'ul', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("sp"), 'sp', map);


          this.dashboardService.getDetailsOfPolicies(map.get('fromDate'), map.get('toDate'), map.get('ic'), map.get('ul'), map.get('branch'), map.get('region'), map.get('zone'), map.get('sp'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }
      }

    });

  }

  ///////////////////////////////PREMIUM DEV REPORT LIVE//////////////////////////////////
  premiumDueReportLive() {
    this.init();
    let htmlTxt = "";

    if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch'value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>";


    }

    if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>";


    }

    swal({
      title: 'Premium Due Report Live',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getPremiumDueReportLive(map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), map.get('zone')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }

        if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          console.log(map.get('unl'));
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getPremiumDueReportLive(map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), map.get('zone')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }
      }
    });

  }

  ///////////////////////////////PREMIUM DUE REPORT//////////////////////////////////
  premiumDueReport() {

    this.init();
    let htmlTxt = "";

    let status = "Y";

    if (this.userType == "IC" || this.userType == "UNL") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>";

    } else if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>";



    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>As at Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>";


    } else {
      return;
    }

    swal({
      title: 'Premium Due Report',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "IC" || this.userType == "UNL") {
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);

          this.dashboardService.getPremiumDueReport(map.get('toDate'), sessionStorage.getItem("Token"), "ALL", "ALL", "ALL", status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          status = "N";
          this.dashboardService.getPremiumDueReport(map.get('toDate'), map.get('code'), map.get('branch'), "ALL", "ALL", status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";
          this.dashboardService.getPremiumDueReport(map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), "ALL", status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";
          this.dashboardService.getPremiumDueReport(map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), map.get('zone'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          status = "N";
          this.dashboardService.getPremiumDueReport(map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), map.get('zone'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }
      }
    });

  }

  ///////////////////////////////GRANT STMT BRANCH//////////////////////////////////
  grantStmtBranch() {

    this.init();
    let htmlTxt = "";

    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +

        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='year' style='padding-top:10px;text-align: justify;'>Year</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='year' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='monthCombo' style='padding-top:10px;text-align: justify;'>Month</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='monthCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>January</option>" +
        "<option value='2'>February</option>" +
        "<option value='3'>March</option>" +
        "<option value='4'>April</option>" +
        "<option value='5'>May</option>" +
        "<option value='6'>June</option>" +
        "<option value='7'>July</option>" +
        "<option value='8'>August</option>" +
        "<option value='9'>September</option>" +
        "<option value='10'>October</option>" +
        "<option value='11'>November</option>" +
        "<option value='12'>December</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='statusCombo' style='padding-top:10px;text-align: justify;'>Status</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='statusCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='INA'>INA</option>" +
        "<option value='TER'>TER</option>" +
        "<option value='RES'>RES</option>" +
        "<option value='ACT'>ACT</option></select></div></div>";


    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='year' style='padding-top:10px;text-align: justify;'>Year</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='year' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='monthCombo' style='padding-top:10px;text-align: justify;'>Month</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='monthCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>January</option>" +
        "<option value='2'>February</option>" +
        "<option value='3'>March</option>" +
        "<option value='4'>April</option>" +
        "<option value='5'>May</option>" +
        "<option value='6'>June</option>" +
        "<option value='7'>July</option>" +
        "<option value='8'>August</option>" +
        "<option value='9'>September</option>" +
        "<option value='10'>October</option>" +
        "<option value='11'>November</option>" +
        "<option value='12'>December</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='statusCombo' style='padding-top:10px;text-align: justify;'>Status</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='statusCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='INA'>INA</option>" +
        "<option value='TER'>TER</option>" +
        "<option value='RES'>RES</option>" +
        "<option value='ACT'>ACT</option></select></div></div>";

    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='year' style='padding-top:10px;text-align: justify;'>Year</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='year' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='monthCombo' style='padding-top:10px;text-align: justify;'>Month</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='monthCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>January</option>" +
        "<option value='2'>February</option>" +
        "<option value='3'>March</option>" +
        "<option value='4'>April</option>" +
        "<option value='5'>May</option>" +
        "<option value='6'>June</option>" +
        "<option value='7'>July</option>" +
        "<option value='8'>August</option>" +
        "<option value='9'>September</option>" +
        "<option value='10'>October</option>" +
        "<option value='11'>November</option>" +
        "<option value='12'>December</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='statusCombo' style='padding-top:10px;text-align: justify;'>Status</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='statusCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='INA'>INA</option>" +
        "<option value='TER'>TER</option>" +
        "<option value='RES'>RES</option>" +
        "<option value='ACT'>ACT</option></select></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='year' style='padding-top:10px;text-align: justify;'>Year</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='year' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='monthCombo' style='padding-top:10px;text-align: justify;'>Month</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='monthCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>January</option>" +
        "<option value='2'>February</option>" +
        "<option value='3'>March</option>" +
        "<option value='4'>April</option>" +
        "<option value='5'>May</option>" +
        "<option value='6'>June</option>" +
        "<option value='7'>July</option>" +
        "<option value='8'>August</option>" +
        "<option value='9'>September</option>" +
        "<option value='10'>October</option>" +
        "<option value='11'>November</option>" +
        "<option value='12'>December</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='statusCombo' style='padding-top:10px;text-align: justify;'>Status</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='statusCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='INA'>INA</option>" +
        "<option value='TER'>TER</option>" +
        "<option value='RES'>RES</option>" +
        "<option value='ACT'>ACT</option></select></div></div>";


    } else {
      return;
    }

    swal({
      title: 'Business Grant Statement',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {
      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("year"), 'year', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("monthCombo"), 'month', map);
          this.getInputValues(document.getElementById("statusCombo"), 'status', map);

          this.dashboardService.getGrantStmtBranch(map.get('branch'), map.get('year'), map.get('month'), map.get('code'), map.get('status')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("year"), 'year', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("regionCombo"), 'branch', map);
          this.getInputValues(document.getElementById("monthCombo"), 'month', map);
          this.getInputValues(document.getElementById("statusCombo"), 'status', map);

          this.dashboardService.getGrantStmtBranch(map.get('branch'), map.get('year'), map.get('month'), map.get('code'), map.get('status')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("year"), 'year', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'branch', map);
          this.getInputValues(document.getElementById("monthCombo"), 'month', map);
          this.getInputValues(document.getElementById("statusCombo"), 'status', map);

          this.dashboardService.getGrantStmtBranch(map.get('branch'), map.get('year'), map.get('month'), map.get('code'), map.get('status')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("year"), 'year', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("monthCombo"), 'month', map);
          this.getInputValues(document.getElementById("statusCombo"), 'status', map);

          this.dashboardService.getGrantStmtBranch(map.get('branch'), map.get('year'), map.get('month'), map.get('code'), map.get('status')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }
      }
    });

  }

  ///////////////////////////////FIRST PREMIUM LAP SUMMARY//////////////////////////////////
  firstPremiumLapSummary() {

    this.init();
    let htmlTxt = "";
    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";

    } else if (this.userType == "REGION") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";

    } else if (this.userType == "ZONE") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>";

    }

    swal({
      title: 'First Premium Lap Summary',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);

          console.log(map.get('branch'));

          this.dashboardService.getFirstPremiumLapSummary(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);

          this.dashboardService.getFirstPremiumLapSummary(map.get('fromDate'), map.get('toDate'), "ALL", map.get('region'), map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);

          this.dashboardService.getFirstPremiumLapSummary(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);

          this.dashboardService.getFirstPremiumLapSummary(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }
      }

    });

  }

  ///////////////////////////////POLICY ACKNOWLEDGEMENT//////////////////////////////////
  policyAcknowledgement() {

    this.init();
    let htmlTxt = "";

    if (this.userType == "BRANCH" || this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='year' style='padding-top:10px;text-align: justify;'>Year</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='year' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='month' style='padding-top:10px;text-align: justify;'>Month</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='monthCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>January</option>" +
        "<option value='2'>February</option>" +
        "<option value='3'>March</option>" +
        "<option value='4'>April</option>" +
        "<option value='5'>May</option>" +
        "<option value='6'>June</option>" +
        "<option value='7'>July</option>" +
        "<option value='8'>August</option>" +
        "<option value='9'>September</option>" +
        "<option value='10'>October</option>" +
        "<option value='11'>November</option>" +
        "<option value='12'>December</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }


    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='year' style='padding-top:10px;text-align: justify;'>Year</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='year' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='month' style='padding-top:10px;text-align: justify;'>Month</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='monthCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>January</option>" +
        "<option value='2'>February</option>" +
        "<option value='3'>March</option>" +
        "<option value='4'>April</option>" +
        "<option value='5'>May</option>" +
        "<option value='6'>June</option>" +
        "<option value='7'>July</option>" +
        "<option value='8'>August</option>" +
        "<option value='9'>September</option>" +
        "<option value='10'>October</option>" +
        "<option value='11'>November</option>" +
        "<option value='12'>December</option></select></div></div>" +
        "<div class='form-group'><div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>";


    } else {
      return;
    }

    swal({
      title: 'Policy Acknowledgement',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {
      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "BRANCH" || this.userType == "REGION") {

          this.getInputValues(document.getElementById("year"), 'year', map);
          this.getInputValues(document.getElementById("monthCombo"), 'month', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);


          this.dashboardService.getPolicyAcknowledgement(map.get('branch'), map.get('year'), map.get('month')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("year"), 'year', map);
          this.getInputValues(document.getElementById("monthCombo"), 'month', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);


          this.dashboardService.getPolicyAcknowledgement(map.get('branch'), map.get('year'), map.get('month')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }
      }
    });

  }

  ///////////////////////////////SALES PERFORMANCE SUMMARY CODE//////////////////////////////////
  salesPerfSummaryCode() {

    this.init();
    let htmlTxt = "";

    let status = "Y";

    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";



    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";


    } else if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";


    }

    swal({
      title: 'Sales Performance Summary - Codes Wise',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);

          this.dashboardService.getSalesPerfSummaryCode(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", map.get('branch'), map.get('frequency'), map.get('product')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);

          this.dashboardService.getSalesPerfSummaryCode(map.get('fromDate'), map.get('toDate'), "ALL", map.get('region'), map.get('branch'), map.get('frequency'), map.get('product')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);

          this.dashboardService.getSalesPerfSummaryCode(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('frequency'), map.get('product')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);

          this.dashboardService.getSalesPerfSummaryCode(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('frequency'), map.get('product')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }
      }
    });
  }

  ///////////////////////////////SALES PERFORMANCE SUMMARY//////////////////////////////////
  salesPerfSummary() {

    this.init();
    let htmlTxt = "";

    let status = "Y";

    if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='singleCombo' style='padding-top:10px;text-align: justify;'>Single/Other</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='singleCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='0'>OTHER</option>" +
        "<option value='1'>SINGLE</option>" +
        "</select></div></div>";



    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='singleCombo' style='padding-top:10px;text-align: justify;'>Single / Other </label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='singleCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='0'>OTHER</option>" +
        "<option value='1'>SINGLE</option>" +
        "</select></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='singleCombo' style='padding-top:10px;text-align: justify;'>Single/Other</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='singleCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='0'>OTHER</option>" +
        "<option value='1'>SINGLE</option>" +
        "</select></div></div>";


    } else if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='singleCombo' style='padding-top:10px;text-align: justify;'>Single/Other</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='singleCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='0'>OTHER</option>" +
        "<option value='1'>SINGLE</option>" +
        "</select></div></div>";


    }

    swal({
      title: 'Sales Performance Summary',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("singleCombo"), 'single', map);
          status = "N";
          this.dashboardService.getSalesPerfSummary(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", map.get('branch'), map.get('frequency'), map.get('product'), map.get('single')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("singleCombo"), 'single', map);
          status = "N";
          this.dashboardService.getSalesPerfSummary(map.get('fromDate'), map.get('toDate'), "ALL", map.get('region'), map.get('branch'), map.get('frequency'), map.get('product'), map.get('single')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("singleCombo"), 'single', map);
          status = "N";
          this.dashboardService.getSalesPerfSummary(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('frequency'), map.get('product'), map.get('single')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("singleCombo"), 'single', map);
          status = "N";
          this.dashboardService.getSalesPerfSummary(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('frequency'), map.get('product'), map.get('single')).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }
      }
    });

  }

  ///////////////////////////////UNIT PERFORMANCE SUMMARY//////////////////////////////////
  unitIsPerfSummary() {

    this.init();
    let htmlTxt = "";

    let status = "Y";
    //NU,P,NI,PU,PI,NP
    if (this.userType == "UNL") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='NU'>NU</option>" +
        "<option value='P'>P</option>" +
        "<option value='NI'>NI</option>" +
        "<option value='PU'>PU</option>" +
        "<option value='PI'>PI</option>" +
        "<option value='NP'>NP</option></select></div></div>";

    } else if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='NU'>NU</option>" +
        "<option value='P'>P</option>" +
        "<option value='NI'>NI</option>" +
        "<option value='PU'>PU</option>" +
        "<option value='PI'>PI</option>" +
        "<option value='NP'>NP</option></select></div></div>";



    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='NU'>NU</option>" +
        "<option value='P'>P</option>" +
        "<option value='NI'>NI</option>" +
        "<option value='PU'>PU</option>" +
        "<option value='PI'>PI</option>" +
        "<option value='NP'>NP</option></select></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='NU'>NU</option>" +
        "<option value='P'>P</option>" +
        "<option value='NI'>NI</option>" +
        "<option value='PU'>PU</option>" +
        "<option value='PI'>PI</option>" +
        "<option value='NP'>NP</option></select></div></div>";


    } else if (this.userType == "HO") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>UNL Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='NU'>NU</option>" +
        "<option value='P'>P</option>" +
        "<option value='NI'>NI</option>" +
        "<option value='PU'>PU</option>" +
        "<option value='PI'>PI</option>" +
        "<option value='NP'>NP</option></select></div></div>";


    }

    swal({
      title: 'Business Performance Details UNL',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "UNL") {
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);

          this.dashboardService.getUnitIsPerfSummary(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", "ALL", sessionStorage.getItem("Token"), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);
          status = "N";
          this.dashboardService.getUnitIsPerfSummary(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", map.get('branch'), map.get('code'), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);
          status = "N";
          this.dashboardService.getUnitIsPerfSummary(map.get('fromDate'), map.get('toDate'), "ALL", map.get('region'), map.get('branch'), map.get('code'), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);
          status = "N";
          this.dashboardService.getUnitIsPerfSummary(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('code'), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);
          status = "N";
          this.dashboardService.getUnitIsPerfSummary(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('code'), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }
      }
    });
  }

  ///////////////////////////////SALES PERFORMANCE DETAILS//////////////////////////////////
  salesPerfDetail() {

    this.init();
    let htmlTxt = "";

    let status = "Y";

    if (this.userType == "IC" || this.userType == "UNL") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";

    } else if (this.userType == "BRANCH") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branchCombo' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='branchCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";



    } else if (this.userType == "REGION") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='regionCombo' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='regionCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";


    } else if (this.userType == "ZONE") {
      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zoneCombo' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='zoneCombo' class='form-control'>";

      for (let i = 0; i < this.dashParam.length; i++) {
        htmlTxt += "<option value=" + this.dashParam[i] + ">" + this.dashParam[i] + "</option>";
      }

      htmlTxt += "</select></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";

    } else if (this.userType == "HO") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='code' style='padding-top:10px;text-align: justify;'>Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='code' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>";

    } else {
      return;
    }

    swal({
      title: 'Sales Performance Detail',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {

      let map = new Map<string, string>();

      if (resp.value == true) {
        this.lockReports = true;

        if (this.userType == "IC" || this.userType == "UNL") {
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);

          this.dashboardService.getSalesPerfDetail(map.get('fromDate'), map.get('toDate'), sessionStorage.getItem("Token"), "ALL", "ALL", "ALL", map.get('product'), map.get('frequency'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "BRANCH") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("branchCombo"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";
          this.dashboardService.getSalesPerfDetail(map.get('fromDate'), map.get('toDate'), map.get('code'), map.get('branch'), "ALL", "ALL", map.get('product'), map.get('frequency'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "REGION") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("regionCombo"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";
          this.dashboardService.getSalesPerfDetail(map.get('fromDate'), map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), "ALL", map.get('product'), map.get('frequency'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        } else if (this.userType == "ZONE") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zoneCombo"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";
          this.dashboardService.getSalesPerfDetail(map.get('fromDate'), map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), map.get('zone'), map.get('product'), map.get('frequency'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else if (this.userType == "HO") {

          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("code"), 'code', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          status = "N";
          this.dashboardService.getSalesPerfDetail(map.get('fromDate'), map.get('toDate'), map.get('code'), map.get('branch'), map.get('region'), map.get('zone'), map.get('product'), map.get('frequency'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        } else {
          return;
        }
      }
    });
  }

  ///////////////////////////////UNIT IS PERFORMANCE DETAILS//////////////////////////////////
  unitIsPerfDetails() {

    this.init();
    let htmlTxt = "";

    let status = "Y";
    //NU,P,NI,PU,PI,NP
    if (this.userType == "UNL") {

      htmlTxt = "<hr class='seperator'>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='END1'>END1</option>" +
        "<option value='ARP'>ARP</option>" +
        "<option value='ASFP'>ASFP</option>" +
        "<option value='INVP'>INVP</option>" +
        "<option value='ATRM'>ATRM</option>" +
        "<option value='ASIP'>ASIP</option>" +
        "<option value='AIP'>AIP</option>" +
        "<option value='DTA'>DTA</option>" +
        "<option value='DTAPL'>DTAPL</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='1'>Monthly</option>" +
        "<option value='12'>Yearly</option>" +
        "<option value='3'>Quartely</option>" +
        "<option value='6'>Half Yearly</option>" +
        "<option value='S'>Single</option></select></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
        "<option value='ALL'>ALL</option>" +
        "<option value='NU'>NU</option>" +
        "<option value='P'>P</option>" +
        "<option value='NI'>NI</option>" +
        "<option value='PU'>PU</option>" +
        "<option value='PI'>PI</option>" +
        "<option value='NP'>NP</option></select></div></div>";
    }else if(this.userType == "HO"){
      htmlTxt = "<hr class='seperator'>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='fromDate' style='padding-top:10px;text-align: justify;'>From Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='fromDate' class='form-control'/></div></div>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='toDate' style='padding-top:10px;text-align: justify;'>To Date</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='date' id='toDate' class='form-control'/></div></div>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='zone' style='padding-top:10px;text-align: justify;'>Zone</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='zone' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='region' style='padding-top:10px;text-align: justify;'>Region</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='region' value='ALL' class='form-control'/></div></div>" +
        "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='branch' style='padding-top:10px;text-align: justify;'>Branch</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='branch' value='ALL' class='form-control'/></div></div>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='unl' style='padding-top:10px;text-align: justify;'>Unl Code</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='unl' value='ALL' class='form-control'/></div></div>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='productCombo' style='padding-top:10px;text-align: justify;'>Product</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='productCombo' class='form-control'>" +
      "<option value='ALL'>ALL</option>" +
      "<option value='END1'>END1</option>" +
      "<option value='ARP'>ARP</option>" +
      "<option value='ASFP'>ASFP</option>" +
      "<option value='INVP'>INVP</option>" +
      "<option value='ATRM'>ATRM</option>" +
      "<option value='ASIP'>ASIP</option>" +
      "<option value='AIP'>AIP</option>" +
      "<option value='DTA'>DTA</option>" +
      "<option value='DTAPL'>DTAPL</option></select></div></div>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='frequencyCombo' style='padding-top:10px;text-align: justify;'>Frequency</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='frequencyCombo' class='form-control'>" +
      "<option value='ALL'>ALL</option>" +
      "<option value='1'>Monthly</option>" +
      "<option value='12'>Yearly</option>" +
      "<option value='3'>Quartely</option>" +
      "<option value='6'>Half Yearly</option>" +
      "<option value='S'>Single</option></select></div></div>" +
      "<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='typeCombo' style='padding-top:10px;text-align: justify;'>Type</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><select id='typeCombo' class='form-control'>" +
      "<option value='ALL'>ALL</option>" +
      "<option value='NU'>NU</option>" +
      "<option value='P'>P</option>" +
      "<option value='NI'>NI</option>" +
      "<option value='PU'>PU</option>" +
      "<option value='PI'>PI</option>" +
      "<option value='NP'>NP</option></select></div></div>";
    
    } else {
      return;
    }

    swal({
      title: 'Business Performance Summary - UNL',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.lockReports = true;
        if (this.userType == "UNL") {
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);

          this.dashboardService.getUnitIsPerfDetails(map.get('fromDate'), map.get('toDate'), "ALL", "ALL", "ALL", sessionStorage.getItem("Token"), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });
        }else if(this.userType == "HO"){

          status="N";
          this.getInputValues(document.getElementById("toDate"), 'toDate', map);
          this.getInputValues(document.getElementById("fromDate"), 'fromDate', map);
          this.getInputValues(document.getElementById("productCombo"), 'product', map);
          this.getInputValues(document.getElementById("frequencyCombo"), 'frequency', map);
          this.getInputValues(document.getElementById("typeCombo"), 'type', map);
          this.getInputValues(document.getElementById("unl"), 'unl', map);
          this.getInputValues(document.getElementById("zone"), 'zone', map);
          this.getInputValues(document.getElementById("region"), 'region', map);
          this.getInputValues(document.getElementById("branch"), 'branch', map);

          this.dashboardService.getUnitIsPerfDetails(map.get('fromDate'), map.get('toDate'), map.get('zone'), map.get('region'), map.get('branch'), map.get('unl'), map.get('type'), map.get('frequency'), map.get('product'), status).subscribe((res) => {
            var fileURL = URL.createObjectURL(res);
            window.open(fileURL); // if you want to open it in new tab
            this.lockReports=false;
          });

        }
      }

    });

  }

  // loadDashboard(){
    
  //   var dashPara=sessionStorage.getItem("dashpara");
  //   var userType=sessionStorage.getItem("userType");
  //   var token=sessionStorage.getItem("Token");

  //   var encodedDashPara = btoa(dashPara);
  //   var encodeduserType = btoa(userType);

  //   window.open('http://localhost:4201?dashPara='+encodedDashPara+'&userType='+encodeduserType+'&token='+token+'/');
  // }


}
