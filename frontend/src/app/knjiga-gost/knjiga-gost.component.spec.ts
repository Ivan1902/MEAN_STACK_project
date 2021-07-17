import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnjigaGostComponent } from './knjiga-gost.component';

describe('KnjigaGostComponent', () => {
  let component: KnjigaGostComponent;
  let fixture: ComponentFixture<KnjigaGostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnjigaGostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnjigaGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
