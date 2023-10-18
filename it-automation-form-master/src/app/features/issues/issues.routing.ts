import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { FirewallCreateComponent } from './firewall/firewall-create/firewall-create.component';
import { FirewallEditComponent } from './firewall/firewall-edit/firewall-edit.component';
import { IssuesListComponent } from './issue-list/issues-list.component';

export const issueRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },{
    path: 'issues',
    component: IssuesListComponent,
  },{
    path: 'request/:requestType',
    component: IssuesListComponent,
  },{
    path: "firewall",
    children: [
      { path:"create", component: FirewallCreateComponent },
      { path:":issueId/edit", component: FirewallEditComponent}
    ]
  },{
    path: ':issueId',
    component: IssueDetailComponent
  }
];

export const routedComponents = [
  IssuesListComponent,
  IssueDetailComponent,
  FirewallCreateComponent,
  FirewallEditComponent,
];

export const IssuesRoutingModule: ModuleWithProviders<any> = RouterModule.forChild(issueRoutes);
