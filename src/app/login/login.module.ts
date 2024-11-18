import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { requestAngular17Interceptor } from '../auth/request-angular17.interceptor';
import { RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,

  ],
  imports: [
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers:[
    provideHttpClient(withInterceptors([requestAngular17Interceptor]))
  ],
})
export class LoginModule { }
