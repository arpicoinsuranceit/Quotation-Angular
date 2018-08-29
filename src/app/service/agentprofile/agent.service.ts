import { LoginService } from './../login.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType } from '@angular/http/src/enums';
import { Response } from '@angular/http/src/static_response';


@Injectable()
export class AgentService {
  userCode: string;

  constructor(private http: Http, private loginService: LoginService) {
    if(loginService.currentUser){
      this.userCode = loginService.currentUser.userCode;
    }
  }


  getUser() {
    return this.http.get('http://localhost:8085/getagent/' + this.userCode);

  }

  getImage() {
    console.log("called");
    return this.http.get("http://localhost:8084/downloadProfPic/" + this.userCode)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      })
  }

  
}


