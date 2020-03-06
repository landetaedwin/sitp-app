import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPozoComponent } from './tipo-pozo.component';

describe('TipoPozoComponent', () => {
  let component: TipoPozoComponent;
  let fixture: ComponentFixture<TipoPozoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoPozoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
