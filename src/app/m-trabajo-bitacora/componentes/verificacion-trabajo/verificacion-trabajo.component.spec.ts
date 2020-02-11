import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionTrabajoComponent } from './verificacion-trabajo.component';

describe('VerificacionTrabajoComponent', () => {
  let component: VerificacionTrabajoComponent;
  let fixture: ComponentFixture<VerificacionTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificacionTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
