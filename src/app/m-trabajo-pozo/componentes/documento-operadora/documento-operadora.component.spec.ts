import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoOperadoraComponent } from './documento-operadora.component';

describe('DocumentoOperadoraComponent', () => {
  let component: DocumentoOperadoraComponent;
  let fixture: ComponentFixture<DocumentoOperadoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoOperadoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoOperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
