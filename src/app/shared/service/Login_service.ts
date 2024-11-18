import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsuarioDTO } from "../model/dto/Usuario_dto";
import { Observable } from "rxjs";
import { Usuario } from "../model/Usuario";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API = 'http://localhost:8080/auth';

  constructor(private httpCliente: HttpClient) { }

  autenticar(dto: UsuarioDTO): Observable<HttpResponse<string>> {
    const authHeader = 'Basic ' + btoa(`${dto.login}:${dto.senha}`);
    const headers = new HttpHeaders({
      'authorization': authHeader
    });

    return this.httpCliente.post<string>(`${this.API}/authenticate`, dto, {
      headers,
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  cadastrar(usuario: Usuario): Observable<any>{
    return this.httpCliente.post<any>(this.API+"/novo-usuario", usuario);

  }

  sair() {
    localStorage.removeItem('tokenUsuarioAutenticado');
  }
}


