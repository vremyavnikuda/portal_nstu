import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"nstu-student-portal","appId":"1:984449548964:web:78433ce25f3037f0789c31","storageBucket":"nstu-student-portal.appspot.com","apiKey":"AIzaSyCg_EJ3ZlyQj-ZsjAK0OvMQ_X8l1fc_ueA","authDomain":"nstu-student-portal.firebaseapp.com","messagingSenderId":"984449548964","measurementId":"G-ETLSTNC7K0"}))), importProvidersFrom(provideAuth(() => getAuth()))]
};
