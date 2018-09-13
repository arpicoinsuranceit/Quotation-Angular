import { LoginService } from './../../service/login.service';
import { OrgChartDto } from './../../model/orgchart';
import { OrgChartService } from './../../service/org-chart/org-chart.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {

  orgData = new Array<OrgChartDto>();
  isDisableDiv = false;

  constructor(private orgChartService : OrgChartService, private loginService : LoginService) { 
    if(!sessionStorage.getItem("Token")){
      this.loginService.navigateLigin();
    }

  }

  ngOnInit() {
    this.isDisableDiv=true;
    this.orgChartService.getOrgDetails(this.loginService.currentUser.userCode,sessionStorage.getItem("userType"),sessionStorage.getItem("dashpara")).subscribe( response => {
      console.log(response.json());
      this.orgData = response.json();
      this.isDisableDiv=false;
    }, error => {
      swal("Error", error.text() , "error");
      document.onkeydown = function (e) { return true; }
      this.isDisableDiv = false;
    });
  }

  loadDetails(agncod){
    alert(agncod);
  }
}
