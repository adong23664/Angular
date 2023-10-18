import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BizService } from 'src/app/shared/services/biz.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent {

  issueId = "";
  issueData:any;
  requestType:string | undefined;
  commentList:any[] = [];
  showCommentBlock=false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private biz: BizService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params['issueId']!=null){
        this.issueId=params['issueId'];
        this.getIssueData();
      }else{
        this.router.navigate(['/']);
      }
    });

  }

  getIssueData(){
    this.biz.getIssueDetail(this.issueId).then(rs=>{
      if(rs.code=="0000"){
        this.issueData = rs.data
        this.requestType = this.issueData.fields['customfield_16400'].fieldValue.value.toLowerCase();
        this.commentList = this.issueData.fields.comment.comments.reverse()
      } else {
        this.issueData=null;
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  doTransition(item:any){
    this.biz.doTransition(this.issueId,item.id).then(rs=>{
      if(rs.code=="0000"){
        this.getIssueData();
      }
    });
  }

  showComment(){
    this.showCommentBlock = true;
  }

  hideComment(){
    this.showCommentBlock = false;
  }

  pageBack(){
    this.location.back()
  }

}
