import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSeguimientoNovedadComponent } from './editar-seguimiento-novedad.component';

describe('EditarSeguimientoNovedadComponent', () => {
  let component: EditarSeguimientoNovedadComponent;
  let fixture: ComponentFixture<EditarSeguimientoNovedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSeguimientoNovedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSeguimientoNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
