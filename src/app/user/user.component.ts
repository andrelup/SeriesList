import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private userService: UserService) {}
  changePassword() {
    const user = JSON.parse(localStorage.getItem('userDetails') as string);
    if (
      this.password &&
      this.confirmPassword &&
      this.confirmPassword === this.password
    ) {
      user['password'] = this.password;
      this.userService.editUser(user).subscribe({
        next: (result) => {
          console.log('[changePassword] result: ', result);
          this.password = '';
          this.confirmPassword = '';
        },
        error: (err) => {
          console.error('[changePassword] err: ', err);
        },
      });
    } else {
      console.error('You should write the same password on both fields');
    }
  }
  backToHome() {
    this.router.navigate(['logged/list']);
  }
}
