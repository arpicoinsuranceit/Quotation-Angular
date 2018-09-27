import swal from 'sweetalert2';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SummeryInfo } from '../../../model/summeryInfo';

@Component({
  selector: 'app-dtapl-summery',
  templateUrl: './dtapl-summery.component.html',
  styleUrls: ['./dtapl-summery.component.css']
})
export class DtaplSummeryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  summeryInfo : SummeryInfo;
  @Input() isEditUI: boolean;
  @Output() save = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() clearquo = new EventEmitter<any>();

  @Input() activeSp = "2";
  @Input() activeCh = "2";

  payImgUrl = "assets/images/payment.png";

  saveQuo(){
    this.save.emit(true);
  }

  editQuo(){
    this.edit.emit(true);
  }

  clear(){
    this.clearquo.emit(true);
  }

  requirenments(){
    let htmlTxt =
    "<div class = \"row\"><div class = \"col-md-6\"><div><h4> Mainlife Sum at Risk<br>" + this.summeryInfo._summery.healthBenMain.sumAtRisk.toLocaleString() + "</h4></div>" +
    "<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\">" +
    "<th>Mainlife Requirment</th>" +
    "</thead><tbody>";

    var k = 1;

  for (let i in this.summeryInfo._summery.healthBenMain.reqRepoetsMain) {
    htmlTxt += "<tr><td style =\"text-align : left\">"+ k + ". " + this.summeryInfo._summery.healthBenMain.reqRepoetsMain[i] + "</td>"
      + "</tr>";
      k++;
  }

  htmlTxt += "</tbody></table>";
  if(this.activeSp=="1"){
    let sSumAtRisk;
    if(this.summeryInfo._summery.healthBenSpouse.sumAtRisk == undefined){
      sSumAtRisk=0;
    }else{
      sSumAtRisk=this.summeryInfo._summery.healthBenSpouse.sumAtRisk.toLocaleString();
    }
    htmlTxt +=
    "</div><div class = \"col-md-6\"><div><h4> Spouse Sum at Risk <br>" + sSumAtRisk + "</h4></div>" +
      "<table class=\"table table-striped\" style=\"font-size:10px;overflow-x:auto;\"><thead style=\"background-color:#0c3da3;color:white;\">" +
      "<th>Spouse Requirment</th>" +
      "</thead><tbody>";

      var j=1;

    for (let i in this.summeryInfo._summery.healthBenSpouse.reqRepoetsMain) {
      htmlTxt += "<tr style =\"text-align : left\"><td>"+ j + ". " + this.summeryInfo._summery.healthBenSpouse.reqRepoetsMain[i] + "</td>"
        + "</tr >";
        j++;
    }

    htmlTxt += "</tbody></table></div></div>";
  }
  
 


  swal({
    title: 'Medical Requirment',
    html: htmlTxt,
    width: 'auto',
    showCancelButton: true,
    showConfirmButton: false
  });

  //console.log(this.summeryInfo._summery.healthBenMain);
  //console.log(this.summeryInfo._summery.healthBenSpouse);
  }
}
