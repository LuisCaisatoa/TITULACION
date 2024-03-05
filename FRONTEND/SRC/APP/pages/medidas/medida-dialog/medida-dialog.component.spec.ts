import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidaDialogComponent } from './medida-dialog.component';

describe('MedidaDialogComponent', () => {
  let component: MedidaDialogComponent;
  let fixture: ComponentFixture<MedidaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedidaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
