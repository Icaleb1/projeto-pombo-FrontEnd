import { Pruu } from './../model/Pruu';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pruu_seletor } from '../model/seletor/pruu_seletor';

@Injectable({
  providedIn: 'root'
})
export class PruuService {

  private readonly API = 'http://localhost:8080/api/pruus';

  constructor(private httpCliente: HttpClient) { }

  uploadImagem(pruuId: string, formData: FormData): Observable<any> {
    return this.httpCliente.post(`${this.API}/${pruuId}/upload`, formData);
  }

  public buscarTodos(): Observable<Array<Pruu>>{
    return this.httpCliente.get<Array<Pruu>>(this.API);
  }

  public buscarComSeletor(seletor: Pruu_seletor): Observable<Array<Pruu>>{
    return this.httpCliente.post<Array<Pruu>>(this.API + '/filtro', seletor);

  }

  contarPaginas(seletor: Pruu_seletor): Observable<number> {
    return this.httpCliente.post<number>(this.API + '/total-paginas', seletor);
  }

  public publicarPruu(pruu: Pruu):
  Observable<any>{
    return this.httpCliente.post<any>(this.API, pruu);
  }

  public atualizarPruu(pruu: Pruu):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/atualizar", pruu);
  }

  public deletarPruuPorId(idPruu: string):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/deletar/", idPruu);
  }

  public bloquearPruuPorId(idPruu: string):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/bloquear/", idPruu);
  }

  public buscarPruuPorId(idPruu: string): Observable<Pruu> {
    return this.httpCliente.get<Pruu>(`${this.API}/${idPruu}`);
  }




}
