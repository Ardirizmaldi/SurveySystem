import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './survey/create/create.component';
import { CardsComponent } from './component/cards/cards.component';
import { SubmitResponsesComponent } from './survey/submit-responses/submit-responses.component';
import { ResultComponent } from './survey/result/result.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [PublicGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [PublicGuard]},
  {path: 'cards/:idUser', component: CardsComponent, canActivate: [ProtectedGuard]},
  {path: 'show/:idUser/:id', component: SubmitResponsesComponent, canActivate: [ProtectedGuard]},
  {path: 'result/:idSurvey', component: ResultComponent, canActivate: [ProtectedGuard]},
  {path: 'create', component: CreateComponent, canActivate: [ProtectedGuard]},
  {path: '', component: CardsComponent, canActivate: [ProtectedGuard]},
  {path: '**', redirectTo: '', canActivate: [ProtectedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
