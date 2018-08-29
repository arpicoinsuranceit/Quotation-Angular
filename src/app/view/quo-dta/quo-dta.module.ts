import { DtaBenefictInfoComponent } from './dta-benefict-info/dta-benefict-info.component';
import { QuoDtaRoutingModule } from './quo-dta-routing.module';
import { QuoDtaService } from './../../service/quo-dta/quo-dta.service';
import { SaveAtrmQuotationService } from './../../service/quo-atrm/save-atrm-quotation.service';
import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';

import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoDtaComponent } from './quo-dta.component';
import { DtaPersonalInfoComponent } from './dta-personal-info/dta-personal-info.component';
import { DtaSummeryComponent } from './dta-summery/dta-summery.component';

@NgModule({
  imports: [
    CommonModule,
    QuoDtaRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoDtaComponent, 
    DtaBenefictInfoComponent,
    DtaPersonalInfoComponent,
    DtaSummeryComponent],
  providers: [QuoDtaService, DashboardService, LoginService],
  
})
export class QuoDtaModule { }
