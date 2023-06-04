import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatPromotorComponent } from './cat-promotor.component';

describe('CatPromotorComponent', () => {
  let component: CatPromotorComponent;
  let fixture: ComponentFixture<CatPromotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatPromotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatPromotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
