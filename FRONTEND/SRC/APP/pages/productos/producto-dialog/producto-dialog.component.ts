import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { CategoriaModel } from 'src/app/models/categoria';
import { MedidaModel } from 'src/app/models/medida';
import { ProductoModel } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MedidaService } from 'src/app/services/medida.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.scss']
})
export class ProductoDialogComponent implements OnInit {

  productoModel: ProductoModel = new ProductoModel();
  categoriaModel: CategoriaModel = new CategoriaModel();
  categoriasArray: CategoriaModel[] = [];
  medidasArray: MedidaModel[] = [];
  form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoModel = new ProductoModel(),
    private _service: ProductoService,
    private _serviceCategoria: CategoriaService,
    private _serviceMedida:MedidaService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    console.log(this.data);
    this.productoModel = { ...this.data };
    //this.categoriaModel = { ...this.data };
    this.cargarCategorias();
    this.cargarMedidas();
  }

  validarInput(event: any) {
    const inputChar = String.fromCharCode(event.charCode);
    // Utiliza una expresión regular para permitir solo números enteros
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  operar() {

      if (this.productoModel.idProducto > 0) {
        console.log('model',this.productoModel);
        if(this.productoModel.codigo != "" && this.productoModel.nombre != ""){
          this._service.put(this.productoModel, this.productoModel.idProducto).pipe(switchMap(() => this._service.getAll()))
          .subscribe(() => {
            this.listarProductosActualizar();
          });
        }else{
          this.snackBar.open('Debe llenar todos los campos son obligatorios', 'AVISO', { duration: 2000 });
        }

      } else {
        if(this.productoModel.codigo != null ||
          this.productoModel.nombre != null){
            this._service.post(this.productoModel).pipe(switchMap(() => this._service.getAll()))
            .subscribe(() => {
              this.listarProductosCrear();
            });
          }else{
            this.snackBar.open('Debe llenar todos los campos son obligatorios', 'AVISO', { duration: 2000 });
          }
      }

    this.cerrar();
  }



  cargarCategorias() {
    this._serviceCategoria.getAll().subscribe((res: any) => {
      this.categoriasArray = res;
    });
  }

  cargarMedidas() {
    this._serviceMedida.getAll().subscribe((res: any) => {
      this.medidasArray = res;
    });
  }

  cerrar(){
    this._dialogRef.close();
  }

  seleccionarCategoria(e: any) {
    console.log(e.source.value);
    this.productoModel.categoria.idCategoria = e.source.value;
  }

  seleccionarMedida(e: any) {
    console.log(e.source.value);
    this.productoModel.medida.idMedida = e.source.value;
  }

  private listarProductosCrear() {
    this._service.getAll().subscribe((data: ProductoModel[]) => {
      this._service.productoCambio.next(data);
      this._service.mensajeCambio.next('Se registro el producto');
    });
  }

  private listarProductosActualizar() {
    this._service.getAll().subscribe((data: ProductoModel[]) => {
      this._service.productoCambio.next(data);
      this._service.mensajeCambio.next('Se modificó el producto');
    });
  }

}
