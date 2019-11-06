import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVerificacionInyectorComponent } from './editar-verificacion-inyector.component';

describe('EditarVerificacionInyectorComponent', () => {
  let component: EditarVerificacionInyectorComponent;
  let fixture: ComponentFixture<EditarVerificacionInyectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVerificacionInyectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVerificacionInyectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
