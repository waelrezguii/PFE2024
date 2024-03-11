import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailCLoggedComponent } from './portail-clogged.component';

describe('PortailCLoggedComponent', () => {
  let component: PortailCLoggedComponent;
  let fixture: ComponentFixture<PortailCLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortailCLoggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortailCLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
