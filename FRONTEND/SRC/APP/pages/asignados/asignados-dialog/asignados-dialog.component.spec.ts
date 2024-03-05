import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignadosDialogComponent } from './asignados-dialog.component';

describe('AsignadosDialogComponent', () => {
  let component: AsignadosDialogComponent;
  let fixture: ComponentFixture<AsignadosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignadosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
