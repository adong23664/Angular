import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesTableComponent } from './issues-table.component';

describe('IssuesTableComponent', () => {
  let component: IssuesTableComponent;
  let fixture: ComponentFixture<IssuesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssuesTableComponent]
    });
    fixture = TestBed.createComponent(IssuesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
