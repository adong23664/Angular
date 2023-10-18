import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as environment from '@environments/environment';
import { LoaderService } from "./loader.service";
import { CustomFieldOption } from "src/app/core/models/it-automation.model";

@Injectable()
export class BizService {

  private requestTypeList: CustomFieldOption[] =[];

  constructor(
    private http: HttpClient,
    private loader: LoaderService
  ) {
  }

  // 取得表單類型
  getRequestType(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(this.requestTypeList.length>0){
        resolve(this.requestTypeList);
        return;
      }
      this.loader.setLoading(true);
      this.http.get<any>(`${environment.endpoint}/request-type`,)
      .subscribe(rs=>{
        if(rs.code=="0000"){
          this.requestTypeList = rs.data.options;
        }
        this.loader.setLoading(false);
        resolve(this.requestTypeList);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  getRequestField(requestType: string,screenType: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      this.http.get<any>(`${environment.endpoint}/request-type/${requestType}/field/${screenType}`,)
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }


  getUserAllIssueList(user:string, pageIndex:number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      let params = new HttpParams();
      params = params.append('pageIndex', pageIndex);
      this.http.get<any>(`${environment.endpoint}/${user}/issues`,{params:params})
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  getIssueListByRequestType(user:string, rqType:string, pageIndex:number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      let params = new HttpParams();
      params = params.append('pageIndex', pageIndex);
      this.http.get<any>(`${environment.endpoint}/${user}/issues/${rqType}`,{params:params})
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  getIssueDetail(issueKey:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      this.http.get<any>(`${environment.endpoint}/issues/${issueKey}`)
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  doTransition(issueKey:string, transitionId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      this.http.post<any>(`${environment.endpoint}/issues/${issueKey}/transition`,{transitionId})
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  createIssue(issueData:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      this.http.post<any>(`${environment.endpoint}/issues`,issueData)
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  createRequest(requestType:string,requestData:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      this.http.post<any>(`${environment.endpoint}/request-type/${requestType}`,requestData)
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }

  updateRequest(requestType:string, issueId: string, requestData:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.loader.setLoading(true);
      this.http.post<any>(`${environment.endpoint}/request-type/${requestType}/${issueId}`,requestData)
      .subscribe(rs=>{
        this.loader.setLoading(false);
        resolve(rs);
      },error=>{
        this.loader.setLoading(false);
        reject(error);
      });
    });
  }
}
