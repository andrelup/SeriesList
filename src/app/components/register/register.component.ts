import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private userService: UserService) { }

  register() {
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirmPassword);
    if (this.password === this.confirmPassword) {
      let user = {
        email: this.email,
        password: this.password,
        favourites: [],
      };
      this.userService.createUser(user).subscribe({
        next: (result) => {
          console.log('[register] result: ', result);
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.error('[register] ERROR: ', err);
        },
      });
    }
  }
}
