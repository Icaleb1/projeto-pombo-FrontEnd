import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../model/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //URL BackEnd Local
  //private readonly API = 'http://localhost:8080/api/usuarios';

  //URL BackEnd Remoto
  private readonly API = 'https://projeto-pombo-backend.onrender.com/api/usuarios';

  constructor(private httpCliente: HttpClient) {}

  curtir(idPruu: string): Observable<any> {
    return this.httpCliente.post<any>(`${this.API}/like/${idPruu}`, {} );
  }

  buscarUsuarioPorId(idUsuario: string): Observable<Usuario>{
    return this.httpCliente.get<Usuario>(`${this.API}/${idUsuario}`);
  }



}
