import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatZonasComponent } from './cat-zonas.component';

describe('CatZonasComponent', () => {
  let component: CatZonasComponent;
  let fixture: ComponentFixture<CatZonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatZonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
