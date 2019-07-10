import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPortafolioVerificacionComponent } from './buscar-portafolio-verificacion.component';

describe('BuscarPortafolioVerificacionComponent', () => {
  let component: BuscarPortafolioVerificacionComponent;
  let fixture: ComponentFixture<BuscarPortafolioVerificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPortafolioVerificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPortafolioVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
