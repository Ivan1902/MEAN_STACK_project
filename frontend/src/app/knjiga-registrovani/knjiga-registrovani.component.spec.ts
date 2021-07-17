import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaRegistrovaniComponent } from './knjiga-registrovani.component';

describe('KnjigaRegistrovaniComponent', () => {
  let component: KnjigaRegistrovaniComponent;
  let fixture: ComponentFixture<KnjigaRegistrovaniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnjigaRegistrovaniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigaRegistrovaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
