import { RolModel } from "./rol";

export class MenuModel{
  idMenu : number;
  icono: string;
  nombre: string;
  url: string;
  roles: RolModel [] = [];
}
