import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { CategoriaModel } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss']
})
export class CategoriaDialogComponent implements OnInit {

  categoriaModel: CategoriaModel = new CategoriaModel();
  form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<CategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaModel = new CategoriaModel(),
    private _service: CategoriaService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      'idCategoria': [0],
      'nombre': ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
    //this.categoriaModel = { ...this.data };
    if(this.data.idCategoria === 0){
      this.form.reset();
    }else{
      this.form.patchValue(this.data);
    }

  }
  operar() {
    if (this.form.valid) {
      this.categoriaModel = { ...this.form.value };

      if (this.categoriaModel.idCategoria > 0) {
        this._service.put(this.categoriaModel, this.categoriaModel.idCategoria).subscribe(() => {
          this.listarCategoriasActualizar();
        });
      } else {
        this._service.post(this.categoriaModel).pipe(switchMap(() => this._service.getAll()))
          .subscribe(() => {
            this.listarCategoriasCrear();
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

  private listarCategoriasCrear() {
    this._service.getAll().subscribe((data: CategoriaModel[]) => {
      this._service.categoriaCambio.next(data);
      this._service.mensajeCambio.next('Se registró la categoría');
    });
  }


  private listarCategoriasActualizar() {
    this._service.getAll().subscribe((data: CategoriaModel[]) => {
      this._service.categoriaCambio.next(data);
      this._service.mensajeCambio.next('Se modificó la categoría');
    });
  }
}
