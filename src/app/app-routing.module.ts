import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharacterComponent } from './character/character.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: NavBarComponent,
    children: [
      { path: 'list', component: CharactersListComponent },
      { path: 'character', component: CharacterComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
