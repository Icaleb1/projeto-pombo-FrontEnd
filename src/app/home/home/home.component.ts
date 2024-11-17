import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Usuario } from '../../shared/model/Usuario';
import { Pruu } from '../../shared/model/Pruu';
import { PruuService } from '../../shared/service/Pruu_service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private pruuService: PruuService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.buscarTodosPruus();

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
}
