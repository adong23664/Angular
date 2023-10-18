import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/shared/share.module';
import { IssuesRoutingModule, routedComponents } from './issues.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  imports: [
    IssuesRoutingModule,
    ShareModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class IssuesModule { }
