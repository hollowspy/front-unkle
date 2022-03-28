import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./dashbaord/home/home.component";
import { ProfileComponent } from './dashbaord/profile/profile.component'
import {AuthGuard} from "../providers/auth.guard";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
      {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
