import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVerificacionReinyectorComponent } from './editar-verificacion-reinyector.component';

describe('EditarVerificacionReinyectorComponent', () => {
  let component: EditarVerificacionReinyectorComponent;
  let fixture: ComponentFixture<EditarVerificacionReinyectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVerificacionReinyectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVerificacionReinyectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
