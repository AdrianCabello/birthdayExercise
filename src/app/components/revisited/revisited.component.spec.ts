import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisitedComponent } from './revisited.component';

describe('RevisitedComponent', () => {
  let component: RevisitedComponent;
  let fixture: ComponentFixture<RevisitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisitedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
