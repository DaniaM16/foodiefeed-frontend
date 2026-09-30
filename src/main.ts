import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
//Startet d. Angular-Anwendung mit d. App-Komponente u. ihrer Konfiguration
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
