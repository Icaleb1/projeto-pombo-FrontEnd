import { LoginService } from './../../shared/service/Login_service';
import { UsuarioService } from './../../shared/service/Usuario_service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumPerfil } from '../../shared/model/enum/EnumPerfil';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent implements OnInit{

  public isAdmin: boolean;
  public idUsuarioAutenticado: string;
  public usuarioAutenticado: Usuario;
  public selectedFile: File | null = null;
  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute

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
          if(this.usuarioAutenticado.perfil==EnumPerfil.ADMINISTRADOR){
            this.isAdmin = false;
          } else {
            this.isAdmin = true;
          }
        },
        (erro) => {
          console.error('Erro ao carregar perfil!', erro);
        }
      );
    } else {
      console.error('Usuário não autenticado ou token inválido.');
    }
  }
  public desconectar(): void{
    this.loginService.sair();
    this.router.navigate(['']);
  }
  public telaHome(): void{
    this.router.navigate(['/home']);
  }
  public telaRelatorio(): void{
    this.router.navigate(['/denuncia/relatorio']);
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.selectedFile = null;
      this.imagePreview = null;
    }
  }
  
}