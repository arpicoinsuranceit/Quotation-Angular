import { AccessDeniedComponent } from './access-denied.component';
import { AccessDeniedRoutingModule } from './access-denied-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    AccessDeniedComponent],
  providers: [],
  
})
export class AccessDeniedModule { }
