import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorelibComponent } from './corelib.component';

describe('CorelibComponent', () => {
  let component: CorelibComponent;
  let fixture: ComponentFixture<CorelibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorelibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CorelibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
