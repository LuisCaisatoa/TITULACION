import { Component, Inject, OnInit, Provider } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { BodegaModel } from 'src/app/models/bodega';
import { InventarioModel } from 'src/app/models/inventario';
import { ProductoModel } from 'src/app/models/producto';
import { BodegaService } from 'src/app/services/bodega.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario-dialog',
  templateUrl: './inventario-dialog.component.html',
  styleUrls: ['./inventario-dialog.component.scss']
})
export class InventarioDialogComponent implements OnInit {

  inventarioModel: InventarioModel = new InventarioModel();
  productoModel : ProductoModel = new ProductoModel();
  bodegaModel : BodegaModel = new BodegaModel();
  productosArray: ProductoModel[] = [];
  bodegasArray: BodegaModel[] = [];
  fechaActual: string;

  constructor(
    private _dialogRef: MatDialogRef<InventarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventarioModel,
    private _service: InventarioService,
    private _serviceProducto: ProductoService,
    private _serviceBodega: BodegaService,
    private snackBar: MatSnackBar
  ) { }

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer las horas a 00:00:00 para comparar solo las fechas
    return d && d >= today;
  };

  async ngOnInit(): Promise<void> {
    console.log('data', this.data);
    this.inventarioModel = { ...this.data };
    await this.cargarProductos();
    await this.cargarBodegas();
  }

  cargarProductos() {
    this._serviceProducto.getAll().subscribe((res: any) => {
      this.productosArray = res;
    });
  }

  cargarBodegas() {
    this._serviceBodega.getAll().subscribe((res: any) => {
      this.bodegasArray = res;
    });
  }

  operar(){
    if(this.inventarioModel.bodega.idBodega === 0){
      this.inventarioModel.usuario = sessionStorage.getItem('username');
      this._service.postInventario(this.inventarioModel, this.inventarioModel.bodega.idBodega, this.inventarioModel.producto.idProducto).pipe(switchMap(() => {
        return this._service.getAll();
      })).subscribe((data: InventarioModel[]) => {
        console.log('data', data);
        this._service.inventarioCambio.next(data);
        this._service.mensajeCambio.next('SE REGISTRO EL INVENTARIO');
      });
      this.cerrar();
    }else{
      this.inventarioModel.usuario = sessionStorage.getItem('username');
      this._service.postInventario(this.inventarioModel, this.inventarioModel.bodega.idBodega, this.inventarioModel.producto.idProducto).pipe(switchMap(() => {
        return this._service.getAll();
      })).subscribe((data: InventarioModel[]) => {
        console.log('data', data);
        this._service.inventarioCambio.next(data);
        this._service.mensajeCambio.next('SE MODIFICO EL INVENTARIO');
      });
      this.cerrar();
    }
  }

  cerrar(){
    this._dialogRef.close();
  }

}
