import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './shared/services/auth-guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/portal/home'},
  { path: 'portal',
    children:[
      { path: 'home',component:HomeComponent,data:{keep:true}},
      { path: 'issues',  loadChildren: () => import('./features/issues/issues.module').then(m => m.IssuesModule) ,canActivate: [AuthGuard]},
      { path: 'pages', loadChildren: () => import('./features/common-pages/common-pages.module').then(m => m.CommonPagesModule) },
    ]
  },
  { path: '**', redirectTo: 'portal/pages/404' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule {};
