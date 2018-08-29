import { NotfoundComponent } from './notfound.component';
import { NotFoundRoutingModule } from './notfound-routing.module';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    NotfoundComponent],
  providers: [],
  
})
export class NotFoundModule { }
