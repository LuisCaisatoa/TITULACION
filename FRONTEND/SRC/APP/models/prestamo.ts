import { AsignadoModel } from "./asignado";
import { ProductoModel } from "./producto";

export class PrestamoModel{
  idPrestamo: number;
  cantidad: number;
  fechaDesde: Date;
  fechaHasta: Date;
  asignado: AsignadoModel = new AsignadoModel();
  producto: ProductoModel = new ProductoModel();
  estado: string;
  observacion: string;
}
