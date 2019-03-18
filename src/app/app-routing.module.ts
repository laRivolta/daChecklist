import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/public/home/home.module#HomePageModule' }, 
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/public/signup/signup.module#SignupPageModule' },
  { path: 'reset-password', loadChildren: './pages/public/reset-password/reset-password.module#ResetPasswordPageModule' },
  { 
    path: 'member', 
    canActivate: [ AuthGuard ],
    loadChildren: './pages/member/member-routing.module#MemberRoutingModule'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
