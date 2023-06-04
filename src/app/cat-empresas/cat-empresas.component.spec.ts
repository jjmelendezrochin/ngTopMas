import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatEmpresasComponent } from './cat-empresas.component';

describe('CatEmpresasComponent', () => {
  let component: CatEmpresasComponent;
  let fixture: ComponentFixture<CatEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
