import { Pruu_seletor } from './../../shared/model/seletor/pruu_seletor';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Usuario } from '../../shared/model/Usuario';
import { Pruu } from '../../shared/model/Pruu';
import { PruuService } from '../../shared/service/Pruu_service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{

  public usuarioAutenticado: Usuario;
  public pruus: Array<Pruu> = new Array();
  track: TrackByFunction<Pruu>;
  trackPruu: TrackByFunction<Pruu>;
  public totalPaginas: number = 0;
  public readonly TAMANHO_PAGINA: number = 3;
  public seletor: Pruu_seletor = new Pruu_seletor();

  constructor(
    private pruuService: PruuService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.seletor.limite = this.TAMANHO_PAGINA;
    this.seletor.pagina = 1;
    this.pesquisar();
    this.contarPaginas();


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
