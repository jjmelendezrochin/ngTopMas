import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteHistoricoComponent } from './lista-reporte-historico.component';

describe('ListaReporteHistoricoComponent', () => {
  let component: ListaReporteHistoricoComponent;
  let fixture: ComponentFixture<ListaReporteHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReporteHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReporteHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
