import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAsistencia1Component } from './reporte-asistencia1.component';

describe('ReporteAsistencia1Component', () => {
  let component: ReporteAsistencia1Component;
  let fixture: ComponentFixture<ReporteAsistencia1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAsistencia1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAsistencia1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
