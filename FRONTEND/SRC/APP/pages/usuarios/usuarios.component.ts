import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioModel } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarioModel: UsuarioModel[] = [];
  displayedColumns: string[] = ['id', 'username', 'rol', 'acciones'];
  dataSource: MatTableDataSource<UsuarioModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: UsuarioService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getMedidaCambio();
    await this.getMensajeCambio();
    await this.getUsuarios();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getMedidaCambio() {
    this._service.usuarioCambio.subscribe((data: UsuarioModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getUsuarios() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(usuario?: UsuarioModel) {
    console.log(usuario);
    this.dialog.open(UsuarioDialogComponent, {
      data: usuario,
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

  eliminar(id: number) {
    this._service.delete(id).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.usuarioCambio.next(data);
        this._service.mensajeCambio.next('El usuario se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
}
}
