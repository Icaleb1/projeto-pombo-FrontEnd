import { Usuario } from "./Usuario";

export class Pruu{
  uuid: string;
  texto: string;
  dataHoraCriacao: Date;
  bloqueado: boolean;
  quantLikes: number;
  imagemPruuEmBase64: string;
  usuario: Usuario;
  usuariosQueCurtiram: Usuario[];
  ativo: boolean;

}
