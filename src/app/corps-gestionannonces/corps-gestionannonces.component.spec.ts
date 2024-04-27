import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpsGestionannoncesComponent } from './corps-gestionannonces.component';

describe('CorpsGestionannoncesComponent', () => {
  let component: CorpsGestionannoncesComponent;
  let fixture: ComponentFixture<CorpsGestionannoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorpsGestionannoncesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorpsGestionannoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
