import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquiersComponent } from './banquiers.component';

describe('BanquiersComponent', () => {
  let component: BanquiersComponent;
  let fixture: ComponentFixture<BanquiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanquiersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanquiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
