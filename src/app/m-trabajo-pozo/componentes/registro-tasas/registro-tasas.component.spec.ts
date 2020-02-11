import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTasasComponent } from './registro-tasas.component';

describe('RegistroTasasComponent', () => {
  let component: RegistroTasasComponent;
  let fixture: ComponentFixture<RegistroTasasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTasasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTasasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
