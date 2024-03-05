import { CategoriaModel } from "./categoria";
import { MedidaModel } from "./medida";

export class ProductoModel{
  idProducto: number;
  codigo: string;
  nombre: string;
  categoria: CategoriaModel = new CategoriaModel();
  medida: MedidaModel = new MedidaModel();
  stock: number;
  disponible: boolean = true;
}
