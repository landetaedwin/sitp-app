import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPortafolioComponent } from './editar-portafolio.component';

describe('EditarPortafolioComponent', () => {
  let component: EditarPortafolioComponent;
  let fixture: ComponentFixture<EditarPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
