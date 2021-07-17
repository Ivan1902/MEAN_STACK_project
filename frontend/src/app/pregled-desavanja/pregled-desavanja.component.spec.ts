import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledDesavanjaComponent } from './pregled-desavanja.component';

describe('PregledDesavanjaComponent', () => {
  let component: PregledDesavanjaComponent;
  let fixture: ComponentFixture<PregledDesavanjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregledDesavanjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledDesavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
