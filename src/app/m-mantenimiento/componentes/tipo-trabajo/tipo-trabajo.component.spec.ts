import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTrabajoComponent } from './tipo-trabajo.component';

describe('TipoTrabajoComponent', () => {
  let component: TipoTrabajoComponent;
  let fixture: ComponentFixture<TipoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
