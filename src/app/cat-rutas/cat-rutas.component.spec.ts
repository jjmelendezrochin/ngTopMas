import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatRutasComponent } from './cat-rutas.component';

describe('CatRutasComponent', () => {
  let component: CatRutasComponent;
  let fixture: ComponentFixture<CatRutasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatRutasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
