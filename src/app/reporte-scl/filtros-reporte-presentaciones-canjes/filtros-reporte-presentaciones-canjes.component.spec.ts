import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosReportePresentacionesCanjesComponent } from './filtros-reporte-presentaciones-canjes.component';

describe('FiltrosReportePresentacionesCanjesComponent', () => {
  let component: FiltrosReportePresentacionesCanjesComponent;
  let fixture: ComponentFixture<FiltrosReportePresentacionesCanjesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosReportePresentacionesCanjesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosReportePresentacionesCanjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
