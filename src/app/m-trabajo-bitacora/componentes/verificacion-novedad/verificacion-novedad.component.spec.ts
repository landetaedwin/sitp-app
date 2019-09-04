import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionNovedadComponent } from './verificacion-novedad.component';

describe('VerificacionNovedadComponent', () => {
  let component: VerificacionNovedadComponent;
  let fixture: ComponentFixture<VerificacionNovedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionNovedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
