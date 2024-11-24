import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path: '',
  loadChildren:() => import('./login/login.module').then(m => m.LoginModule),
},
{
  path: 'home',
  loadChildren:() => import('./home/home.module').then(m => m.HomeModule)
},
{
  path: 'usuario',
  loadChildren:() => import('./usuario/usuario.module').then(m => m.UsuarioModule)
},
{
  path: 'denuncia',
  loadChildren:() => import('./denuncia/denuncia.module').then(m => m.DenunciaModule)
}
];
