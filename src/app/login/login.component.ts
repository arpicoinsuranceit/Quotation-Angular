import swal from 'sweetalert2';
import { Logins } from './../model/Logins';
import { LoginService } from './../service/login.service';
import { NgModel } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  logins : Logins;

  constructor(private loginService: LoginService,
            private router: Router,private route: ActivatedRoute) { }

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
        swal("Error", "Error code - 1401 <br> ", "error");
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
