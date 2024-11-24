import { LoginService } from './../../shared/service/Login_service';
import { UsuarioService } from './../../shared/service/Usuario_service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/Usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent implements OnInit{

  public idUsuarioAutenticado: string;
  public usuarioAutenticado: Usuario;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,

  ){}

  ngOnInit(): void {
    this.carregarPerfil();
  }

  private carregarPerfil(): void {

    this.idUsuarioAutenticado = this.loginService.buscarIdUsuarioComToken();

    if (this.idUsuarioAutenticado) {

      this.usuarioService.buscarUsuarioPorId(this.idUsuarioAutenticado).subscribe(
        (resultado) => {
          this.usuarioAutenticado = resultado;
        },
        (erro) => {
          console.error('Erro ao carregar perfil!', erro);
        }
      );
    } else {
      console.error('Usuário não autenticado ou token inválido.');
    }
  }



}





