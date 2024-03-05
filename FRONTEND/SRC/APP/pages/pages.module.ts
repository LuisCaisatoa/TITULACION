import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { MedidasComponent } from './medidas/medidas.component';
import { BodegasComponent } from './bodegas/bodegas.component';
import { AddEditMedidaComponent } from './medidas/add-edit-medida/add-edit-medida.component';
import { BodegaDialogComponent } from './bodegas/bodega-dialog/bodega-dialog.component';
import { MedidaDialogComponent } from './medidas/medida-dialog/medida-dialog.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaDialogComponent } from './categorias/categoria-dialog/categoria-dialog.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDialogComponent } from './productos/producto-dialog/producto-dialog.component';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { PagesRoutingModule } from './pages.routing';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { InventariosComponent } from './inventarios/inventarios.component';
import { InventarioDialogComponent } from './inventarios/inventario-dialog/inventario-dialog.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDialogComponent } from './usuarios/usuario-dialog/usuario-dialog.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatNativeDateModule } from '@angular/material/core';
import { AsignadosComponent } from './asignados/asignados.component';
import { AsignadosDialogComponent } from './asignados/asignados-dialog/asignados-dialog.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { PrestamosDialogComponent } from './prestamos/prestamos-dialog/prestamos-dialog.component';

@NgModule({
  declarations: [
    MedidasComponent,
    BodegasComponent,
    AddEditMedidaComponent,
    BodegaDialogComponent,
    MedidaDialogComponent,
    CategoriasComponent,
    CategoriaDialogComponent,
    ProductosComponent,
    ProductoDialogComponent,
    InicioComponent,
    LayoutComponent,
    LoginModalComponent,
    InventariosComponent,
    InventarioDialogComponent,
    UsuariosComponent,
    UsuarioDialogComponent,
    AsignadosComponent,
    AsignadosDialogComponent,
    PrestamosComponent,
    PrestamosDialogComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
    NgxChartsModule,
    MatNativeDateModule,
  ],
})
export class PagesModule { }
