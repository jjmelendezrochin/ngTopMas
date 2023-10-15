import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSclComponent } from './reporte-scl.component';

describe('ReporteSclComponent', () => {
  let component: ReporteSclComponent;
  let fixture: ComponentFixture<ReporteSclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
