import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { AsignadoModel } from 'src/app/models/asignado';
import { AsignadoService } from 'src/app/services/asignado.service';

@Component({
  selector: 'app-asignados-dialog',
  templateUrl: './asignados-dialog.component.html',
  styleUrls: ['./asignados-dialog.component.scss']
})
export class AsignadosDialogComponent implements OnInit {

  asignadoModel: AsignadoModel = new AsignadoModel();
  form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<AsignadosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AsignadoModel = new AsignadoModel(),
    private _service: AsignadoService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      'idAsignado': [0],
      'cedula': ['', Validators.required],
      'nombres': ['', Validators.required],
      'apellidos': ['', Validators.required],
      'telefono': ['', Validators.required],
      'cargo': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    //this.categoriaModel = { ...this.data };
    if(this.data.idAsignado === 0){
      this.form.reset();
    }else{
      this.form.patchValue(this.data);
    }

  }
  operar() {
    if (this.form.valid) {
      this.asignadoModel = { ...this.form.value };

      if (this.asignadoModel.idAsignado > 0) {
        this._service.put(this.asignadoModel, this.asignadoModel.idAsignado).subscribe(() => {
          this.listarAsignadosActualizar();
        });
      } else {
        this._service.post(this.asignadoModel).pipe(switchMap(() => this._service.getAll()))
          .subscribe(() => {
            this.listarAsignadosCrear();
          });
      }
    } else {
      return;
    }

    this.cerrar();
  }


  cerrar(){
    this._dialogRef.close();
  }

  private listarAsignadosCrear() {
    this._service.getAll().subscribe((data: AsignadoModel[]) => {
      this._service.asignadoCambio.next(data);
      this._service.mensajeCambio.next('Se registro el usuario asignado');
    });
  }


  private listarAsignadosActualizar() {
    this._service.getAll().subscribe((data: AsignadoModel[]) => {
      this._service.asignadoCambio.next(data);
      this._service.mensajeCambio.next('Se modificó el usuario asignado');
    });
  }

}
