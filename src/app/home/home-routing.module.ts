import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PruCadastroComponent } from './pru-cadastro/pru-cadastro.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'pru', component: PruCadastroComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
