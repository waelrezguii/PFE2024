import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueFormDialogComponent } from './banque-form-dialog.component';

describe('BanqueFormDialogComponent', () => {
  let component: BanqueFormDialogComponent;
  let fixture: ComponentFixture<BanqueFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanqueFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanqueFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
