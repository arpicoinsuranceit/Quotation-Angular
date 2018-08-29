import { ViewQuotationService } from './../../service/view-quo/view-quotation.service';
import { ViewQuoRoutingModule } from './view-quo-routing.module';
import { LoginService } from './../../service/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewQuoComponent } from './view-quo.component';

@NgModule({
  imports: [
    CommonModule,
    ViewQuoRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    ViewQuoComponent],
  providers: [ViewQuotationService, LoginService],
  
})
export class ViewQuoModule { }
