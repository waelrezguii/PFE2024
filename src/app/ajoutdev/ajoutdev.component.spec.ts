import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutdevComponent } from './ajoutdev.component';

describe('AjoutdevComponent', () => {
  let component: AjoutdevComponent;
  let fixture: ComponentFixture<AjoutdevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutdevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
