import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDialogComponent } from './inventario-dialog.component';

describe('InventarioDialogComponent', () => {
  let component: InventarioDialogComponent;
  let fixture: ComponentFixture<InventarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
