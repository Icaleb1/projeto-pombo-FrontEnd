import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { PruCadastroComponent } from '../home/pru-cadastro/pru-cadastro.component';
import { PerfilUsuarioComponent } from '../usuario/perfil-usuario/perfil-usuario.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import path from 'path';
import { GerenciarDenunciasComponent } from './gerenciar-denuncias/gerenciar-denuncias.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'pru', component: PruCadastroComponent
  },
  {
    path: 'usuario', component: PerfilUsuarioComponent
  },
  {
    path: 'relatorio', component: RelatorioComponent
  },
  {
    path: 'gerenciar', component: GerenciarDenunciasComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciaRoutingModule {}
