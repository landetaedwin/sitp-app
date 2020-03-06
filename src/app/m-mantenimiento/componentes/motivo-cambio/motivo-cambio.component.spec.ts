import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoCambioComponent } from './motivo-cambio.component';

describe('MotivoCambioComponent', () => {
  let component: MotivoCambioComponent;
  let fixture: ComponentFixture<MotivoCambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoCambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
