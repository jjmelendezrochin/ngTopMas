import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReporteAsistencia1Component } from './filtros-reporte-asistencia1.component';

describe('FiltrosReporteAsistencia1Component', () => {
  let component: FiltrosReporteAsistencia1Component;
  let fixture: ComponentFixture<FiltrosReporteAsistencia1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosReporteAsistencia1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReporteAsistencia1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
