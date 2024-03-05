import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AsignadoModel } from 'src/app/models/asignado';
import { AsignadoService } from 'src/app/services/asignado.service';
import { AsignadosDialogComponent } from './asignados-dialog/asignados-dialog.component';

@Component({
  selector: 'app-asignados',
  templateUrl: './asignados.component.html',
  styleUrls: ['./asignados.component.scss']
})
export class AsignadosComponent implements OnInit {

  asignadosModel: AsignadoModel[] = [];
  displayedColumns: string[] = ['idAsignado', 'cedula', 'nombres', 'apellidos', 'telefono', 'cargo', 'acciones'];
  dataSource: MatTableDataSource<AsignadoModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: AsignadoService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getAsignadoCambio();
    await this.getMensajeCambio();
    await this.getAsignados();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getAsignadoCambio() {
    this._service.asignadoCambio.subscribe((data: AsignadoModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getAsignados() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(asignado?: AsignadoModel) {
    console.log(asignado);
    this.dialog.open(AsignadosDialogComponent, {
      data: asignado,
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

  eliminar(idAsignado: number) {
    this._service.delete(idAsignado).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.asignadoCambio.next(data);
        this._service.mensajeCambio.next('El asignado se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }


}
