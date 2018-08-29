import { CommitmentService } from './../service/commitment/commitment.service';
import { DashboardService } from './../service/dashboard/dashboard.service';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LoginService } from './../service/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService, CommitmentService],
})
export class DashBoardModule { }
