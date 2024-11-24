import { Denuncia } from './../../shared/model/Denuncia';
import { Pruu_seletor } from './../../shared/model/seletor/pruu_seletor';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Usuario } from '../../shared/model/Usuario';
import { Pruu } from '../../shared/model/Pruu';
import { PruuService } from '../../shared/service/Pruu_service';
import { UsuarioService } from '../../shared/service/Usuario_service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../shared/service/Login_service';
import { DenunciaService } from '../../shared/service/denuncia_service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{
  public denuncia: Denuncia;
  public idUsuarioAutenticado: string;
  public usuarioAutenticado: Usuario;
  public pruus: Array<Pruu> = new Array();
  public pruu: Pruu;
  track: TrackByFunction<Pruu>;
  trackPruu: TrackByFunction<Pruu>;
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 3;
  public seletor: Pruu_seletor = new Pruu_seletor();

  constructor(
    private pruuService: PruuService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private denunciaService: DenunciaService

  ){}

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.pesquisar();
    this.contarPaginas();
    this.buscarUsuarioAutenticado();



  }

  public pesquisar() {
    this.pruuService.buscarComSeletor(this.seletor).subscribe(
      resultado => {
        this.pruus = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar pruus!', erro.error, 'error');
      }
    );
  }

  public denunciar(){
    this.denunciaService.denunciar(this.denuncia, this.pruu.uuid).subscribe(
      (resposta) => {
        Swal.fire('Pruu denunciado!', '', 'success');
      },
      (erro) => {
        Swal.fire('Erro ao salvar o pruu: ' + erro.error, 'error');
      }
    );
  }




  public contarPaginas() {
    this.pruuService.contarPaginas(this.seletor).subscribe(
      resultado => {
        this.totalPaginas = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar total de paginas', erro.error, 'error');
      }
    );
  }

  public limpar(){
    this.seletor = new Pruu_seletor();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.pesquisar();
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.pesquisar();
  }

  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.pesquisar();
  }

  private buscarTodosPruus(){
    this.pruuService.buscarTodos().subscribe(
      resultado => {
        this.pruus = resultado;
      },
      erro => {
        console.error('Erro ao buscar pruus! ', erro);
      }
    );
  }

  public cadastro(){
    this.router.navigate(["/home/pru"])
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

 // darLike(pruuId: string): void {
 //   this.usuarioService.curtir(pruuId).subscribe({
 //     next: (resposta) => {
 //       Swal.fire('Pruu curtido!', '', 'success');
 //     },
 //     error: (erro) => {
 //       Swal.fire('Erro ao curtir: ' + erro.error, '', 'error');
 //     },
 //   });
 // }

 darLike(pruu: Pruu): void {
  this.usuarioService.curtir(pruu.uuid).subscribe(() => {
    this.recarregarPruu(pruu);
  });
}

recarregarPruu(pruu: Pruu): void {
  this.pruuService.buscarPruuPorId(pruu.uuid).subscribe((pruuAtualizado) => {
    pruu.usuariosQueCurtiram = pruuAtualizado.usuariosQueCurtiram;
    pruu.quantLikes = pruuAtualizado.usuariosQueCurtiram?.length || 0;

    const index = this.pruus.findIndex((p) => p.uuid === pruu.uuid);
    if (index !== -1) {
      this.pruus[index] = { ...this.pruus[index], ...pruuAtualizado };
    }
  });
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
