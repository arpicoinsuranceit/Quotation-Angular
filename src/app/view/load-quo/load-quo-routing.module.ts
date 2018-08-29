import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadQuoComponent } from './load-quo.component';



const routes: Routes = [
  {
    path: '',
    component: LoadQuoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadQuoRoutingModule { }
