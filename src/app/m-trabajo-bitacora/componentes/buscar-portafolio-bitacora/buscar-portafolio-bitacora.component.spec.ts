import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPortafolioBitacoraComponent } from './buscar-portafolio-bitacora.component';

describe('BuscarPortafolioBitacoraComponent', () => {
  let component: BuscarPortafolioBitacoraComponent;
  let fixture: ComponentFixture<BuscarPortafolioBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPortafolioBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPortafolioBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
