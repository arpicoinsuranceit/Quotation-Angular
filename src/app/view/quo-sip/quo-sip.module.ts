import { QuoAsipService } from './../../service/quo-asip/quo-asip.service';
import { SipPersonalInfoComponent } from './sip-personal-info/sip-personal-info.component';
import { SipAdditionalBenefComponent } from './sip-additional-benef/sip-additional-benef.component';
import { QuoSipComponent } from './quo-sip.component';
import { QuoSipRoutingModule } from './quo-sip-routing.module';
import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';
import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SipSummeryComponent } from './sip-summery/sip-summery.component';

@NgModule({
  imports: [
    CommonModule,
    QuoSipRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoSipComponent,
    SipAdditionalBenefComponent,
    SipPersonalInfoComponent,
    SipSummeryComponent],
  providers: [QuoAsipService, DashboardService, LoginService],

})
export class QuoSipModule { }
