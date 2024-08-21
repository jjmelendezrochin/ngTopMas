import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarRespuestaComponent } from './dar-respuesta.component';

describe('DarRespuestaComponent', () => {
  let component: DarRespuestaComponent;
  let fixture: ComponentFixture<DarRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
