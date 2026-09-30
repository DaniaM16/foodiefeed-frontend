import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

//Grundkonfigaration d. Anwendung und Einbindung d. definierten Routen

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};

//sorgt dafür, dass Angular unsere Routen aus app.routes.ts verwenden kann