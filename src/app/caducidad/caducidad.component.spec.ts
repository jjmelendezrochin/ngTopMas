import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaducidadComponent } from './caducidad.component';

describe('CaducidadComponent', () => {
  let component: CaducidadComponent;
  let fixture: ComponentFixture<CaducidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaducidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaducidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
