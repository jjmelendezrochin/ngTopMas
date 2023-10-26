import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosSlideSclComponent } from './filtros-slide-scl.component';

describe('FiltrosSlideSclComponent', () => {
  let component: FiltrosSlideSclComponent;
  let fixture: ComponentFixture<FiltrosSlideSclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosSlideSclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosSlideSclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
