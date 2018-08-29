import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';
import { ArpPersonalInfoComponent } from './arp-personal-info/arp-personal-info.component';
import { ArpAdditionalBenefComponent } from './arp-additional-benef/arp-additional-benef.component';
import { ArpSummeryComponent } from './arp-summery/arp-summery.component';
import { QuoArpComponent } from './quo-arp.component';
import { QuoArpRoutingModule } from './quo-arp-routing.module';
import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QuoArpRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoArpComponent, 
    ArpSummeryComponent,
    ArpAdditionalBenefComponent,
    ArpPersonalInfoComponent],
  providers: [QuoArpService, DashboardService, LoginService],
  
})
export class QuoArpModule { }
