import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthModule,
  AUTH_SERVICE,
  PUBLIC_FALLBACK_PAGE_URI,
  PROTECTED_FALLBACK_PAGE_URI
} from 'ngx-auth';

import { TokenStorageService } from './token-storage.service';
import { AuthentificationService } from './authentification.service';

export function factory(authentificatinService: AuthentificationService) {
  return authentificatinService;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule
  ],
  providers: [
    TokenStorageService,
    AuthentificationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/cards/:username' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    {
      provide: AUTH_SERVICE,
      deps: [AuthentificationService],
      useFactory: factory
    }
  ]
})
export class AuthentificationModule { }
