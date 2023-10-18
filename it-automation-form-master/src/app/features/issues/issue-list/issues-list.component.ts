import { UserService } from 'src/app/shared/services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BizService } from 'src/app/shared/services/biz.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent {

  requestType = '';
  currentPage = 0;
  currentUser:any;
  dataSource = [];
  browseUrl = "";
  pageInitData:any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private biz: BizService,
    private userService:UserService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['requestType']!=null){
        this.requestType=params['requestType'];
        if(this.userService.currentUser){
          this.currentUser = this.userService.currentUser;
          this.getIssueData();
        }

      }else{
        this.router.navigate(['/']);
      }
    });
  }

  getIssueData(pageIndex:number=1){
    this.biz.getIssueListByRequestType(this.currentUser.value,this.requestType,pageIndex).then(rs=>{
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
  }

  pageEvents(event: any) {
    let index = event.pageIndex+1;
    if(index && index != this.currentPage) {
      this.getIssueData(index);
    }
  }

}
