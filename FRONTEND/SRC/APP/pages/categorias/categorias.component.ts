import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaModel } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categoriaModel: CategoriaModel[] = [];
  displayedColumns: string[] = ['idCategoria', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<CategoriaModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: CategoriaService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void{
    this.getCategoriaCambio();
    this.getMensajeCambio();
    this.getCategorias();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getCategoriaCambio() {
    this._service.categoriaCambio.subscribe((data: CategoriaModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getCategorias() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(categoria?: CategoriaModel) {
    console.log(categoria);
    this.dialog.open(CategoriaDialogComponent, {
      data: categoria,
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

  eliminar(idCategoria: number) {
    this._service.delete(idCategoria).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.categoriaCambio.next(data);
        this._service.mensajeCambio.next('La categoria se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }
}
