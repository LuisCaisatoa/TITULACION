import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { BodegaModel } from 'src/app/models/bodega';
import { BodegaService } from 'src/app/services/bodega.service';

@Component({
  selector: 'app-bodega-dialog',
  templateUrl: './bodega-dialog.component.html',
  styleUrls: ['./bodega-dialog.component.scss']
})
export class BodegaDialogComponent implements OnInit {

  bodegaModel: BodegaModel = new BodegaModel();
  form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<BodegaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BodegaModel = new BodegaModel(),
    private _service: BodegaService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      'idBodega': [0],
      'nombre': ['', Validators.required],
      'ubicacion': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    //this.categoriaModel = { ...this.data };
    if(this.data.idBodega === 0){
      this.form.reset();
    }else{
      this.form.patchValue(this.data);
    }

  }
  operar() {
    if (this.form.valid) {
      this.bodegaModel = { ...this.form.value };

      if (this.bodegaModel.idBodega > 0) {
        this._service.put(this.bodegaModel, this.bodegaModel.idBodega).subscribe(() => {
          this.listarBodegasActualizar();
        });
      } else {
        this._service.post(this.bodegaModel).pipe(switchMap(() => this._service.getAll()))
          .subscribe(() => {
            this.listarBodegasCrear();
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

  private listarBodegasCrear() {
    this._service.getAll().subscribe((data: BodegaModel[]) => {
      this._service.bodegaCambio.next(data);
      this._service.mensajeCambio.next('Se registro la bodega');
    });
  }


  private listarBodegasActualizar() {
    this._service.getAll().subscribe((data: BodegaModel[]) => {
      this._service.bodegaCambio.next(data);
      this._service.mensajeCambio.next('Se modificó la bodega');
    });
  }
}
