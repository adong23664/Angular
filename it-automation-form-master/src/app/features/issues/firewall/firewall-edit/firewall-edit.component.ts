import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BizService } from 'src/app/shared/services/biz.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-firewall-edit',
  templateUrl: './firewall-edit.component.html',
  styleUrls: ['./firewall-edit.component.css']
})
export class FirewallEditComponent {

  issueId = "";
  issueData: any;
  customField = ['customfield_16402'];
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private biz: BizService,
    private location: Location
  ) { }

  ngOnInit(){
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
        this.issueData = rs.data;
        this.prepareForm();
      } else {
        this.router.navigate(['/']);
      }
    }).catch(error=>{
      console.log(error);
      this.router.navigate(['/']);
    })
  }

  prepareForm(){
    this.biz.getRequestField('firewall','edit').then(rs=>{
      if(rs.code="0000"){
        // priorityOptions
        const priorityOptions = rs.data.priorityOptions;
        // customfield_16402 ITA_FW_Have Certificate
        const haveCert =  rs.data.fieldOptions[this.customField[0]];
        this.fields=[
          {
            key: 'summary',
            type: 'input',
            defaultValue: this.issueData.fields.summary,
            props: {
              label: 'summary',
              placeholder: 'Enter summary',
              required: true,
            }
          },
          {
            key: 'description',
            type: 'input',
            defaultValue: this.issueData.fields.description,
            props: {
              label: 'description',
              placeholder: 'Enter description',
              required: true,
            }
          },
          {
            key: 'priorityId',
            type: 'select',
            defaultValue: this.issueData.fields.priority.id,
            props: {
              label: 'Priority',
              placeholder: 'select priority',
              required: true,
              options: priorityOptions.map((o: { id: string; name: string; iconUrl: any;})=>{
                return {value:o.id, label: o.name};
              }),
            },
          },
          {
            key:'fields',
            fieldGroup: [
              {
                key: haveCert.id,
                type: 'radio',
                defaultValue: this.issueData.fields[this.customField[0]]?this.issueData.fields[this.customField[0]].fieldValue.id:'',
                props: {
                  label: 'Have Certificate',
                  required: true,
                  options: haveCert.options.map((o: { id: string; value: string; })=>{
                    return {value: o.id ,label:o.value};
                  }),
                },
              }
            ]
          }
        ];
      }
    });

  }

  onSubmit(model: any) {
    let data = {...model};
    data.fields.customfield_16402 = {id: data.fields.customfield_16402};
    this.biz.updateRequest('firewall',this.issueId,data).then(rs=>{
      if(rs.code=="0000"){
        alert(`updated success! (${this.issueId})`);
        this.pageBack();
      } else {
        alert("updated failures!")
      }
    }).catch(error=>{
      console.log(error);
      alert("updated failures!")
    });
  }

  pageBack(){
    this.location.back()
  }
}
