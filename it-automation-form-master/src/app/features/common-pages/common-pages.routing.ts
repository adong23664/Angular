import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonPagesComponent } from './common-pages.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },{
    path: 'pages',
    component: CommonPagesComponent,
  },{
    path: '404',
    component: PageNotFoundComponent
  }
];

export const routedComponents = [
  CommonPagesComponent,
  PageNotFoundComponent
];

export const CommonPagesRoutingModule: ModuleWithProviders<any> = RouterModule.forChild(routes);
