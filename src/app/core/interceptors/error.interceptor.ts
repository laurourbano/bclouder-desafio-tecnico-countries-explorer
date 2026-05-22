import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('API Error:', error);

      const message = getErrorMessage(error);
      toastr.error(message, 'Erro');
      return throwError(() => new Error(message));
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
  if (error.status === 404) {
    return 'Recurso não encontrado.';
  }
  if (error.status >= 500) {
    return 'Erro interno do servidor. Tente novamente mais tarde.';
  }
  return 'Não foi possível completar a requisição. Tente novamente.';
}
