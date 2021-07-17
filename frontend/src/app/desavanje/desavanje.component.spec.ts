import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesavanjeComponent } from './desavanje.component';

describe('DesavanjeComponent', () => {
  let component: DesavanjeComponent;
  let fixture: ComponentFixture<DesavanjeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesavanjeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
