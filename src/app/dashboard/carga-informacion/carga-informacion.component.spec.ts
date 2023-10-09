import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaInformacionComponent } from './carga-informacion.component';

describe('CargaInformacionComponent', () => {
  let component: CargaInformacionComponent;
  let fixture: ComponentFixture<CargaInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
