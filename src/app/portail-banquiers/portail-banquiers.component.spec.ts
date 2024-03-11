import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortailBanquiersComponent } from './portail-banquiers.component';

describe('PortailBanquiersComponent', () => {
  let component: PortailBanquiersComponent;
  let fixture: ComponentFixture<PortailBanquiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortailBanquiersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortailBanquiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
