import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSupervisorComponent } from './cat-supervisor.component';

describe('CatSupervisorComponent', () => {
  let component: CatSupervisorComponent;
  let fixture: ComponentFixture<CatSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
