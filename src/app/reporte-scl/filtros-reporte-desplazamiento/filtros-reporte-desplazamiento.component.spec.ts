import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReporteDesplazamientoComponent } from './filtros-reporte-desplazamiento.component';

describe('FiltrosReporteDesplazamientoComponent', () => {
  let component: FiltrosReporteDesplazamientoComponent;
  let fixture: ComponentFixture<FiltrosReporteDesplazamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosReporteDesplazamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReporteDesplazamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
