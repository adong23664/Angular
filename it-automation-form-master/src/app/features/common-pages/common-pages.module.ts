import { NgModule } from '@angular/core';
import { CommonPagesRoutingModule, routedComponents } from './common-pages.routing';
import { ShareModule } from 'src/app/shared/share.module';

@NgModule({
  imports: [
    CommonPagesRoutingModule,
    ShareModule
  ],
  declarations: [
    ...routedComponents
  ]
})
export class CommonPagesModule { }
