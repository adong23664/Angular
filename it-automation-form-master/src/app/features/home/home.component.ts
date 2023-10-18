import { Component } from '@angular/core';
import { BizService } from 'src/app/shared/services/biz.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userList:any[] = [];
  selectedUser:any;
  displayedColumns = ['key', 'summary', 'status', 'created', 'action'];
  dataSource = [];
  currentPage = 0;
  browseUrl = "";
  pageInitData:any;

  constructor(
    private biz: BizService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userList = this.userService.userList;
    if(this.userService.currentUser){
      this.selectedUser=this.userService.currentUser;
      this.getIssueData();
    }
  }

  getIssueData(pageIndex:number=1){
    if(this.selectedUser){
      this.biz.getUserAllIssueList(this.selectedUser.value,pageIndex).then(rs=>{
        if(rs.code=="0000"){
          this.dataSource=rs.data.issues;
          this.currentPage= rs.data.currentPage;
          this.browseUrl = rs.data.browseUrl;
          this.pageInitData = {
            length: rs.data.total,
            pageSize: rs.data.maxResults,
            pageIndex: this.currentPage-1
          }
        } else {
          this.dataSource=[];
        }
      }).catch(error=>{
        console.log(error);
      })
    }else{
      this.dataSource=[];
    }
  }

  pageEvents(event: any) {
    let index = event.pageIndex+1;
    if(index && index != this.currentPage) {
      this.getIssueData(index);
    }
  }

  changeUser(item:any){
    this.userService.currentUser=item;
    this.selectedUser = item;
    this.getIssueData();
  }

}
