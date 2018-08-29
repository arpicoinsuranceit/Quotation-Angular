import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoDtaplComponent } from './quo-dtapl.component';



const routes: Routes = [
  {
    path: '',
    component: QuoDtaplComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoDtaplRoutingModule { }
