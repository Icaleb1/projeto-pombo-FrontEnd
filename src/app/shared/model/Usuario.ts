import { EnumPerfil } from "./enum/EnumPerfil";
import { Pruu } from "./Pruu";

export class Usuario{
  uuid: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  perfil: EnumPerfil;
  imagemUsuarioEmBase64: string;
  ativo: boolean;
  pruusCriados: Array<Pruu>;
  pruusCurtidos: Array<Pruu>;
}
