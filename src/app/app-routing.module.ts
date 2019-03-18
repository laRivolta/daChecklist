import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './public/home/home.module#HomePageModule' }, 
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { 
    path: 'members', 
    canActivate: [ AuthGuard ],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
