import { DashboardService } from './../../service/dashboard/dashboard.service';
import { LoginService } from './../../service/login.service';
import { QuoDetails } from './../../model/quoDetails';
import { Component, OnInit } from '@angular/core';
import { LoadQuotationService } from '../../service/load-quo/load-quotation.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-load-quo',
  templateUrl: './load-quo.component.html',
  styleUrls: ['./load-quo.component.css']
})
export class LoadQuoComponent implements OnInit {

  quoDetails: QuoDetails[];
  userId: string;

  constructor(private loginService: LoginService,private loadQuoService:LoadQuotationService,private dashboardService:DashboardService) {
    if(!sessionStorage.getItem("Token")){
      this.loginService.navigateLigin();
    }
 
    this.userId=loginService.currentUser.userId;

    this.dashboardService.getDashboardType(loginService.currentUser.userCode).subscribe(response => {
      let userType=response.json().usertype;
      let dashPara=response.json().dashpara;
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("dashpara", dashPara);
      
    }, error => {
      swal("Error", "Error code - 1501 <br> ", "error");
    });

    this.getQuotations();
  }

  ngOnInit() {
  }

  getQuotations(){
    return this.loadQuoService.getQuotations(this.userId).subscribe(response => {
      this.quoDetails=response.json();
      console.log(this.quoDetails);
    }, error => {
      swal("Error", "Error code - 1101 <br> ", "error");
    });
  }

}
