import { RolModel } from "./rol";

export class UsuarioModel{
  id: number;
  password: string;
  username: string;
  roles: RolModel[]=[];
}
