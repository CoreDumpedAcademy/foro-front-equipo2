import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDComponent } from './md.component';

describe('MDComponent', () => {
  let component: MDComponent;
  let fixture: ComponentFixture<MDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
