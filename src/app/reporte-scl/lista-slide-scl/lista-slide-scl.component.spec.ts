import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSlideSclComponent } from './lista-slide-scl.component';

describe('ListaSlideSclComponent', () => {
  let component: ListaSlideSclComponent;
  let fixture: ComponentFixture<ListaSlideSclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSlideSclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSlideSclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
