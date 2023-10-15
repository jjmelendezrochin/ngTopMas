import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReportePresentacionesCanjesComponent } from './lista-reporte-presentaciones-canjes.component';

describe('ListaReportePresentacionesCanjesComponent', () => {
  let component: ListaReportePresentacionesCanjesComponent;
  let fixture: ComponentFixture<ListaReportePresentacionesCanjesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaReportePresentacionesCanjesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaReportePresentacionesCanjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
