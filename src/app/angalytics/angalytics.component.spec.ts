import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngalyticsComponent } from './angalytics.component';

describe('AngalyticsComponent', () => {
  let component: AngalyticsComponent;
  let fixture: ComponentFixture<AngalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
