import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReporteAsistenciaComponent } from './filtros-reporte-asistencia.component';

describe('FiltrosReporteAsistenciaComponent', () => {
  let component: FiltrosReporteAsistenciaComponent;
  let fixture: ComponentFixture<FiltrosReporteAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosReporteAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReporteAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
