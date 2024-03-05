import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoModel } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productoModel: ProductoModel[] = [];
  displayedColumns: string[] = ['idProducto', 'codigo', 'nombre', 'categoria', 'medida', 'stock', 'disponible', 'acciones'];
  dataSource: MatTableDataSource<ProductoModel> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _service: ProductoService, private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    await this.getProductoCambio();
    await this.getMensajeCambio();
    await this.getProducto();
  }

  getMensajeCambio() {
    this._service.mensajeCambio.subscribe((data: string) => {
      this._snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  }

  getProductoCambio() {
    this._service.productoCambio.subscribe((data: ProductoModel[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getProducto() {
    this._service.getAll().subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  abrirDialogo(producto: ProductoModel = new ProductoModel()) {
    console.log(producto);
    this.dialog.open(ProductoDialogComponent, {
      data: producto,
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

  eliminar(idProducto: number) {
    this._service.delete(idProducto).subscribe(() => {
      this._service.getAll().subscribe((data: any) => {
        this._service.productoCambio.next(data);
        this._service.mensajeCambio.next('El producto se ha eliminado');
      });
    }, err => {
      console.log(err);
    });
  }

}
