import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetovanjeComponent } from './resetovanje.component';

describe('ResetovanjeComponent', () => {
  let component: ResetovanjeComponent;
  let fixture: ComponentFixture<ResetovanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetovanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetovanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
