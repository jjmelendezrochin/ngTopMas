import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCadenaComponent } from './cat-cadena.component';

describe('CatCadenaComponent', () => {
  let component: CatCadenaComponent;
  let fixture: ComponentFixture<CatCadenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatCadenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCadenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
