import { Router } from '@angular/router/';
import { LoginService } from './../../service/login.service';
import swal from 'sweetalert2';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommitmentService } from '../../service/commitment/commitment.service';

@Component({
  selector: 'app-commitment',
  templateUrl: './commitment.component.html',
  styleUrls: ['./commitment.component.css']
})
export class CommitmentComponent implements OnInit {

  editing = {};
  rows = new Array<BranchTargetSummary>();
  userType:string;
  dashPara: string;
  dashParam: string[];
  zonecode:string = null;
  isDisableDiv = false;

  constructor(private dashboardService: DashboardService,private commitmentdService: CommitmentService,private loginService: LoginService,
  private router: Router) {
        
    if(!sessionStorage.getItem("Token")){
      this.loginService.navigateLigin();
    }

    this.userType=sessionStorage.getItem("userType");
    this.dashPara=sessionStorage.getItem("dashpara");

    if(this.userType=="HO"){
      this.dashParam = new Array();
      this.commitmentdService.getAllZoneCode().subscribe(response => {
        if(response.json() != null){
          this.dashParam=response.json();
        }
      }, error => {
        swal("Error", error.text(), "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }else{
      this.dashParam = new Array();
      this.dashParam = this.dashPara.split(",");
    }

    

    if(this.userType=="BRANCH"){
      //console.log(this.dashParam[0]);
      this.commitmentdService.getZoneCode(this.dashParam[0]).subscribe(response => {
        this.zonecode=response.text();
        sessionStorage.setItem("ZoneCode",this.zonecode);
        if(this.zonecode != "SOU" && this.zonecode != "WEST" && this.zonecode != "NCN"){
          this.router.navigate(['/denied'], { skipLocationChange: true });
        }
      }, error => {
        swal("Error", error.text(), "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }
    

  }

  ngOnInit() {
  }


  form_zone_commitment = new FormGroup({
    zoneYear : new FormControl('',Validators.required),
    zoneCode  :new FormControl()
  });

  form_branch_commitment = new FormGroup({
    brnYear : new FormControl('',Validators.required),
    brnCode  :new FormControl()
  });

  get zoneYear(){
    return this.form_zone_commitment.get("zoneYear");
  }

  get zoneCode(){
    return this.form_zone_commitment.get("zoneCode");
  }

  get brnYear(){
    return this.form_branch_commitment.get("brnYear");
  }

  get brnCode(){
    return this.form_branch_commitment.get("brnCode");
  }


  loadDataBranch(){
    if((this.brnYear.value != undefined && this.brnYear.value != null) && 
    (this.brnCode.value != undefined && this.brnCode.value != null)){
      this.isDisableDiv=true;
      this.commitmentdService.getBranchTargetCommitmentSummaryBranchM(this.brnYear.value,this.brnCode.value)
      .subscribe(response => {
        //console.log(response.json());
        this.rows=response.json();
        this.isDisableDiv=false;
      }, error => {
        swal("Error", error.text(), "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }
  }

  loadData(){
    if((this.zoneCode.value != undefined && this.zoneCode.value != null) && 
    (this.zoneYear.value != undefined && this.zoneYear.value != null)){
      this.isDisableDiv=true;
      this.commitmentdService.getBranchTargetCommitmentSummaryZonalM(this.zoneYear.value,this.zoneCode.value)
      .subscribe(response => {
        //console.log(response.json());
        this.rows=response.json();
        this.isDisableDiv=false;
      }, error => {
        swal("Error", error.text(), "error");
        document.onkeydown = function (e) { return true; }
        this.isDisableDiv = false;
      });
    }
  }

  editTarget(commitment:BranchTargetSummary){
    let htmlTxt = "<hr class='seperator'>";
    
      if(commitment.janCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='janCom' style='padding-top:10px;text-align: justify;'>January</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='janCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='janCom' style='padding-top:10px;text-align: justify;'>January</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='janCom' class='form-control' value='"+commitment.janCommitment+"' readonly='readonly'/></div></div>";
      }

      if(commitment.febCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='febCom' style='padding-top:10px;text-align: justify;'>February</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='febCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='febCom' style='padding-top:10px;text-align: justify;'>February</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='febCom' class='form-control' value='"+commitment.febCommitment+"' readonly='readonly'/></div></div>";
      }

      if(commitment.marCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='marCom' style='padding-top:10px;text-align: justify;'>March</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='marCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='marCom' style='padding-top:10px;text-align: justify;'>March</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='marCom' class='form-control' value='"+commitment.marCommitment+"' readonly='readonly'/></div></div>";
      }

      if(commitment.aprCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='aprCom' style='padding-top:10px;text-align: justify;'>April</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='aprCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='aprCom' style='padding-top:10px;text-align: justify;'>April</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='aprCom' class='form-control' value='"+commitment.aprCommitment+"' readonly='readonly'/></div></div>";

      }

      if(commitment.mayCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='mayCom' style='padding-top:10px;text-align: justify;'>May</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='mayCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='mayCom' style='padding-top:10px;text-align: justify;'>May</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='mayCom' class='form-control' value='"+commitment.mayCommitment+"' readonly='readonly'/></div></div>";

      }

      if(commitment.junCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='junCom' style='padding-top:10px;text-align: justify;'>June</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='junCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='junCom' style='padding-top:10px;text-align: justify;'>June</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='junCom' class='form-control' value='"+commitment.junCommitment+"' readonly='readonly'/></div></div>";

      }

      if(commitment.julCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='julCom' style='padding-top:10px;text-align: justify;'>July</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='julCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='julCom' style='padding-top:10px;text-align: justify;'>July</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='julCom' class='form-control' value='"+commitment.julCommitment+"' readonly='readonly'/></div></div>";

      }
      if(commitment.augCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='augCom' style='padding-top:10px;text-align: justify;'>August</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='augCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='augCom' style='padding-top:10px;text-align: justify;'>August</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='augCom' class='form-control' value='"+commitment.augCommitment+"' readonly='readonly'/></div></div>";

      }
      if(commitment.sepCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sepCom' style='padding-top:10px;text-align: justify;'>September</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='sepCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='sepCom' style='padding-top:10px;text-align: justify;'>September</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='sepCom' class='form-control' value='"+commitment.sepCommitment+"' readonly='readonly'/></div></div>";

      }
      if(commitment.octCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='octCom' style='padding-top:10px;text-align: justify;'>October</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='octCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='octCom' style='padding-top:10px;text-align: justify;'>October</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='octCom' class='form-control' value='"+commitment.octCommitment+"' readonly='readonly'/></div></div>";

      }
      if(commitment.novCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='novCom' style='padding-top:10px;text-align: justify;'>November</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='novCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='novCom' style='padding-top:10px;text-align: justify;'>November</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='novCom' class='form-control' value='"+commitment.novCommitment+"' readonly='readonly'/></div></div>";

      }
      if(commitment.decCommitment <= 0){
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='decCom' style='padding-top:10px;text-align: justify;'>December</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='decCom' class='form-control' value='0'/></div></div>";
      }else{
        htmlTxt+="<div class='form-group'><div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'><label for='decCom' style='padding-top:10px;text-align: justify;'>December</label></div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'><input type='text' id='decCom' class='form-control' value='"+commitment.decCommitment+"' readonly='readonly'/></div></div>";

      }

    swal({
      title: 'Edit Commitment Target',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true

    }).then((resp) => {
      let map = new Map<string, number>();

      if(resp.value == true){
        this.getInputValues(document.getElementById("janCom"), 'janCom', map);
        this.getInputValues(document.getElementById("febCom"), 'febCom', map);
        this.getInputValues(document.getElementById("marCom"), 'marCom', map);
        this.getInputValues(document.getElementById("aprCom"), 'aprCom', map);
        this.getInputValues(document.getElementById("mayCom"), 'mayCom', map);
        this.getInputValues(document.getElementById("junCom"), 'junCom', map);
        this.getInputValues(document.getElementById("julCom"), 'julCom', map);
        this.getInputValues(document.getElementById("augCom"), 'augCom', map);
        this.getInputValues(document.getElementById("sepCom"), 'sepCom', map);
        this.getInputValues(document.getElementById("octCom"), 'octCom', map);
        this.getInputValues(document.getElementById("novCom"), 'novCom', map);
        this.getInputValues(document.getElementById("decCom"), 'decCom', map);

        let updatedCommitment=new BranchTargetSummary(commitment.year,commitment.locationCode,commitment.regionCode,commitment.zoneCode,commitment.para,
          commitment.locationName,map.get("janCom"),map.get("febCom"),map.get("marCom"),map.get("aprCom"),map.get("mayCom"),
          map.get("junCom"),map.get("julCom"),map.get("augCom"),map.get("sepCom"),map.get("octCom"),map.get("novCom"),map.get("decCom"));

        this.commitmentdService.editCommitment(updatedCommitment).subscribe(response => {
          //console.log(response.text());
          if(response.text() == '1'){
            swal("Good Job..","Commitment Target Updated Successfully","success");
            if(this.userType == 'BRANCH'){
              this.loadDataBranch();
            }else{
              this.loadData();
            }
          }
        }, error => {
          swal("Error", error.text() , "error");
          document.onkeydown = function (e) { return true; }
          this.isDisableDiv = false;
        });
      }
    });
  }

  getInputValues(input: any, data: string, map: Map<string, number>) {
    map.set(data, input.value);
  }

}

export class BranchTargetSummary{
  year:string;
	locationCode:string;
	regionCode:string;
	zoneCode:string;
  para:string;
  locationName:string;
	janCommitment:number;
	febCommitment:number;
	marCommitment:number;
	aprCommitment:number;
	mayCommitment:number;
	junCommitment:number;
	julCommitment:number;
	augCommitment:number;
	sepCommitment:number;
	octCommitment:number;
	novCommitment:number;
	decCommitment:number;

  constructor(year:string,
    locationCode:string,
    regionCode:string,
    zoneCode:string,
    para:string,
    locationName:string,
    janCommitment:number,
    febCommitment:number,
    marCommitment:number,
    aprCommitment:number,
    mayCommitment:number,
    junCommitment:number,
    julCommitment:number,
    augCommitment:number,
    sepCommitment:number,
    octCommitment:number,
    novCommitment:number,
    decCommitment:number){
      this.year=year;
      this.locationCode=locationCode;
      this.regionCode=regionCode;
      this.zoneCode=zoneCode;
      this.para=para;
      this.janCommitment=janCommitment;
      this.febCommitment=febCommitment;
      this.marCommitment=marCommitment;
      this.aprCommitment=aprCommitment;
      this.mayCommitment=mayCommitment;
      this.junCommitment=junCommitment;
      this.julCommitment=julCommitment;
      this.augCommitment=augCommitment;
      this.sepCommitment=sepCommitment;
      this.octCommitment=octCommitment;
      this.novCommitment=novCommitment;
      this.decCommitment=decCommitment;
  }
}
