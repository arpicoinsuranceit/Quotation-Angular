import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadInquiriesRoutingModule } from './load-inquiry-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './../../service/login.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoadInquiriesComponent } from './load-inquiries.component';
import { LoadInquiryService } from '../../service/load-inquiry/load-inquiry.service';
@NgModule({
  imports: [
    CommonModule,
    LoadInquiriesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    LoadInquiriesComponent],
  providers: [LoadInquiryService, LoginService],
  
})
export class LoadInquiriesModule { }
  