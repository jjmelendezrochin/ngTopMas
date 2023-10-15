import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteDesplazamientoComponent } from './lista-reporte-desplazamiento.component';

describe('ListaReporteDesplazamientoComponent', () => {
  let component: ListaReporteDesplazamientoComponent;
  let fixture: ComponentFixture<ListaReporteDesplazamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteDesplazamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteDesplazamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
