import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPozoComponent } from './historial-pozo.component';

describe('HistorialPozoComponent', () => {
  let component: HistorialPozoComponent;
  let fixture: ComponentFixture<HistorialPozoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialPozoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialPozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
