import { DashboardService } from './../service/dashboard/dashboard.service';

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  productArray: string[]=new Array<string>();
  constructor(private loginService:LoginService,private dashboardService:DashboardService) { }

  ingLogoWhite="assets/images/logo_white.png";

  ngOnInit() {
    this.loadActiveProducts();
  }

  isLog(){
    return this.loginService.isLoggedIn();
  }

  loadActiveProducts(){
    this.dashboardService.loadActiveProducts().subscribe(response => {
      this.productArray=response.json();
    }, error => {
      //swal("Error", "Error code - 1452 <br> ", "error");
      document.onkeydown = function (e) { return true; }
    });
  }

  loadDashboard(){
    
    var dashPara=sessionStorage.getItem("dashpara");
    var userType=sessionStorage.getItem("userType");
    var token=sessionStorage.getItem("Token");

    var encodedDashPara = btoa(dashPara);
    var encodeduserType = btoa(userType);

    window.open('http://10.10.10.12:8080/Dashboard?dashPara='+encodedDashPara+'&userType='+encodeduserType+'&token='+token+'/');
  }


}
