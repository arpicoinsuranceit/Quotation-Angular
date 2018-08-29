import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewQuotationService } from './../../service/view-quo/view-quotation.service';
import { PrintQuoService } from './../../service/print-quo/print-quo.service';
import { PrintQuoComponent } from './print-quo.component';
import { PrintQuoRoutingModule } from './print-quo-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrintQuoRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    PrintQuoComponent],
  providers: [PrintQuoService, ViewQuotationService],

})
export class PrintQuoModule { }
