import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Ensure authInterceptor runs before errorInterceptor
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideToastr({
      timeOut:3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true

    }
    )
  ]
};
