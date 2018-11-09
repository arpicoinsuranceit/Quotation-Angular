import swal from 'sweetalert2';
import { Logins } from './../model/Logins';
import { LoginService } from './../service/login.service';
import { NgModel } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router/';
import { MainLife } from '../model/mainlife';
import { Spouse } from '../model/spouse';
import { Children } from '../model/childeren';
import { NomineeInquiry } from '../model/inquiry';
import { ViewQuotationService } from '../service/view-quo/view-quotation.service';
import { LoadInquiryService } from '../service/load-inquiry/load-inquiry.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  logins : Logins;

  constructor(private loginService: LoginService,private router: Router,private route: ActivatedRoute,
    private viewQuoService:ViewQuotationService,public loadInquiryService:LoadInquiryService) {
       
    this.route.queryParams.subscribe(params => {
      console.log("view quo");
      console.log(params['data']);

      if(params['data'] != undefined){
        var data ;
        data=JSON.parse(params['data']);

        let token=data.token;
        let quoNum = data.quoNum;
        let qdId = data.qdId;
        let mainlife: MainLife = data.mainlife;
        let spouse: Spouse = data.spouse;
        let children: Children[] = data.children;
        let nominee: NomineeInquiry = data.nominee;

        console.log(token);
        console.log(mainlife);
        
        sessionStorage.setItem("Token",token);
        sessionStorage.setItem("isUnderwriting","true");
        sessionStorage.setItem("mainlife",JSON.stringify(mainlife));
        sessionStorage.setItem("spouse",JSON.stringify(spouse));
        sessionStorage.setItem("children",JSON.stringify(children));
        sessionStorage.setItem("nominee",JSON.stringify(nominee));
        sessionStorage.setItem("hideMenu","true");

        this.viewQuoService.editQuoDetails(qdId);
      }

      if(params['token'] != undefined){
        sessionStorage.setItem("Token",JSON.parse(params['token']));
        sessionStorage.setItem("hideMenu","true");

        setTimeout(function (){
          loadInquiryService.loadInquiryPage();
        }, 2000);

      }

    });

    

  }

  ngOnInit() {

    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/home'], { skipLocationChange: true });
    }
  }

  login(loginForm){

    if(this.username != null && this.password != null){
      this.logins=new Logins(this.username,this.password,'0');

      this.loginService.login(this.logins).subscribe(result =>{
        if(result=="Success"){
          this.router.navigate(['/home'], { skipLocationChange: true });
          window.location.reload();
        }
        if(result=="Not"){
          swal("Oopz...","You have entered username or password incorrectly","error");
        }
        if(result=="Pw"){
          this.router.navigate(['/changePw'], { skipLocationChange: true });
        }
        if(result=="Lock"){
          swal("Oopz...","Your account has been locked","error");
        }
      }, error => {
        swal("Error", error.text() , "error");
        document.onkeydown = function (e) { return true; }
      });
    }else{
      if(this.username == null){
        document.getElementById("userNameTxt").focus();
        return;
      }

      if(this.password == null){
        document.getElementById("passwordTxt").focus();
        return;
      }
    }
    
    
  }

  logOut(){
    this.loginService.logOut();
  }

  onKeyup(){
    document.getElementById("passwordTxt").focus();
  }

  onKeyup1(){
    document.getElementById("signInBtn").click();
  }

}
