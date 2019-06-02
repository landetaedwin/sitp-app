import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularPortafolioComponent } from './anular-portafolio.component';

describe('AnularPortafolioComponent', () => {
  let component: AnularPortafolioComponent;
  let fixture: ComponentFixture<AnularPortafolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularPortafolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
