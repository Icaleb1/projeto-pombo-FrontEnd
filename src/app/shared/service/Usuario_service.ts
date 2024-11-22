import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/api/usuarios';

  constructor(private httpCliente: HttpClient) {}

  curtir(idPruu: string): Observable<any> {
    return this.httpCliente.post<any>(`${this.API}/like/${idPruu}`, {} );
  }



}
