import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoNovedadComponent } from './seguimiento-novedad.component';

describe('SeguimientoNovedadComponent', () => {
  let component: SeguimientoNovedadComponent;
  let fixture: ComponentFixture<SeguimientoNovedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoNovedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
