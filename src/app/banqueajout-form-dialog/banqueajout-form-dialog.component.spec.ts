import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueajoutFormDialogComponent } from './banqueajout-form-dialog.component';

describe('BanqueajoutFormDialogComponent', () => {
  let component: BanqueajoutFormDialogComponent;
  let fixture: ComponentFixture<BanqueajoutFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanqueajoutFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanqueajoutFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
