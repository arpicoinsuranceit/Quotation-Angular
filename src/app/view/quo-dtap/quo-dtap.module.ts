import { QuoDtapService } from './../../service/quo-dtap/quo-dtap.service';
import { QuoDtapRoutingModule } from './quo-dtap-routing.module';
import { QuoDtaService } from '../../service/quo-dta/quo-dta.service';
import { SaveAtrmQuotationService } from '../../service/quo-atrm/save-atrm-quotation.service';
import { SharedModule } from '../../shared.module';
import { QuoArpService } from '../../service/quo-arp/quo-arp.service';

import { LoginService } from '../../service/login.service';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccupationService } from '../../service/occupationService';
import { QuoDtapComponent } from './quo-dtap.component';
import { DtapBenefictInfoComponent } from './dtap-benefict-info/dtap-benefict-info.component';
import { DtapPersonalInfoComponent } from './dtap-personal-info/dtap-personal-info.component';
import { DtapSummeryComponent } from './dtap-summery/dtap-summery.component';

@NgModule({
  imports: [
    CommonModule,
    QuoDtapRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoDtapComponent, 
    DtapBenefictInfoComponent,
    DtapPersonalInfoComponent,
    DtapSummeryComponent],
  providers: [QuoDtapService, DashboardService, LoginService,OccupationService],
  
})
export class QuoDtapModule { }
