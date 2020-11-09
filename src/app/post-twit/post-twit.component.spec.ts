import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTwitComponent } from './post-twit.component';

describe('PostTwitComponent', () => {
  let component: PostTwitComponent;
  let fixture: ComponentFixture<PostTwitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTwitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTwitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
