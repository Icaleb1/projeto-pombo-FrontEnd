import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciaRoutingModule } from './denuncia-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { GerenciarDenunciasComponent } from './gerenciar-denuncias/gerenciar-denuncias.component';
import { requestAngular17Interceptor } from '../auth/request-angular17.interceptor';


@NgModule({
  declarations: [
    RelatorioComponent,
    GerenciarDenunciasComponent
  ],
  imports: [
    CommonModule,
    DenunciaRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  providers:[
    provideHttpClient(withInterceptors([requestAngular17Interceptor]))
  ],
})
export class DenunciaModule { }
