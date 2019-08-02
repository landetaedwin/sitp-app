import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoMinisterioComponent } from './documento-ministerio.component';

describe('DocumentoMinisterioComponent', () => {
  let component: DocumentoMinisterioComponent;
  let fixture: ComponentFixture<DocumentoMinisterioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoMinisterioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoMinisterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
