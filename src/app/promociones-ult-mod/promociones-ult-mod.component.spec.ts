import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesUltModComponent } from './promociones-ult-mod.component';

describe('PromocionesUltModComponent', () => {
  let component: PromocionesUltModComponent;
  let fixture: ComponentFixture<PromocionesUltModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionesUltModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionesUltModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
