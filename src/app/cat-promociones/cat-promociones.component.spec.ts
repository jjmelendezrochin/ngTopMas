import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPromocionesComponent } from './cat-promociones.component';

describe('CatPromocionesComponent', () => {
  let component: CatPromocionesComponent;
  let fixture: ComponentFixture<CatPromocionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatPromocionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
