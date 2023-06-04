import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarReporteExcelComponent } from './generar-reporte-excel.component';

describe('GenerarReporteExcelComponent', () => {
  let component: GenerarReporteExcelComponent;
  let fixture: ComponentFixture<GenerarReporteExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarReporteExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarReporteExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
