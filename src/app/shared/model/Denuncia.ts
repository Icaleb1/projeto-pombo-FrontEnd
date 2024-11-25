import { EnumDenuncia } from "./enum/EnumDenuncia";

export class Denuncia{
  uuid: string;
  motivo: string;
  dataHoraDenuncia: Date;
  pruuId: string;
  usuarioId: string;
  situacao: EnumDenuncia;
}
