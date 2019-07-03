import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPortafolioComponent } from './buscar-portafolio.component';

describe('BuscarPortafolioComponent', () => {
  let component: BuscarPortafolioComponent;
  let fixture: ComponentFixture<BuscarPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
