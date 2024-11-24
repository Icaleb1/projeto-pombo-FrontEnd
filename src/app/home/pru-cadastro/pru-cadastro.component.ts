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
  public imagePreview: string | ArrayBuffer | null = null;


  constructor(
    private pruuService: PruuService,
    private router: Router,

  ){}

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

  inserir(): void {
    this.pruuService.publicarPruu(this.pruu).subscribe(
      (resposta) => {
        Swal.fire('Pruu salvo com sucesso!', '', 'success');
        if (this.selectedFile){
          this.uploadImagem(resposta.uuid);
        }else{
          this.voltar();
        }
        this.voltar();
      },
      (erro) => {
        Swal.fire('Erro ao salvar o pruu: ' + erro.error, 'error');
      }
    );
  }

  uploadImagem(pruuId: string): void {
    const formData = new FormData();
    formData.append('imagem', this.selectedFile!, this.selectedFile!.name);

    this.pruuService.uploadImagem(pruuId, formData).subscribe({
      next: () => {
        Swal.fire('Imagem carregada com sucesso!', '', 'success');
        this.voltar();
      },
      error: (erro) => {
        Swal.fire('Erro ao fazer upload da imagem: ' + erro.error, 'error');
      }
    });
  }
  public telaHome(): void{
    this.router.navigate(['/home']);
  }
  public telaPerfil(): void{
    this.router.navigate(['/home/usuario']);
  }
  voltar(): void {
    this.router.navigate(['/home']);
  }

}
