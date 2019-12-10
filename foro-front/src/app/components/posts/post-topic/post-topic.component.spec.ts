import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTopicComponent } from './post-topic.component';

describe('PostTopicComponent', () => {
  let component: PostTopicComponent;
  let fixture: ComponentFixture<PostTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
