import { AipPersonalInfoComponent } from './aip-personal-info/aip-personal-info.component';
import { AipPlanInfoComponent } from './aip-plan-info/aip-plan-info.component';
import { SummeryAipComponent } from './summery-aip/summery-aip.component';
import { SharedModule } from './../../shared.module';

import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { QuoAipReq } from './../../model/qupaipreq';
import { PlanAip } from './../../model/plan';
import { MainLife } from './../../model/mainlife';
import { QuoAipService } from './../../service/quo-aip/quo-aip.service';
import { QuoAipComponent } from './quo-aip.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoAipRoutingModule } from './quo-aip-routing.module';

@NgModule({
  imports: [
    CommonModule,
    QuoAipRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoAipComponent, 
    SummeryAipComponent,
    AipPlanInfoComponent,
    AipPersonalInfoComponent],
  providers: [QuoAipService, DashboardService, LoginService],
  
})
export class QuoAipModule { }
