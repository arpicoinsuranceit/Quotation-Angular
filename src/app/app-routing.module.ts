import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'changePw',
    loadChildren: 'app/change-password/change-password.module#ChangePasswordModule'
  },
  {
    path: 'home',
    loadChildren: 'app/view/load-quo/load-quo.module#LoadQuoModule'
  },

  {
    path: 'quoaip',
    loadChildren: 'app/view/quo-aip/quo-aip.module#QuoAipModule'
  },
  {
    path: 'quoaip/:id',
    loadChildren: 'app/view/quo-aip/quo-aip.module#QuoAipModule'
  },



  {
    path: 'quoarp',
    loadChildren: 'app/view/quo-arp/quo-arp.module#QuoArpModule'
  },
  {
    path: 'quoarp/:id',
    loadChildren: 'app/view/quo-arp/quo-arp.module#QuoArpModule'
  },



  {
    path: 'quoatrm',
    loadChildren: 'app/view/quo-atrm/quo-atrm.module#QuoAtrmModule'
  },
  {
    path: 'quoatrm/:id',
    loadChildren: 'app/view/quo-atrm/quo-atrm.module#QuoAtrmModule'
  },


  {
    path: 'quodta',
    loadChildren: 'app/view/quo-dta/quo-dta.module#QuoDtaModule'
  },
  {
    path: 'quodta/:id',
    loadChildren: 'app/view/quo-dta/quo-dta.module#QuoDtaModule'
  },


  {
    path: 'quodtapl',
    loadChildren: 'app/view/quo-dtapl/quo-dtapl.module#QuoDtaplModule'
  },
  {
    path: 'quodtapl/:id',
    loadChildren: 'app/view/quo-dtapl/quo-dtapl.module#QuoDtaplModule'
  },


  {
    path: 'quoend1',
    loadChildren: 'app/view/quo-end1/quo-end1.module#QuoEnd1Module'
  },
  {
    path: 'quoend1/:id',
    loadChildren: 'app/view/quo-end1/quo-end1.module#QuoEnd1Module'
  },
  
  {
    path: 'quoinvp',
    loadChildren: 'app/view/quo-invp/quo-invp.module#QuoInvpModule'
  },
  {
    path: 'quoinvp/:id',
    loadChildren: 'app/view/quo-invp/quo-invp.module#QuoInvpModule'
  },
  

  {
    path: 'quosip',
    loadChildren: 'app/view/quo-sip/quo-sip.module#QuoSipModule'
  },
  {
    path: 'quosip/:id',
    loadChildren: 'app/view/quo-sip/quo-sip.module#QuoSipModule'
  },


  {
    path: 'quoasfp',
    loadChildren: 'app/view/quo-asfp/quo-asfp.module#QuoAsfpModule'
  },
  {
    path: 'quoasfp/:id',
    loadChildren: 'app/view/quo-asfp/quo-asfp.module#QuoAsfpModule'
  },
  
  {
    path: 'quoartm',
    loadChildren: 'app/view/quo-artm/quo-artm.module#QuoArtmModule'
  },
  {
    path: 'quoartm/:id',
    loadChildren: 'app/view/quo-artm/quo-artm.module#QuoArtmModule'
  },


  {
    path: 'loadQuo',
    loadChildren: 'app/view/load-quo/load-quo.module#LoadQuoModule'
  },
  {
    path: 'printQuo',
    loadChildren: 'app/view/print-quo/print-quo.module#PrintQuoModule'
  },
  {
    path: 'viewQuo/:id',
    loadChildren: 'app/view/view-quo/view-quo.module#ViewQuoModule'
  },
  {
    path: 'orgchart',
    loadChildren: 'app/view/org-chart/org-chart.module#OrgChartModule'
  },
  {
    path: 'commitment',
    loadChildren: 'app/view/commitment/commitment.module#CommitmentModule'
  },
  {
    path: 'loadinquiries',
    loadChildren: 'app/view/load-inquiries/load-inquiry.module#LoadInquiriesModule'
  },
  {
    path: 'denied',
    loadChildren: 'app/access-denied/access-denied.module#AccessDeniedModule'
  },
  {
    path: 'profile',
    loadChildren: 'app/view/profile/profile.module#ProfileModule'
  },
  {
    path: '**',
    loadChildren: 'app/notfound/notfound.module#NotFoundModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
