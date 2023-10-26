import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReporteHistoricoComponent } from './filtros-reporte-historico.component';

describe('FiltrosReporteHistoricoComponent', () => {
  let component: FiltrosReporteHistoricoComponent;
  let fixture: ComponentFixture<FiltrosReporteHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosReporteHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReporteHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
