import { Denuncia } from './../../shared/model/Denuncia';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../shared/model/Usuario';
import { LoginService } from '../../shared/service/Login_service';
import { UsuarioService } from '../../shared/service/Usuario_service';
import { DenunciaService } from '../../shared/service/denuncia_service';
import { Denuncia_seletor } from '../../shared/model/seletor/denuncia_seletor';
import Swal from 'sweetalert2';
import { Pruu } from '../../shared/model/Pruu';
import { PruuService } from '../../shared/service/Pruu_service';

@Component({
  selector: 'app-relatorio',
  standalone: false,
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent implements OnInit{

  public usuarioAutenticado: Usuario;
  public idUsuarioAutenticado: string;
  public seletor: Denuncia_seletor = new Denuncia_seletor();
  public denuncias: Array<Denuncia> = new Array();
  public denuncia: Denuncia;
  public pruuDenunciado: Pruu;
  public usuarioDenunciante: Usuario;
  track: TrackByFunction<Denuncia>;
  trackDenuncia: TrackByFunction<Denuncia>;
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 3;
  public pruusMap: Map<string, Pruu> = new Map();
  public usuariosMap: Map<string, Usuario> = new Map();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private denunciaService: DenunciaService,
    private pruuService: PruuService,

  ){}

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.contarPaginas();
    this.buscarUsuarioAutenticado();
    this.pesquisar();

  }
  public telaPerfil(): void{
    this.router.navigate(['/home/usuario']);
  }
  public telaHome(): void{
    this.router.navigate(['/home']);
  }
  public gerenciarDenuncia(idDenunciaSelecionada: string): void{
    this.router.navigate(['/denuncia/gerenciar/', idDenunciaSelecionada]);
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

  private carregarDenuciantes():void{
      this.denuncias.forEach(denuncia => {
      if (denuncia.usuarioId && !this.usuariosMap.has(denuncia.usuarioId)) {

        this.usuarioService.buscarUsuarioPorId(denuncia.usuarioId).subscribe(
          usuario => {
            this.usuariosMap.set(denuncia.usuarioId, usuario);
          },
          erro => {
            console.error(`Erro ao buscar Usuario com ID ${denuncia.usuarioId}:`, erro);
          }
        );
      }
    });
  }

  public pesquisar() {
    this.denunciaService.buscarComSeletor(this.seletor).subscribe(
      resultado => {
        this.denuncias = resultado;
        this.carregarPruus();
        this.carregarDenuciantes();
      },
      erro => {
        Swal.fire('Erro ao consultar denuncias!', erro.error, 'error');
      }
    );
  }

  private carregarPruus(): void {
    this.denuncias.forEach(denuncia => {
      if (denuncia.pruuId && !this.pruusMap.has(denuncia.pruuId)) {
        // Evita duplicar chamadas para o mesmo ID
        this.pruuService.buscarPruuPorId(denuncia.pruuId).subscribe(
          pruu => {
            this.pruusMap.set(denuncia.pruuId, pruu);
          },
          erro => {
            console.error(`Erro ao buscar Pruu com ID ${denuncia.pruuId}:`, erro);
          }
        );
      }
    });
  }

  criarArrayPaginas(): any[] {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  irParaPagina(indicePagina: number) {
    this.seletor.pagina = indicePagina;
    this.pesquisar();
  }

  public contarPaginas() {
    this.denunciaService.contarPaginas(this.seletor).subscribe(
      resultado => {
        this.totalPaginas = resultado;
      },
      erro => {
        Swal.fire('Erro ao consultar total de paginas', erro.error, 'error');
      }
    );
  }

  atualizarPaginacao() {
    this.contarPaginas();
    this.pesquisar();
  }


  public limpar(){
    this.seletor = new Denuncia_seletor();
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
  }

  avancarPagina() {
    this.seletor.pagina++;
    this.pesquisar();
  }

  voltarPagina() {
    this.seletor.pagina--;
    this.pesquisar();
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

}
