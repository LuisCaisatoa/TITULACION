import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MedidaModel } from 'src/app/models/medida';
import { MedidaService } from 'src/app/services/medida.service';
import { MedidaDialogComponent } from './medida-dialog/medida-dialog.component';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.scss']
})
export class MedidasComponent implements OnInit {

  medidaModel: MedidaModel[] = [];
  displayedColumns: string[] = ['idMedida', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<MedidaModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: MedidaService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getMedidaCambio();
    await this.getMensajeCambio();
    await this.getMedidas();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getMedidaCambio() {
    this._service.medidaCambio.subscribe((data: MedidaModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getMedidas() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(medida?: MedidaModel) {
    console.log(medida);
    this.dialog.open(MedidaDialogComponent, {
      data: medida,
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

  eliminar(idMedida: number) {
    this._service.delete(idMedida).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.medidaCambio.next(data);
        this._service.mensajeCambio.next('La medida se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }
}
