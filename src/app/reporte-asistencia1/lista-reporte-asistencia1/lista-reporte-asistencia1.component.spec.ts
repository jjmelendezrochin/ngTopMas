import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteAsistencia1Component } from './lista-reporte-asistencia1.component';

describe('ListaReporteAsistencia1Component', () => {
  let component: ListaReporteAsistencia1Component;
  let fixture: ComponentFixture<ListaReporteAsistencia1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteAsistencia1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteAsistencia1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
