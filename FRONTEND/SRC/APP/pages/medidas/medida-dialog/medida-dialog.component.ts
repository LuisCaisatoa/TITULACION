import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { MedidaModel } from 'src/app/models/medida';
import { MedidaService } from 'src/app/services/medida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medida-dialog',
  templateUrl: './medida-dialog.component.html',
  styleUrls: ['./medida-dialog.component.scss']
})
export class MedidaDialogComponent implements OnInit {

  medidaModel: MedidaModel = new MedidaModel();
  form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<MedidaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MedidaModel = new MedidaModel(),
    private _service: MedidaService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      'idMedida': [0],
      'nombre': ['', Validators.required],
      // Otros campos del modelo si es necesario
    });
  }
  ngOnInit(): void {
    if(this.data.idMedida === 0){
      this.form.reset();
    }else{
      this.form.patchValue(this.data);
    }
  }

  operar() {
    if (this.form.valid) {
      this.medidaModel = { ...this.form.value };

      if (this.medidaModel.idMedida > 0) {
        this._service.put(this.medidaModel, this.medidaModel.idMedida).subscribe(() => {
          this.listarMedidasActualizar();
        });
      } else {
        this._service.post(this.medidaModel).pipe(switchMap(() => this._service.getAll()))
          .subscribe(() => {
            this.listarMedidasCrear();
          });
      }
    } else {
      return;
    }

    this.cerrar();
  }

  cerrar() {
    this._dialogRef.close();
  }


  private listarMedidasCrear() {
    this._service.getAll().subscribe((data: MedidaModel[]) => {
      this._service.medidaCambio.next(data);
      this._service.mensajeCambio.next('Se registró la medida');
    });
  }

  private listarMedidasActualizar() {
    this._service.getAll().subscribe((data: MedidaModel[]) => {
      this._service.medidaCambio.next(data);
      this._service.mensajeCambio.next('Se modificó la medida');
    });
  }

}
