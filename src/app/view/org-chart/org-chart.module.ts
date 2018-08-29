import { LoginService } from './../../service/login.service';
import { OrgChartService } from './../../service/org-chart/org-chart.service';
import { OrgChartComponent } from './org-chart.component';
import { OrgChartRoutingModule } from './org-chart-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    OrgChartRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    OrgChartComponent],
  providers: [OrgChartService, LoginService],
  
})
export class OrgChartModule { }
