import { AibSummery } from './../../../model/quoCal';
import { Plan, PlanAip } from './../../../model/plan';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-summery-aip',
  templateUrl: './summery-aip.component.html',
  styleUrls: ['./summery-aip.component.css']
})
export class SummeryAipComponent implements OnInit {

  @Input() _plan=new PlanAip();

  @Input() _aibSummery = new AibSummery();

  @Output() save = new EventEmitter<any>();
  
  @Output() edit = new EventEmitter<any>();

  @Output() setClear = new EventEmitter<any>();

  @Input() total;

  @Input() isEditUI: boolean;

  constructor() { }

  ngOnInit() {
    this._plan._frequance="Monthly";
    this._plan._contribution=3000;
    this._plan._term=5;
  }

  saveQuo() {
    this.save.emit(true);
  }

  editQuo(){
    this.edit.emit(true);
  }

  clear(){
    this.setClear.emit(true);
  }

  

  payImgUrl = "assets/images/payment.png";
}
