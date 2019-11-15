import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionTasaComponent } from './verificacion-tasa.component';

describe('VerificacionTasaComponent', () => {
  let component: VerificacionTasaComponent;
  let fixture: ComponentFixture<VerificacionTasaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionTasaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionTasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
