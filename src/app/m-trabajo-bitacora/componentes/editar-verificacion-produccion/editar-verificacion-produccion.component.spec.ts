import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVerificacionProduccionComponent } from './editar-verificacion-produccion.component';

describe('EditarVerificacionProduccionComponent', () => {
  let component: EditarVerificacionProduccionComponent;
  let fixture: ComponentFixture<EditarVerificacionProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVerificacionProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVerificacionProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
