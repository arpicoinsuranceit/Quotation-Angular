import { SaveAtrmQuotationService } from './../../service/quo-atrm/save-atrm-quotation.service';
import { QuoAtrmRoutingModule } from './quo-atrm-routing.module';
import { AtrmPersonalInfoComponent } from './atrm-personal-info/atrm-personal-info.component';
import { AtrmAdditionalBenefComponent } from './atrm-additional-benef/atrm-additional-benef.component';
import { AtrmSummeryComponent } from './atrm-summery/atrm-summery.component';
import { QuoAtrmComponent } from './quo-atrm.component';
import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';

import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccupationService } from '../../service/occupationService';

@NgModule({
  imports: [
    CommonModule,
    QuoAtrmRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoAtrmComponent, 
    AtrmSummeryComponent,
    AtrmAdditionalBenefComponent,
    AtrmPersonalInfoComponent],
  providers: [SaveAtrmQuotationService, DashboardService, LoginService,OccupationService],
  
})
export class QuoAtrmModule { }
