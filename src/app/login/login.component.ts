import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  login() {
    console.log('EMAIL: ', this.email);
    console.log('PASSWORD: ', this.password);
    this.userService.login(this.email, this.password).subscribe({
      next: (result: any) => {
        console.log('[login] result: ', result);
        this.storageService.setItem('userDetails', result);
        this.router.navigate(['logged/list']);
      },
      error: (err) => {
        console.error('[login] error: ', err);
      },
    });
  }
  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
