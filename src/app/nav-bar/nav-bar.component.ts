import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private router: Router, private storageService: StorageService) { }
  logout() {
    this.storageService.removeAll()
    this.router.navigate(['/login']);
  }
}
