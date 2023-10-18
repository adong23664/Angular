import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonPagesModule } from './features/common-pages/common-pages.module';
import { BizService } from './shared/services/biz.service';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { IssuesModule } from './features/issues/issues.module';
import { RouteReuseStrategy } from '@angular/router';
import { PageReuseService } from './shared/services/page-reuse-strategy';
import { HomeComponent } from './features/home/home.component';
import { ShareModule } from './shared/share.module';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './shared/services/auth-guard';
import { FirewallFieldGroupWrapper } from './core/formly/firewall-field-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderComponent,
    FirewallFieldGroupWrapper
  ],
  imports: [
    ShareModule,
    AppRoutingModule,
    CommonPagesModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule,
    IssuesModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [BizService,UserService,AuthGuard,
    {
      provide: RouteReuseStrategy,
      useClass: PageReuseService
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
