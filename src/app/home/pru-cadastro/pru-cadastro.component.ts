import { Route, Router } from '@angular/router';
import { routes } from './../../app.routes';
import { PruuService } from './../../shared/service/Pruu_service';
import { Component } from '@angular/core';
import { Pruu } from '../../shared/model/Pruu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pru-cadastro',
  templateUrl: './pru-cadastro.component.html',
  styleUrl: './pru-cadastro.component.scss'
})
export class PruCadastroComponent {

  public pruu: Pruu = new Pruu();
  public selectedFile: File | null = null;


  constructor(
    private pruuService: PruuService,
    private router: Router

  ){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) { // Limite de 10MB
      this.selectedFile = file;
    } else {
      alert('Tamanho de arquivo não permitido! Máximo: 10MB.');
      this.selectedFile = null;
    }
  }

  inserir(): void {
    this.pruuService.publicarPruu(this.pruu).subscribe(
      (resposta) => {
        Swal.fire('Pru salvo com sucesso!', '', 'success');
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar o pruu: ' + erro.error, 'error');
      }
    );
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

}
