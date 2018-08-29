import { LoginService } from './../../service/login.service';
import swal from 'sweetalert2';
import { AgentService } from './../../service/agentprofile/agent.service';
import { Agent } from './../../model/agent';
import { Component, OnInit, Pipe } from '@angular/core';
import { DomSanitizer , platformBrowser } from '@angular/platform-browser';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  imgUserUrl: any;

  agent: Agent = new Agent();

  error =  false;

  url : string ;
  private sanitizer: DomSanitizer ;
  private image: any;
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(private agentService: AgentService, private loginService : LoginService) {
    if(!sessionStorage.getItem("Token")){
      this.loginService.navigateLigin();
    }

    this.url ="http://localhost:8084/uploadProf/"+this.loginService.currentUser.userCode;
  }

  ngOnInit() {
    this.agentService.getUser().subscribe(response => {
      try {
        this.agent = response.json();
      } catch (error) {
        this.error = true;
      }
      console.log(this.agent);
    }, error => {
      swal("Error", "Error code - 1251 <br> ", "error");
      document.onkeydown = function (e) { return true; }
      this.error = true;
    });

    this.agentService.getImage()
    .subscribe((data) => {
        this.imgUserUrl = this.imageType + data.content;
    }, error => {
      swal("Error", "Error code - 1252 <br> ", "error");
      document.onkeydown = function (e) { return true; }
    });
  }

  /*changeImage() {

  }*/


  /*customStyle = {
    selectButton: {
      "background-color": "#0c3da3",
      "border-radius": "1px",
      "color": "#000",
      "font-size": "10px",
    },
    clearButton: {
      "background-color": "#F37022",
      "border-radius": "1px",
      "color": "#000",
      "font-size": "10px",
      "padding-left": "10px"
    },
    layout: {
      "background-color": "white",
      "border-radius": "2px",
      "color": "#FFF",
      "font-size": "15px",
      "margin": "10px",
      "padding-top": "5px",
      "width": "155px"
    },
    previewPanel: {
      "background-color": "#FAFCFD",
      "border-radius": "0 0 25px 25px",
    }
  }*/
}

/*function getImage() {

}*/



