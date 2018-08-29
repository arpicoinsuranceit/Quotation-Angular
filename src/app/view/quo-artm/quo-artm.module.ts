import { ArtmPersonalInfoComponent } from './artm-personal-info/artm-personal-info.component';
import { QuoArtmComponent } from './quo-artm.component';
import { SaveAsfpQuotationService } from './../../service/quo-asfp/save-asfp-quotation.service';
import { SharedModule } from './../../shared.module';
import { LoginService } from './../../service/login.service';
import { DashboardService } from './../../service/dashboard/dashboard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuoArtmRoutingModule } from './quo-artm-routing.module';
import { ArtmSummeryComponent } from './artm-summery/artm-summery.component';
import { SaveArtmQuotationService } from '../../service/quo-artm/save-artm-quotation.service';
import { ArtmAdditionalBenefComponent } from './artm-additional-benef/artm-additional-benef.component';

@NgModule({
  imports: [
    CommonModule,
    QuoArtmRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    QuoArtmComponent,
    ArtmSummeryComponent,
    ArtmAdditionalBenefComponent,
    ArtmPersonalInfoComponent],
  providers: [SaveArtmQuotationService, DashboardService, LoginService],
  
})
export class QuoArtmModule { }
