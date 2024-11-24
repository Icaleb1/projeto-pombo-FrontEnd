import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Denuncia } from "../model/Denuncia";

@Injectable({
  providedIn: 'root'
})
export class PruuService {

  private readonly API = 'https://projeto-pombo-backend.onrender.com/api/denuncias';

  constructor(private httpCliente: HttpClient) {}

  denunciar(denuncia: Denuncia): Observable<any> {
    return this.httpCliente.post<any>(this.API, denuncia);
  }



}
