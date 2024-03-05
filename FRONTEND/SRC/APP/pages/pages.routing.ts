import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MedidasComponent } from "./medidas/medidas.component";
import { AddEditMedidaComponent } from "./medidas/add-edit-medida/add-edit-medida.component";
import { BodegasComponent } from "./bodegas/bodegas.component";
import { CategoriasComponent } from "./categorias/categorias.component";
import { ProductosComponent } from "./productos/productos.component";
import { InicioComponent } from "./inicio/inicio.component";
import { GuardService } from "../services/guard.service";
import { InventariosComponent } from "./inventarios/inventarios.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { AsignadosComponent } from "./asignados/asignados.component";
import { PrestamosComponent } from "./prestamos/prestamos.component";


const routes: Routes = [
  {path: 'inicio', component: InicioComponent, canActivate: [GuardService]},
  {path: 'pertrechos', component: MedidasComponent, children:[
    {path: 'agregar', component: AddEditMedidaComponent},
    {path: 'editar/:id', component: AddEditMedidaComponent}
  ]},
  {path: 'bodegas', component: BodegasComponent, canActivate: [GuardService]},
  {path: 'categorias', component: CategoriasComponent, canActivate: [GuardService]},
  {path: 'productos', component: ProductosComponent, canActivate: [GuardService]},
  {path: 'prestamos', component: PrestamosComponent, canActivate: [GuardService]},
  {path: 'usuarios', component: UsuariosComponent, canActivate: [GuardService]},
  {path: 'asignados', component: AsignadosComponent, canActivate: [GuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
