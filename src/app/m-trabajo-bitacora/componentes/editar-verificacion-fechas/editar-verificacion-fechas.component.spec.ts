import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVerificacionFechasComponent } from './editar-verificacion-fechas.component';

describe('EditarVerificacionFechasComponent', () => {
  let component: EditarVerificacionFechasComponent;
  let fixture: ComponentFixture<EditarVerificacionFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVerificacionFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVerificacionFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
