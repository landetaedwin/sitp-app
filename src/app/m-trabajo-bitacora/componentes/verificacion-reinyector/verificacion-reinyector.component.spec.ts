import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionReinyectorComponent } from './verificacion-reinyector.component';

describe('VerificacionReinyectorComponent', () => {
  let component: VerificacionReinyectorComponent;
  let fixture: ComponentFixture<VerificacionReinyectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionReinyectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionReinyectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
