import { AditionalBenifInvpComponent } from './aditional-benif-invp/aditional-benif-invp.component';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';
import { QuotationSummeryComponent } from './quotation-summery/quotation-summery.component';
import { QuoInvpComponent } from './quo-invp.component';
import { SaveInvpQuotationService } from './../../service/quo-invp/save-invp-quotation.service';
import { QuoInvpRoutingModule } from './quo-invp-routing.module';
import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';
import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QuoInvpRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoInvpComponent,
    AditionalBenifInvpComponent,
    PersonalinfoComponent,
    QuotationSummeryComponent],
  providers: [SaveInvpQuotationService, DashboardService, LoginService],

})
export class QuoInvpModule { }
