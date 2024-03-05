import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { AsignadoModel } from 'src/app/models/asignado';
import { PrestamoModel } from 'src/app/models/prestamo';
import { ProductoModel } from 'src/app/models/producto';
import { AsignadoService } from 'src/app/services/asignado.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-prestamos-dialog',
  templateUrl: './prestamos-dialog.component.html',
  styleUrls: ['./prestamos-dialog.component.scss']
})
export class PrestamosDialogComponent implements OnInit {

  prestamoModel: PrestamoModel = new PrestamoModel();
  asignadoModel: AsignadoModel = new AsignadoModel();
  asignadoArray: AsignadoModel[] = [];
  productoModel: ProductoModel = new ProductoModel();
  productoArray: ProductoModel[] = [];
  form: FormGroup;
  isCantidadDisabled: boolean = false;
  isProductoDisabled: boolean = false;
  isEstadoDisabled: boolean = false;
  isObservacionDisabled: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<PrestamosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrestamoModel = new PrestamoModel(),
    private _service: PrestamoService,
    private _serviceAsignado: AsignadoService,
    private _serviceProducto:ProductoService,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {

  }



  ngOnInit(): void {
    console.log(this.data);

    this.prestamoModel = { ...this.data };
    console.log('idproducto',this.prestamoModel.producto.idProducto);
    this.cargarAsignados();
    this.cargarProductos();

    if(this.prestamoModel.producto.idProducto > 0){
      this.isProductoDisabled = true;
      if(this.prestamoModel.estado === 'DEVUELTO'){
        this.isCantidadDisabled = true;
        this.isEstadoDisabled = true;
        this.isObservacionDisabled = true;
      }
    }

  }

  mostrarStockProducto(idProducto: number) {
    console.log('idProducto', idProducto);
    this._serviceProducto.getById(idProducto).subscribe((res: any) => {
      if (idProducto == 0 || idProducto == undefined) {
        // Deshabilitar el combo de producto
        this.isProductoDisabled = false;
      } else {
        this.isProductoDisabled = true;
      }

      if (this.data.idPrestamo === undefined) {
        // Lógica adicional si es necesario
        this.prestamoModel.cantidad = 0;
        this.productoModel.stock = res.stock;
        this.isProductoDisabled = false;
      }

      if (this.data.idPrestamo > 0 && this.prestamoModel.producto.idProducto > 0) {
        // Lógica adicional si es necesario
        console.log('estado', this.isProductoDisabled);
        this.prestamoModel.producto.stock = res.stock;
        this.isProductoDisabled = true;
        if (this.prestamoModel.producto.stock === 0) {
          this.prestamoModel.cantidad = 0;
        }
      }
    });
  }


  // myFilterDesde = (e: Date | null): boolean => {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   return e && e >= today;
  // };

  actualizarMinFechaHasta() {
    // Actualizar el valor mínimo de fechaHasta según fechaDesde
    this.prestamoModel.fechaHasta = this.prestamoModel.fechaDesde;
  }

  validarInput(event: any) {
    const inputChar = String.fromCharCode(event.charCode);

    // Utiliza una expresión regular para permitir solo números enteros
    if (!/^\d+$/.test(inputChar)) {
      event.preventDefault();
    }

    // Evita que se ingrese el valor cero
    const inputValue = parseInt(event.target.value + inputChar, 10);
    if (inputValue === 0) {
      event.preventDefault();
    }
  }

  changeDevuelto(){

  }

  operar() {

      if (this.prestamoModel.idPrestamo > 0) {
        // console.log('model',this.prestamoModel);
        if(this.prestamoModel.fechaDesde != null && this.prestamoModel.fechaHasta != null){

          this._service.put(this.prestamoModel, this.prestamoModel.idPrestamo).pipe(switchMap(() => this._service.getAll()))
          .subscribe(() => {
            if(this.prestamoModel.idPrestamo > 0){
              this.listarPrestamosActualizar();
            }
          }, error => {
            // console.log(error);
            if (error.status === 500) {
              this.snackBar.open(error.error.mensaje, 'AVISO', { duration: 6000 });
            }
          });
        }else{
          this.snackBar.open('Debe llenar todos los campos son obligatorios', 'AVISO', { duration: 2000 });
        }

      } else {
        if(this.productoModel.stock >= this.prestamoModel.cantidad && this.prestamoModel.fechaDesde != null && this.prestamoModel.fechaHasta != null && this.prestamoModel.cantidad != null){
            this._service.post(this.prestamoModel).pipe(switchMap(() => this._service.getAll()))
            .subscribe(() => {
              if(this.prestamoModel.idPrestamo == undefined || this.prestamoModel.idPrestamo == null){
                this.listarPrestamosCrear();
              }

            }, error => {
              // console.log(error);
              if (error.status === 500) {
                this.snackBar.open(error.error.mensaje, 'AVISO', { duration: 6000 });
              }
            });
            ;
          }else{
            this.snackBar.open('No se puede pasar del stock y recuerde que todos los campos son obligatorios', 'AVISO', { duration: 2000 });
          }
      }

    this.cerrar();
  }



  cargarAsignados() {
    this._serviceAsignado.getAll().subscribe((res: any) => {
      this.asignadoArray = res;
    });
  }

  cargarProductos() {
    this._serviceProducto.getAll().subscribe((res: any) => {
      this.productoArray = res;
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

  private listarPrestamosCrear() {
    this._service.getAll().subscribe((data: PrestamoModel[]) => {
      this._service.prestamoCambio.next(data);
      this._service.mensajeCambio.next('Se registro el prestamo');
    });
  }

  private listarPrestamosActualizar() {
    this._service.getAll().subscribe((data: PrestamoModel[]) => {
      console.log('data', data);
      this._service.prestamoCambio.next(data);
      this._service.mensajeCambio.next('Se modificó el prestamo');
    });
  }

  cambiarEstado(nuevoEstado: string) {

    // Asignar el nuevo estado al modelo prestamoModel
    this.prestamoModel.estado = nuevoEstado;

    //Si el campo es EN PRESTAMO, se habilita el campo cantidad en 1
    if(this.prestamoModel.estado === 'EN PRESTAMO'){
      //this.prestamoModel.cantidad = 1;
      this.isCantidadDisabled = false;

    }

    // Si el nuevo estado es DEVUELTO, se deshabilita el campo cantidad
    if(this.prestamoModel.estado === 'DEVUELTO'){
      //this.prestamoModel.cantidad = 0;
      this.isCantidadDisabled = false;
      // this._service.put(this.prestamoModel, this.prestamoModel.idPrestamo).pipe(switchMap(() => this._service.getAll()))
      //     .subscribe(() => {
      //       if(this.prestamoModel.idPrestamo > 0){
      //         this.listarPrestamosActualizar();
      //       }
      //     });
    }else{
      this.isCantidadDisabled = false;
    }


  }

}
