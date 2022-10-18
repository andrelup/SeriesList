import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';

import { CharacterComponent } from './character/character.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'logged',
    component: NavBarComponent,
    children: [
      { path: 'list', component: CharactersListComponent, canActivate: [AuthGuard] },
      { path: 'character/:id', component: CharacterComponent, canActivate: [AuthGuard] },
      { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
