import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeTrabajosOperadoraComponent } from './informe-trabajos-operadora.component';

describe('InformeTrabajosOperadoraComponent', () => {
  let component: InformeTrabajosOperadoraComponent;
  let fixture: ComponentFixture<InformeTrabajosOperadoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeTrabajosOperadoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeTrabajosOperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
