import { BodegaModel } from "./bodega";
import { ProductoModel } from "./producto";

export class InventarioModel{
  producto: ProductoModel = new ProductoModel();
  bodega: BodegaModel = new BodegaModel();
  stock: number;
  stockMinimo: number;
  tipoInventario: string;
  personaAsignada: string;
  usuario: string;
  estado: string;
  fechaDesde: Date;
  fechaHasta: Date;
  observacion: string;
}
