import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailClientComponent } from './portail-client.component';

describe('PortailClientComponent', () => {
  let component: PortailClientComponent;
  let fixture: ComponentFixture<PortailClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortailClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
