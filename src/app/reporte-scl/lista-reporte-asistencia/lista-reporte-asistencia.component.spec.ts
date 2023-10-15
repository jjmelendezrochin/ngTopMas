import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteAsistenciaComponent } from './lista-reporte-asistencia.component';

describe('ListaReporteAsistenciaComponent', () => {
  let component: ListaReporteAsistenciaComponent;
  let fixture: ComponentFixture<ListaReporteAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
