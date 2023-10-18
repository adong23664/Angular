import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-issues-table',
  templateUrl: './issues-table.component.html',
  styleUrls: ['./issues-table.component.css']
})
export class IssuesTableComponent {

  displayedColumns = ['key', 'summary', 'status', 'created', 'action'];
  @Input() dataSource = [];
  @Input() browseUrl = "";
  @Input() initData:any;

  @Output() pageEventEmitter:EventEmitter<any>= new EventEmitter<any> ();

  pageEvents(event: any) {
    this.pageEventEmitter.emit(event);
  }

}
