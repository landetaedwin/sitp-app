import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarPagosComponent } from './verificar-pagos.component';

describe('VerificarPagosComponent', () => {
  let component: VerificarPagosComponent;
  let fixture: ComponentFixture<VerificarPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
