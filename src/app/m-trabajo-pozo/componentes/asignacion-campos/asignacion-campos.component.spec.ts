import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionCamposComponent } from './asignacion-campos.component';

describe('AsignacionCamposComponent', () => {
  let component: AsignacionCamposComponent;
  let fixture: ComponentFixture<AsignacionCamposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignacionCamposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
