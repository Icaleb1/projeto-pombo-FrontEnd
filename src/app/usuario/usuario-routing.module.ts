import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilAdmComponent } from './perfil-adm/perfil-adm.component';

const routes: Routes = [
  {
    path: 'perfil', component: PerfilUsuarioComponent
  },
  {
    path: 'adm', component: PerfilAdmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
