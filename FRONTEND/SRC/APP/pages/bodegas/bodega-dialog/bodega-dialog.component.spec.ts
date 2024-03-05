import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegaDialogComponent } from './bodega-dialog.component';

describe('BodegaDialogComponent', () => {
  let component: BodegaDialogComponent;
  let fixture: ComponentFixture<BodegaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodegaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
