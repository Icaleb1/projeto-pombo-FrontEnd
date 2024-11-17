import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import path from 'path';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from '../home/home/home.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: "cadastro", component: CadastroComponent
  },
  {
    path: 'home', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
