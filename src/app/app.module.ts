import { AgeCalculationService } from './service/agecalculateservice';
import { OccupationService } from './service/occupationService';
import  swal  from 'sweetalert2';
import { DashboardService } from './service/dashboard/dashboard.service';
import { AgentService } from './service/agentprofile/agent.service';
import { LoginService } from './service/login.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { ImageUploadModule } from "angular2-image-upload";
import { NgModule } from '@angular/core';
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    NgbModule.forRoot(),
    //ImageUploadModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    //NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CurrencyMaskModule,
    AppRoutingModule
  ],
  providers: [LoginService, AgentService, DashboardService, OccupationService, AgeCalculationService],
  bootstrap: [AppComponent ]
})
export class AppModule { }
