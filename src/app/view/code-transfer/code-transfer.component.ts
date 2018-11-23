import { CodeTransferService } from './../../service/code-transfer/code-transfer.service';
import { LoginService } from './../../service/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeTransfer } from './../../model/codetransfer';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-code-transfer',
  templateUrl: './code-transfer.component.html',
  styleUrls: ['./code-transfer.component.css']
})
export class CodeTransferComponent implements OnInit {

  transferlist: CodeTransfer[] = new Array();

  isDisableDiv = false;

  form_search = new FormGroup({
    column: new FormControl("pprnum"),
    data: new FormControl("", Validators.required)
  });

  constructor(private loginService: LoginService, private codeTransferService: CodeTransferService) {
    if (!sessionStorage.getItem("Token")) {
      this.loginService.navigateLigin();
    }
  }

  ngOnInit() {

    this.getTransfers();

  }

  getTransfers() {
    let user = this.loginService.currentUser;

    this.isDisableDiv = true;
    this.codeTransferService.getAllTransfers(user).subscribe(resp => {
      this.isDisableDiv = false;
      // console.log(resp.json());
      this.transferlist = new Array();
      for (let i in resp.json()) {
        this.transferlist.push(resp.json()[i]);
      }

    });
  }

  getInputValues(input: any, data: string, map: Map<string, string>) {
    map.set(data, input.value);
  }

  approve(code) {
    let user = this.loginService.currentUser;

    let htmlTxt = "<hr class='seperator'>";
    htmlTxt += "<div class='form-group'>" +
      "<div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'>" +
      "<label for='remark' style='padding-top:10px;text-align: justify;'>Remark</label> " +
      "</div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'>" +
      "<input type='text' id='remark' class='form-control' placeholder='Remark'/>" +
      "</div></div>" +
      "</div>";

    swal({
      title: 'Approve',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.getInputValues(document.getElementById("remark"), 'remark', map);

        this.isDisableDiv = true;
        this.codeTransferService.approveTransfers(user.userCode, code.codeTransferId, map.get("remark")).subscribe(resp => {
          this.isDisableDiv = false;
          if (resp.json().code == '200') {
            swal("Success", resp.json().message, "success");
          } else {
            swal("Error", resp.json().message, "error");
          }
          this.getTransfers();
        }, error => {
          this.isDisableDiv = false;
          swal("Error", "Internal Error", "error")
        });



      }

    });

  }

  reject(code) {

    let user = this.loginService.currentUser;

    let htmlTxt = "<hr class='seperator'>";
    htmlTxt += "<div class='form-group'>" +
      "<div class='col-md-4 col-lg-4 col-sm-4 col-xs-12'>" +
      "<label for='remark' style='padding-top:10px;text-align: justify;'>Remark</label> " +
      "</div><div class='col-md-8 col-lg-8 col-sm-8 col-xs-12' style='padding-bottom:10px;'>" +
      "<input type='text' id='remark' class='form-control' placeholder='Remark'/>" +
      "</div></div>" +
      "</div>";

    swal({
      title: 'Reject',
      html: htmlTxt,
      width: '450px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((resp) => {
      let map = new Map<string, string>();
      if (resp.value == true) {
        this.getInputValues(document.getElementById("remark"), 'remark', map);

        this.isDisableDiv = true;
        this.codeTransferService.rejectTransfers(user.userCode, code.codeTransferId, map.get("remark")).subscribe(resp => {
          this.isDisableDiv = false;
          if (resp.json().code == '200') {
            swal("Success", resp.json().message, "success");
          } else {
            swal("Error", resp.json().message, "error");
          }
          this.getTransfers();
        }, error => {
          this.isDisableDiv = false;
          swal("Error", "Internal Error", "error")
        });


      }

    });
  }
}
