import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAjusteAcumuladoComponent } from './gestion-ajuste-acumulado.component';

describe('GestionAjusteAcumuladoComponent', () => {
  let component: GestionAjusteAcumuladoComponent;
  let fixture: ComponentFixture<GestionAjusteAcumuladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAjusteAcumuladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAjusteAcumuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
