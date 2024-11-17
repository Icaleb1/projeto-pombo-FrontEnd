import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const requestAngular17Interceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let authReq = req;

  if (typeof localStorage !== 'undefined') {
    const tokenUsuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (tokenUsuarioAutenticado) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenUsuarioAutenticado}`
        },
      });
    }
  }

  // Lida com erros de autenticação e outros problemas
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Exemplo: remove credenciais inválidas e redireciona
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('usuarioAutenticado');
        }
        router.navigate(['/login']); // Redireciona para a página de login
      }
      return throwError(() => error); // Retorna o erro para o chamador
    })
  );
};
