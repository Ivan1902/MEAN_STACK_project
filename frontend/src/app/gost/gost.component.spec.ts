import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GostComponent } from './gost.component';

describe('GostComponent', () => {
  let component: GostComponent;
  let fixture: ComponentFixture<GostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
