import { LoginService } from './../../service/login.service';
import { CodeTransferRoutingModule } from './code-transfer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeTransferComponent } from './code-transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CodeTransferService } from '../../service/code-transfer/code-transfer.service';

@NgModule({
  imports: [
    CommonModule,
    CodeTransferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [CodeTransferComponent],
  providers: [CodeTransferService, LoginService]
})
export class CodeTransferModule { }
