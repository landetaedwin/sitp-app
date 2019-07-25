import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTrabajoDiarioComponent } from './registro-trabajo-diario.component';

describe('RegistroTrabajoDiarioComponent', () => {
  let component: RegistroTrabajoDiarioComponent;
  let fixture: ComponentFixture<RegistroTrabajoDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTrabajoDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTrabajoDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
