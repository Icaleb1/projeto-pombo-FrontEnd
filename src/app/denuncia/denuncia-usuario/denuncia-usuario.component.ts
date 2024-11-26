import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../shared/service/Login_service';
import { UsuarioService } from '../../shared/service/Usuario_service';
import { DenunciaService } from '../../shared/service/denuncia_service';
import { PruuService } from '../../shared/service/Pruu_service';
import { Usuario } from '../../shared/model/Usuario';
import { Denuncia } from '../../shared/model/Denuncia';
import { Pruu } from '../../shared/model/Pruu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-denuncia-usuario',
  templateUrl: './denuncia-usuario.component.html',
  styleUrl: './denuncia-usuario.component.scss'
})
export class DenunciaUsuarioComponent {
  public usuarioAutenticado: Usuario;
  public idUsuarioAutenticado: string;
  public idDenuncia: string;
  public denuncia: Denuncia;
  public pruuDenunciado: Pruu;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private denunciaService: DenunciaService,
    private pruuService: PruuService,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idDenuncia = params['id'];
      if(this.idDenuncia) {
        this.buscarDenuncia();
      }
    });

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

  private buscarPruuDenunciado(idPruu: string): void {
    this.pruuService.buscarPruuPorId(idPruu).subscribe(
      (pruu) => {
        this.pruuDenunciado = pruu; 
      },
      (erro) => {
        console.error('Erro ao buscar Pruu denunciado:', erro);
      }
    );
  }

  buscarDenuncia(): void {
    this.denunciaService.buscarDenunciaPorId(this.idDenuncia).subscribe(
      (denuncia) => {
        this.denuncia = denuncia;
        if(denuncia.pruuId){
          this.buscarPruuDenunciado(denuncia.pruuId);
        }
      },
      (erro) => {
        Swal.fire('Erro ao buscar a denuncia!', erro, 'error');
      }
    );
  }
  exibirImagemGrande(imagemBase64: string) {
    console.log("123");
    Swal.fire({
      title: 'Imagem do Pruu',
      html: `<img src="data:image/jpg;base64,${imagemBase64}" alt="Imagem do Pruu" style="max-width: 100%; height: auto;">`,
      width: '80%',
      showCloseButton: true,
      showConfirmButton: false,
      background: '#fff',
      padding: '20px'
    });
  }

  bloquearPruu(): void {
    if (!this.pruuDenunciado || !this.pruuDenunciado.uuid) {
      console.error('Pruu denunciado ou UUID não encontrado.');
      return;
    }
    console.log('Bloqueando Pruu com UUID:', this.pruuDenunciado.uuid);
    this.pruuService.bloquearPruuPorId(this.pruuDenunciado.uuid).subscribe(
      () => {
        console.log('Pruu bloqueado com sucesso.');
        this.buscarDenuncia(); // Atualiza após o bloqueio
      },
      (erro) => {
        console.error('Erro ao bloquear Pruu:', erro);
      }
    );
  }
}
