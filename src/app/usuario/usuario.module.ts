import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { requestAngular17Interceptor } from '../auth/request-angular17.interceptor';



@NgModule({
  declarations: [
    PerfilUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers:[
    provideHttpClient(withInterceptors([requestAngular17Interceptor]))
  ],
})
export class UsuarioModule { }
