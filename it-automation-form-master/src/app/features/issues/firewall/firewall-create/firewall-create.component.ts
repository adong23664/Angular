import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { BizService } from 'src/app/shared/services/biz.service';
import { UserService } from 'src/app/shared/services/user.service';
import {Location} from '@angular/common';
import { FirewallFieldGroupWrapper } from 'src/app/core/formly/firewall-field-group.component';

@Component({
  selector: 'app-firewall-create',
  templateUrl: './firewall-create.component.html',
  styleUrls: ['./firewall-create.component.css']
})
export class FirewallCreateComponent {
  customField = ['customfield_16401','customfield_16402'];
  firewallIndex = 0;
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'summary',
      type: 'input',
      props: {
        label: 'Summary',
        placeholder: 'Enter summary',
        required: true,
      }
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Description',
        required: true,
        autosize: true,
        autosizeMinRows:2,
        autosizeMaxRows:5
      },
    }
  ];

  constructor(
    private biz: BizService,
    private user: UserService,
    private location: Location
  ) { }

  ngOnInit(){
    this.biz.getRequestField('firewall','create').then(rs=>{
      if(rs.code="0000"){
        // priorityOptions
        const priorityOptions = rs.data.priorityOptions;
        // customfield_16401 ITA_FW_Request Type
        const requestType = rs.data.fieldOptions[this.customField[0]];
        // customfield_16402 ITA_FW_Have Certificate
        const haveCert =  rs.data.fieldOptions[this.customField[1]];
        this.firewallIndex = 1;
        const index = ""+this.firewallIndex;
        this.fields=[
          ...this.fields,
          {
            key: 'priorityId',
            type: 'select',
            defaultValue: priorityOptions[1].id,
            props: {
              label: 'Priority',
              placeholder: 'select priority',
              required: true,
              options: priorityOptions.map((o: { id: string; name: string; iconUrl: any;})=>{
                return {value: o.id, label: o.name};
              }),
            },
          },
          {
            key:'fields',
            fieldGroup: [
              {
                key: requestType.id,
                type: 'select',
                props: {
                  label: 'Request Type',
                  placeholder: 'Select request type',
                  required: true,
                  options: requestType.options.map((o: { id: string; value: string; })=>{
                    return {value:{id:o.id},label:o.value};
                  }),
                },
              },
              {
                key: haveCert.id,
                type: 'radio',
                props: {
                  label: 'Have Certificate',
                  required: true,
                  options: haveCert.options.map((o: { id: string; value: string; })=>{
                    return {value: {id:o.id} ,label:o.value};
                  }),
                },
              }
            ]
          },
          {
            key:'firewalls',
            fieldGroup: [
              this.getFirewallField(this.firewallIndex)
            ]
          }
        ];
      }
    });
  }

  getFirewallField(firewallIndex: number){
    const index = ""+firewallIndex;
    return       {
      key:`firewall${index.padStart(2, '0')}`,
      wrappers: [FirewallFieldGroupWrapper],
      fieldGroup: [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'fwType',
              type: 'select',
              props: {
                label: 'Type',
                placeholder: 'Select request type',
                options: [
                  {value: 'add',label:'新增'},
                  {value: 'remove',label:'移除'},
                ],
              },
            },
            {
              className: 'flex-1',
              key: 'fwAction',
              type: 'select',
              props: {
                label: 'Action',
                options: [
                  {value: 'allow',label:'開通'},
                  {value: 'deny',label:'拒絕'},
                ],
              },
            },
          ]
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'from',
              type: 'select',
              props: {
                label: 'From',
                options: [
                  {value: 'all OA client',label:'All OA Client'},
                  {value: 'internet',label:'Internet'},
                  {value: '機房 Host/FQDN/IP/CIDR',label:'機房 Host/FQDN/IP/CIDR'},
                  {value: 'Cloud Host/FQDN/IP',label:'Cloud Host/FQDN/IP'},
                ],
              },
            },
            {
              className: 'flex-1',
              key: 'fromHostName',
              type: 'input',
              props: {
                label: 'Host name/FQDN(From)'
              }
            },
            {
              className: 'flex-1',
              key: 'fromIp',
              type: 'input',
              props: {
                label: 'IP(From)'
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'to',
              type: 'select',
              props: {
                label: 'To',
                options: [
                  {value: 'all OA client',label:'All OA Client'},
                  {value: 'internet',label:'Internet'},
                  {value: '機房 Host/FQDN/IP/CIDR',label:'機房 Host/FQDN/IP/CIDR'},
                  {value: 'Cloud Host/FQDN/IP',label:'Cloud Host/FQDN/IP'},
                ],
              },
            },
            {
              className: 'flex-1',
              key: 'toHostName',
              type: 'input',
              props: {
                label: 'Host name/FQDN(To)'
              }
            },
            {
              className: 'flex-1',
              key: 'toIp',
              type: 'input',
              props: {
                label: 'IP(To)'
              }
            },
          ]
        },
        {
          key: 'application',
          type: 'select',
          props: {
            label: 'Application',
            options: [
              {value: 'other',label:'Other'},
            ],
          },
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'protocol',
              type: 'select',
              props: {
                label: 'Protocol',
                options: [
                  {value: 'tcp',label:'TCP'},
                  {value: 'udp',label:'UDP'},
                  {value: 'icmp',label:'ICMP'},
                ],
              },
            },
            {
              className: 'flex-1',
              key: 'portFrom',
              type: 'input',
              props: {
                label: 'Port(From)'
              }
            },
            {
              className: 'flex-1',
              key: 'portTo',
              type: 'input',
              props: {
                label: 'Port(To)'
              }
            },
          ]
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'env',
              type: 'select',
              props: {
                label: 'Environment',
                options: [
                  {value: 'test',label:'Test(測試環境)'},
                  {value: 'prod',label:'Production(正式環境)'},
                ],
              },
            },
            {
              className: 'flex-1',
              key: 'startDate',
              type: 'datepicker',
              props: {
                label: 'Date(From)',
              },
            },
            {
              className: 'flex-1',
              key: 'endDate',
              type: 'datepicker',
              props: {
                label: 'Date(To)',
              },
            }
          ]
        },
        {
          key: 'note',
          type: 'textarea',
          props: {
            label: 'Purpose / Note',
            autosize: true,
            autosizeMinRows:2,
            autosizeMaxRows:5
          }
        },
      ]
    }
  }

  addField(){
    this.firewallIndex++;
    this.fields.find(x=>x.key=='firewalls')?.fieldGroup?.push(this.getFirewallField(this.firewallIndex))
    this.fields=[...this.fields];
  }

  removeField(){
    this.fields.find(x=>x.key=='firewalls')?.fieldGroup?.pop();
    this.fields=[...this.fields];
    this.firewallIndex--;
  }

  onSubmit(model: any) {
    let data = {...model,reporter:this.user.currentUser.value};
    this.biz.createRequest('firewall',data).then(rs=>{
      if(rs.code=="0000"){
        alert(`created success! (${rs.data.key})`);
        this.options.resetModel?.();
      } else {
        alert("created failures")
      }
    }).catch(error=>{
      console.log(error);
      alert("created failures")
    })
  }

  pageBack(){
    this.location.back()
  }
}
