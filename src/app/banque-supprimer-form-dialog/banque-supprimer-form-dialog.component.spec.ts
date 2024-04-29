import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueSupprimerFormDialogComponent } from './banque-supprimer-form-dialog.component';

describe('BanqueSupprimerFormDialogComponent', () => {
  let component: BanqueSupprimerFormDialogComponent;
  let fixture: ComponentFixture<BanqueSupprimerFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanqueSupprimerFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanqueSupprimerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
