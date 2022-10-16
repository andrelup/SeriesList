import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';

import { CharacterComponent } from './character/character.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { FavouritesComponent } from './favourites/favourites.component';
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
      { path: 'list', component: CharactersListComponent },
      { path: 'character/:id', component: CharacterComponent },
      { path: 'favourites', component: FavouritesComponent },
      { path: 'user', component: UserComponent },
      { path: 'not-found', component: NotFoundComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
