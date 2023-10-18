import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FormlyMatTextAreaModule } from '@ngx-formly/material/textarea';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { IssuesTableComponent } from './components/issues-table/issues-table.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormlyMatDatepickerModule,
    FormlyMatTextAreaModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
  ],
  exports: [
    CommonModule,
    FormlyMatDatepickerModule,
    FormlyMatTextAreaModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    IssuesTableComponent,
  ],
  declarations: [
    IssuesTableComponent
  ]
})
export class ShareModule { }
