import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BodegaModel } from 'src/app/models/bodega';
import { BodegaService } from 'src/app/services/bodega.service';
import { BodegaDialogComponent } from './bodega-dialog/bodega-dialog.component';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss']
})
export class BodegasComponent implements OnInit {

  bodegasModel: BodegaModel[] = [];
  displayedColumns: string[] = ['idBodega', 'nombre', 'ubicacion', 'acciones'];
  dataSource: MatTableDataSource<BodegaModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: BodegaService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getBodegaCambio();
    await this.getMensajeCambio();
    await this.getBodegas();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getBodegaCambio() {
    this._service.bodegaCambio.subscribe((data: BodegaModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getBodegas() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(bodega?: BodegaModel) {
    console.log(bodega);
    this.dialog.open(BodegaDialogComponent, {
      data: bodega,
      disableClose: false,
      width: '400px'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminar(idBodega: number) {
    this._service.delete(idBodega).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.bodegaCambio.next(data);
        this._service.mensajeCambio.next('La bodega se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }

}
