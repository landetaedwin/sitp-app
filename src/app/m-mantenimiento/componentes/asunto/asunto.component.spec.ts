import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsuntoComponent } from './asunto.component';

describe('AsuntoComponent', () => {
  let component: AsuntoComponent;
  let fixture: ComponentFixture<AsuntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsuntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
