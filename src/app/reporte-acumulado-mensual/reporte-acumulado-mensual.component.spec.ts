import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAcumuladoMensualComponent } from './reporte-acumulado-mensual.component';

describe('ReporteAcumuladoMensualComponent', () => {
  let component: ReporteAcumuladoMensualComponent;
  let fixture: ComponentFixture<ReporteAcumuladoMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAcumuladoMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAcumuladoMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
