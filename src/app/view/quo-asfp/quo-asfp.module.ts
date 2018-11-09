import { SaveAsfpQuotationService } from './../../service/quo-asfp/save-asfp-quotation.service';
import { AsfpPersonalInfoComponent } from './asfp-personal-info/asfp-personal-info.component';
import { AsfpAdditionalBenefComponent } from './asfp-additional-benef/asfp-additional-benef.component';
import { AsfpSummeryComponent } from './asfp-summery/asfp-summery.component';
import { QuoAsfpComponent } from './quo-asfp.component';
import { QuoAsfpRoutingModule } from './quo-asfp-routing.module';
import { SharedModule } from './../../shared.module';
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
    QuoAsfpRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoAsfpComponent, 
    AsfpSummeryComponent,
    AsfpAdditionalBenefComponent,
    AsfpPersonalInfoComponent],
  providers: [SaveAsfpQuotationService, DashboardService, LoginService,OccupationService],
  
})
export class QuoAsfpModule { }
