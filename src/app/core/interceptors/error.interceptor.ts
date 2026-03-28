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
      toastr.error('Não foi possível conectar com o servidor. Tente novamente.', 'Erro!');
      return throwError(() => new Error('Falha na requisição.'));
    })
  );
};
