import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BizService } from './shared/services/biz.service';
import { CustomFieldOption } from './core/models/it-automation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'it_automation_portal';

  requestTypeList:CustomFieldOption[] = [];
  requestTypeIcon : { [ key in string]: string } = {
    'firewall': 'local_fire_department',
    'dns': 'travel_explore',
  }

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private biz: BizService,
  ) { }

  ngOnInit(): void {
    this.biz.getRequestType().then(data=>{
      this.requestTypeList = data.map((rt: any)=>{
        rt.value=rt.value.toLowerCase();
        return rt;
      });
    });
  }
}
