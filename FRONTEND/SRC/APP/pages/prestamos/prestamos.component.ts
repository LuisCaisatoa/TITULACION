import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrestamoModel } from 'src/app/models/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { PrestamosDialogComponent } from './prestamos-dialog/prestamos-dialog.component';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {


  prestamoModel: PrestamoModel[] = [];
  displayedColumns: string[] = ['Asignado', 'Producto', 'Cantidad', 'Fecha Desde', 'Fecha Hasta', 'Estado', 'acciones'];
  dataSource: MatTableDataSource<PrestamoModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: PrestamoService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit():void {
     this.getPrestamoCambio();
     this.getMensajeCambio();
     this.getPrestamo();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getPrestamoCambio() {
    this._service.prestamoCambio.subscribe((data: PrestamoModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  generarPDF(idAsignado: number, idProducto: number) {
    this._service.getPdf(idAsignado, idProducto)
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'application/json' });
          console.log('Tamaño del Blob:', blob.size);
          // Descargar el PDF en lugar de abrirlo en una nueva pestaña
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'acta_entrega_recepcion.pdf';
          link.click();

          // Liberar la URL del Blob
          window.URL.revokeObjectURL(link.href);
        },
        error => {
          console.error('Error al obtener el PDF', error);
          // Maneja el error según tus necesidades
        }
      );
  }


  getPrestamo() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(prestamo: PrestamoModel = new PrestamoModel()) {
    console.log(prestamo);
    this.dialog.open(PrestamosDialogComponent, {
      data: prestamo,
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

  eliminar(idPrestamo: number) {
    this._service.delete(idPrestamo).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.prestamoCambio.next(data);
        this._service.mensajeCambio.next('El prestamo se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }

}
