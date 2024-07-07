import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'nstu-student-portal',
        appId: '1:984449548964:web:78433ce25f3037f0789c31',
        storageBucket: 'nstu-student-portal.appspot.com',
        apiKey: 'AIzaSyCg_EJ3ZlyQj-ZsjAK0OvMQ_X8l1fc_ueA',
        authDomain: 'nstu-student-portal.firebaseapp.com',
        messagingSenderId: '984449548964',
        measurementId: 'G-ETLSTNC7K0',
      })
    ),
    provideAuth(() => getAuth()),
  ],
};
