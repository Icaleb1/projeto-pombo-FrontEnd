import { Component } from '@angular/core';
import { UsuarioService } from '../../shared/service/Usuario_service';
import { LoginService } from '../../shared/service/Login_service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../shared/model/Usuario';

@Component({
  selector: 'app-perfil-adm',
  templateUrl: './perfil-adm.component.html',
  styleUrl: './perfil-adm.component.scss'
})
export class PerfilAdmComponent {

  constructor(
    public usuarioAutenticado: Usuario,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute

  ){}
  public desconectar(): void{
    this.loginService.sair();
    this.router.navigate(['']);
  }
  public telaHome(): void{
    this.router.navigate(['/home']);
  }
}
