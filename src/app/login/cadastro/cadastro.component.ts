import { Usuario } from './../../shared/model/Usuario';
import { dirname } from 'node:path';
import { UsuarioDTO } from './../../shared/model/dto/Usuario_dto';
import { LoginService } from './../../shared/service/Login_service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  public usuario: Usuario = new Usuario();
  public idUsuario: number;

  constructor(
    private service: LoginService,
    private router: Router,
  ){}

  public cadastrar(){
    this.service.cadastrar(this.usuario).subscribe(
      (resposta) => {
        Swal.fire('Usuario cadastrado com sucesso!', '', 'success'); this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao cadastrar-se!', erro, 'error');
      }
    );
  }
  voltar() {
    this.router.navigate(['']);
  }

}
