import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusionesRecomendacionesComponent } from './conclusiones-recomendaciones.component';

describe('ConclusionesRecomendacionesComponent', () => {
  let component: ConclusionesRecomendacionesComponent;
  let fixture: ComponentFixture<ConclusionesRecomendacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclusionesRecomendacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclusionesRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
