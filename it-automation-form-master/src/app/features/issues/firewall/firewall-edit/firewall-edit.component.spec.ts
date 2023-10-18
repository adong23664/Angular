import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallEditComponent } from './firewall-edit.component';

describe('FirewallEditComponent', () => {
  let component: FirewallEditComponent;
  let fixture: ComponentFixture<FirewallEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirewallEditComponent]
    });
    fixture = TestBed.createComponent(FirewallEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
