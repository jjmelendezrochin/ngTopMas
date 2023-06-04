import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormatosComponent } from './cat-formatos.component';

describe('CatFormatosComponent', () => {
  let component: CatFormatosComponent;
  let fixture: ComponentFixture<CatFormatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatFormatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFormatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
