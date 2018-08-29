import { LoadQuotationService } from './../../service/load-quo/load-quotation.service';
import { LoadQuoComponent } from './load-quo.component';
import { LoadQuoRoutingModule } from './load-quo-routing.module';
import { LoginService } from './../../service/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    LoadQuoRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    LoadQuoComponent],
  providers: [LoadQuotationService, LoginService],
  
})
export class LoadQuoModule { }
