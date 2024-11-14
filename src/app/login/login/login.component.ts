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

  public dto: UsuarioDTO = new UsuarioDTO();

  constructor(
              private router: Router,
              private LoginService: LoginService
            ){

  }

  public realizarLogin(){
    this.LoginService.autenticar(this.dto).subscribe({
      next: jwt => {
        Swal.fire('Sucesso', 'Usuário autenticado com sucesso', 'success');
        let token: string = jwt.body + "";
        localStorage.setItem('tokenUsuarioAutenticado', token);
        this.router.navigate(['']);
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

  public cadastro(){
    this.router.navigate(['/cadastro/']);
  }
}
