import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PruCadastroComponent } from './pru-cadastro/pru-cadastro.component';
import { PerfilUsuarioComponent } from '../usuario/perfil-usuario/perfil-usuario.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'pru', component: PruCadastroComponent
  },
  {
    path: 'usuario', component: PerfilUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
