import { Usuario } from './../../shared/model/Usuario';
import { dirname } from 'node:path';
import { UsuarioDTO } from './../../shared/model/dto/Usuario_dto';
import { LoginService } from './../../shared/service/Login_service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public usuario: Usuario = new Usuario();
  public idUsuario: number;

  public dto: UsuarioDTO = new UsuarioDTO();

  constructor(
              private service: LoginService,
              private router: Router,
            ){}

  public realizarLogin(){
    this.service.autenticar(this.dto).subscribe({
      next: jwt => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        let token: string = jwt.body + "";
        localStorage.setItem('tokenUsuarioAutenticado', token);
        this.router.navigate(['/home']);
      },
      error: erro =>{
        var mensagem: string;
        if(erro.status == 401){
          mensagem = 'Usuário ou senha inválidos, tente novamente';
        }else{
          mensagem = erro.error;
        }

        Swal.fire('Erro', mensagem, 'error');
      }
    });
  }
  voltar() {
    this.router.navigate(['']);
  }
}
