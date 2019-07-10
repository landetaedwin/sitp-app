import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionFechasComponent } from './verificacion-fechas.component';

describe('VerificacionFechasComponent', () => {
  let component: VerificacionFechasComponent;
  let fixture: ComponentFixture<VerificacionFechasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionFechasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
