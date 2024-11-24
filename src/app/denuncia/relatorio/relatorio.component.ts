import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../shared/model/Usuario';
import { LoginService } from '../../shared/service/Login_service';
import { UsuarioService } from '../../shared/service/Usuario_service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent implements OnInit{

  public usuarioAutenticado: Usuario;
  public idUsuarioAutenticado: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    
  ){}

  ngOnInit(): void {
    
    this.buscarUsuarioAutenticado();



  }
  public telaPerfil(): void{
    this.router.navigate(['/home/usuario']);
  }
  public telaHome(): void{
    this.router.navigate(['/home']);
  }
  public gerenciarDecunia(): void{
    this.router.navigate(['/denuncia/gerenciar']);
  }

  private buscarUsuarioAutenticado(): void {

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
