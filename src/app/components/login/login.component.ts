import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

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
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  login() {
    console.log('EMAIL: ', this.email);
    console.log('PASSWORD: ', this.password);
    this.authService.login(this.email, this.password).subscribe({
      next: (result: any) => {
        console.log('[login] result: ', result);
        if (result && result.message === 'Authorized' && result.user && result.token) {
          this.storageService.setItem('userDetails', result.user);
          this.storageService.setItem('token', result.token);
          this.router.navigate(['logged/list']);
        }
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
