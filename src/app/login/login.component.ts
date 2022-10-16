import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    console.log('EMAIL: ', this.email);
    console.log('PASSWORD: ', this.password);
    this.userService.login(this.email, this.password).subscribe({
      next: (result) => {
        console.log('[login] result: ', result);
        this.router.navigate(['logged/list']);
      },
      error: (err) => {
        console.log('[login] error: ', err);
      },
    });
  }
}
