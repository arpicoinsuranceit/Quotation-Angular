import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from './../../shared.module';
import { QuoArpService } from './../../service/quo-arp/quo-arp.service';
import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [QuoArpService, DashboardService, LoginService],
  
})
export class ProfileModule { }
