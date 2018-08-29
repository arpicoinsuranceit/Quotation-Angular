import swal from 'sweetalert2';
import { Logins } from './../model/Logins';
import { FormControl,FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { JwtHelper } from 'angular2-jwt';
import { Router,ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  username: string;
  password: string;
  newPw: string;
  conPw: string;
  isLog: boolean;
  logins : Logins;

  constructor(private passwordService: ChangePasswordService,
    private router: Router,private route: ActivatedRoute) { 
    this.isLog=false;
  }

  ngOnInit() {
  }

  changePw(form){
    if(this.newPw != null && this.conPw != null){
      if(this.newPw == this.conPw){
        let token=sessionStorage.getItem("Token");
        let curUser=new JwtHelper().decodeToken(token);
        this.logins=new Logins(this.username,this.newPw,curUser.userId);

        this.passwordService.changePassword(this.logins).subscribe(result =>{

          if(result=="Success"){
            sessionStorage.removeItem("Token");
            this.router.navigate(['/']);
          }else if(result=="fail"){
            swal("Oopz..","Password Change Failed..","error");
            this.onKeyup2();
          }else if(result=="Used"){
            swal("Oopz..","Already have been used this password..","error");
            this.onKeyup2();
          }else if(result=="Current Pw"){
            swal("Oopz..","Already have been used this password..","error");
            this.onKeyup2();
          }else{
            swal("Oopz..","Password is invalid","error");
            this.onKeyup2();
          }

        }, error => {
          swal("Error", "Error code - 1351 <br> ", "error");
          document.onkeydown = function (e) { return true; }
        });
      }else{
        swal("Oopz..","Confirm Password is not match with your New Password","error");
        document.getElementById("coPasswordTxt").focus();
      }
    }else{
      document.getElementById("nPasswordTxt").focus();
    }
    
  }

  checkLogin(credentials){

    if(this.username != null && this.password != null){
      this.logins=new Logins(this.username,this.password,'1');

      this.passwordService.loginToChangePw(this.logins).subscribe(result =>{
        if(result){
          this.isLog=true;
        }else{
          this.isLog=false;
          swal("You have entered username or password incorrectly..");
          this.username="";
          this.password="";
          document.getElementById("userNameTxt").focus();
        }
        
      }, error => {
        swal("Error", "Error code - 1352 <br> ", "error");
        document.onkeydown = function (e) { return true; }
      });
    }else{
      document.getElementById("userNameTxt").focus();
    }
}

  isLogIn(){
    return this.isLog;
  }

  onKeyup(){
    document.getElementById("cPasswordTxt").focus();
  }

  onKeyup1(){
    document.getElementById("nextBtn").click();
  }

  onKeyup2(){
    document.getElementById("coPasswordTxt").focus();
  }

  onKeyup3(){
    document.getElementById("changePwBtn").click();
  }

}