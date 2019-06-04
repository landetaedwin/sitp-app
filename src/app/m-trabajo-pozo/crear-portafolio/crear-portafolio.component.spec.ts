import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPortafolioComponent } from './crear-portafolio.component';

describe('CrearPortafolioComponent', () => {
  let component: CrearPortafolioComponent;
  let fixture: ComponentFixture<CrearPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
