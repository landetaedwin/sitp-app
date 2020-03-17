import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YacimientoComponent } from './yacimiento.component';

describe('YacimientoComponent', () => {
  let component: YacimientoComponent;
  let fixture: ComponentFixture<YacimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YacimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YacimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
