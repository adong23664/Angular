import { Component } from "@angular/core";
import { FieldWrapper } from "@ngx-formly/core";

@Component({
  selector: 'firewall-field-group',
  template: `
    <div class="card">
      <div class="card-body">
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./firewall-field-group.component.css']
})
export class FirewallFieldGroupWrapper extends FieldWrapper {
}
