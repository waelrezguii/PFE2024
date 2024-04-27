import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumEveryoneComponent } from './forum-everyone.component';

describe('ForumEveryoneComponent', () => {
  let component: ForumEveryoneComponent;
  let fixture: ComponentFixture<ForumEveryoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumEveryoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumEveryoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
