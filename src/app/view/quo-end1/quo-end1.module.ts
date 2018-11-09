import { SaveEnd1QuotationService } from './../../service/quo-end1/save-end1-quotation.service';
import { End1SummeryComponent } from './end1-summery/end1-summery.component';
import { End1PersonalInfoComponent } from './end1-personal-info/end1-personal-info.component';
import { End1AdditionalBenefComponent } from './end1-additional-benef/end1-additional-benef.component';
import { QuoEnd1Component } from './quo-end1.component';
import { QuoEnd1RoutingModule } from './quo-end1-routing.module';
import { SaveAtrmQuotationService } from './../../service/quo-atrm/save-atrm-quotation.service';
import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';
import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccupationService } from '../../service/occupationService';

@NgModule({
  imports: [
    CommonModule,
    QuoEnd1RoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoEnd1Component,
    End1AdditionalBenefComponent,
    End1PersonalInfoComponent,
    End1SummeryComponent],
  providers: [SaveEnd1QuotationService, DashboardService, LoginService,OccupationService],

})
export class QuoEnd1Module { }
