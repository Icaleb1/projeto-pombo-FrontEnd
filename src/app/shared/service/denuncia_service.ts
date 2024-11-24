import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Denuncia } from "../model/Denuncia";

@Injectable({
  providedIn: 'root'
})
export class DenunciaService {

  //URL BackEnd Local
  //private readonly API = 'http://localhost:8080/api/denuncias';

  //URL BackEnd Remoto
  private readonly API = 'https://projeto-pombo-backend.onrender.com/api/denuncias';


  constructor(private httpCliente: HttpClient) {}

  denunciar(denuncia: Denuncia, idPruu: string): Observable<any> {
    return this.httpCliente.post<any>(`${this.API}/${idPruu}`,denuncia);
  }



}
