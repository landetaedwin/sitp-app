import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformeOperadoraComponent } from './editar-informe-operadora.component';

describe('EditarInformeOperadoraComponent', () => {
  let component: EditarInformeOperadoraComponent;
  let fixture: ComponentFixture<EditarInformeOperadoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInformeOperadoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformeOperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
