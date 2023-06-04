import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePreciosXproductoMensualComponent } from './reporte-precios-xproducto-mensual.component';

describe('ReportePreciosXproductoMensualComponent', () => {
  let component: ReportePreciosXproductoMensualComponent;
  let fixture: ComponentFixture<ReportePreciosXproductoMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePreciosXproductoMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePreciosXproductoMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
