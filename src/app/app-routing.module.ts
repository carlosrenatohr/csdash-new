import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    //component: HomeComponent,
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) 
  },
  {
    path: 'pending-approval',
    loadChildren: () => import('./modules/pending-approval/pending-approval.module').then(m => m.PendingApprovalModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
