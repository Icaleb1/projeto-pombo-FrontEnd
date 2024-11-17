import { Usuario } from "./Usuario";

export class Pruu{
  uuid: string;
  texto: string;
  dataHoraCriacao: Date;
  bloqueado: boolean;
  quantLikes: number;
  idSessao: string;
  imagemBase64: string;
  usuario: Usuario;
  usuariosQueCurtiram: Array<Usuario>;
  ativo: boolean;

}
