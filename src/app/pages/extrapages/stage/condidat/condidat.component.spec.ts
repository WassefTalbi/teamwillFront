import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidatComponent } from './condidat.component';

describe('CondidatComponent', () => {
  let component: CondidatComponent;
  let fixture: ComponentFixture<CondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
