import { LoginService } from './../service/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewQuotationService } from '../service/view-quo/view-quotation.service';
import { LoadInquiryService } from '../service/load-inquiry/load-inquiry.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent],
  providers: [LoginService,ViewQuotationService,LoadInquiryService],
})
export class LoginModule { }
