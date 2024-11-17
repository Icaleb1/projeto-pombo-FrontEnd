import { Pruu } from './../model/Pruu';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PruuService {

  private readonly API = 'http://localhost:8080/api/pruus';

  constructor(private httpCliente: HttpClient) { }


  public buscarTodos(): Observable<Array<Pruu>>{
    return this.httpCliente.get<Array<Pruu>>(this.API+"/todos");
  }

  public buscarComSeletor(){

  }

  public publicarPruu(pruu: Pruu):
  Observable<any>{
    return this.httpCliente.post<any>(this.API, pruu);
  }

  public atualizarPruu(pruu: Pruu):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/atualizar", pruu);
  }

  public deletarPruuPorId(idPruu: number):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/deletar/", idPruu);
  }

  public bloquearPruuPorId(idPruu: number):
  Observable<any>{
    return this.httpCliente.put<any>(this.API + "/bloquear/", idPruu);
  }



}
