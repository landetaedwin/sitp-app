import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionInyectorComponent } from './verificacion-inyector.component';

describe('VerificacionInyectorComponent', () => {
  let component: VerificacionInyectorComponent;
  let fixture: ComponentFixture<VerificacionInyectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionInyectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionInyectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
