import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosDialogComponent } from './prestamos-dialog.component';

describe('PrestamosDialogComponent', () => {
  let component: PrestamosDialogComponent;
  let fixture: ComponentFixture<PrestamosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
