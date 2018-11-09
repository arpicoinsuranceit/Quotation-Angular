import { DtaplSummeryComponent } from './dtapl-summery/dtapl-summery.component';
import { DtaplPersonalInfoComponent } from './dtapl-personal-info/dtapl-personal-info.component';
import { DtaplBenefictInfoComponent } from './dtapl-benefict-info/dtapl-benefict-info.component';
import { QuoDtaplComponent } from './quo-dtapl.component';
import { QuoDtaplRoutingModule } from './quo-dtapl-routing.module';
import { QuoDtaplService } from './../../service/quo-dtapl/quo-dtapl.service';
import { SaveAtrmQuotationService } from './../../service/quo-atrm/save-atrm-quotation.service';
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
    QuoDtaplRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoDtaplComponent, 
    DtaplBenefictInfoComponent,
    DtaplPersonalInfoComponent,
    DtaplSummeryComponent],
  providers: [QuoDtaplService, DashboardService, LoginService,OccupationService],
  
})
export class QuoDtaplModule { }
