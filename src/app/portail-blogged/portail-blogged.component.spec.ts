import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailBloggedComponent } from './portail-blogged.component';

describe('PortailBloggedComponent', () => {
  let component: PortailBloggedComponent;
  let fixture: ComponentFixture<PortailBloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortailBloggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortailBloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
