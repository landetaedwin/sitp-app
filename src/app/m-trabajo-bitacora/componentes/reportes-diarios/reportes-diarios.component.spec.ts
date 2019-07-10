import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDiariosComponent } from './reportes-diarios.component';

describe('ReportesDiariosComponent', () => {
  let component: ReportesDiariosComponent;
  let fixture: ComponentFixture<ReportesDiariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesDiariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesDiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
