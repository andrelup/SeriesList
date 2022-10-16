import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  password: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {}
  changePassword() {
    const user = this.storageService.getItem('userDetails');
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
