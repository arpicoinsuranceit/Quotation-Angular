import { CommitmentService } from './../service/commitment/commitment.service';
import { DashboardService } from './../service/dashboard/dashboard.service';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoginService } from './../service/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService, CommitmentService,LoginService],
})
export class DashBoardModule { }
