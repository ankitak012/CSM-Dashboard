import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // ✅ Ensure routing is provided
    provideHttpClient(withFetch()),   // ✅ Add HTTP client support with fetch API
  ],
};
