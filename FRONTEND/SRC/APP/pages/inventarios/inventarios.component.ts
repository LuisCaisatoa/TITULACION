import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioModel } from 'src/app/models/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { InventarioDialogComponent } from './inventario-dialog/inventario-dialog.component';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss']
})
export class InventariosComponent implements OnInit {

  inventarioModel: InventarioModel[] = [];
  displayedColumns: string[] = ['fechaDesde', 'fechaHasta', 'Producto', 'Bodega', 'stock', 'stockMinimo', 'usuario', 'asignado', 'observacion', 'acciones'];
  dataSource: MatTableDataSource<InventarioModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: InventarioService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit():void {
     this.getInventarioCambio();
     this.getMensajeCambio();
     this.getInventario();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getInventarioCambio() {
    this._service.inventarioCambio.subscribe((data: InventarioModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  generarPDF(idBodega: number, idProducto: number) {
    this._service.getPdf(idBodega, idProducto)
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        error => {
          console.error('Error al obtener el PDF', error);
          // Maneja el error según tus necesidades
        }
      );
  }

  getInventario() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(inventario: InventarioModel = new InventarioModel()) {
    console.log(inventario);
    this.dialog.open(InventarioDialogComponent, {
      data: inventario,
      disableClose: false,
      width: '600px'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // eliminar(idProducto: number) {
  //   this._service.delete(idProducto).subscribe(() => {
  //     this._service.getAll().subscribe((data: any) => {
  //       this._service.productoCambio.next(data);
  //       this._service.mensajeCambio.next('El producto se ha eliminado');
  //     });
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
