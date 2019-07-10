import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionProduccionComponent } from './verificacion-produccion.component';

describe('VerificacionProduccionComponent', () => {
  let component: VerificacionProduccionComponent;
  let fixture: ComponentFixture<VerificacionProduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionProduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
