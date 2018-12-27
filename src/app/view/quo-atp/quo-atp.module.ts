import { SaveEnd1QuotationService } from '../../service/quo-end1/save-end1-quotation.service';
import { AtpSummeryComponent } from './atp-summery/atp-summery.component';
import { AtpPersonalInfoComponent } from './atp-personal-info/atp-personal-info.component';
import { AtpAdditionalBenefComponent } from './atp-additional-benef/atp-additional-benef.component';
import { QuoAtpComponent } from './quo-atp.component';
import { QuoAtpRoutingModule } from './quo-atp-routing.module';
import { SaveAtrmQuotationService } from '../../service/quo-atrm/save-atrm-quotation.service';
import { SharedModule } from '../../shared.module';
import { QuoArpService } from '../../service/quo-arp/quo-arp.service';
import { LoginService } from '../../service/login.service';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccupationService } from '../../service/occupationService';
import { QuoAtpService } from '../../service/quo-atp/quo-atp.service';

@NgModule({
  imports: [
    CommonModule,
    QuoAtpRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoAtpComponent,
    AtpAdditionalBenefComponent,
    AtpPersonalInfoComponent,
    AtpSummeryComponent],
  providers: [QuoAtpService, DashboardService, LoginService,OccupationService],

})
export class QuoAtpModule { }
