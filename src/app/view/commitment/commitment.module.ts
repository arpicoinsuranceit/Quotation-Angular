import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { CommitmentRoutingModule } from './commitment-routing.module';
import { LoginService } from './../../service/login.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommitmentComponent } from './commitment.component';
import { CommitmentService } from '../../service/commitment/commitment.service';

@NgModule({
  imports: [
    CommonModule,
    CommitmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    CommitmentComponent],
  providers: [DashboardService, CommitmentService, LoginService],
  
})
export class CommitmentModule { }
  