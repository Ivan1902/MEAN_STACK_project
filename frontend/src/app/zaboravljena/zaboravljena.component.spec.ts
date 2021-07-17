import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaboravljenaComponent } from './zaboravljena.component';

describe('ZaboravljenaComponent', () => {
  let component: ZaboravljenaComponent;
  let fixture: ComponentFixture<ZaboravljenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaboravljenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaboravljenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
