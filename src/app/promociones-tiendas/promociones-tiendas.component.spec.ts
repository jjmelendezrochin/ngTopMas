import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesTiendasComponent } from './promociones-tiendas.component';

describe('PromocionesTiendasComponent', () => {
  let component: PromocionesTiendasComponent;
  let fixture: ComponentFixture<PromocionesTiendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocionesTiendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionesTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
