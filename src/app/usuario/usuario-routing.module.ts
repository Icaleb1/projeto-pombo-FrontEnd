import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RelatorioComponent } from '../denuncia/relatorio/relatorio.component';


const routes: Routes = [
  {
    path: 'perfil', component: PerfilUsuarioComponent
  },
  {
    path: 'relatorio', component: RelatorioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
