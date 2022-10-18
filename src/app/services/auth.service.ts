import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(email: string, password: string) {
    let body = { email: email, password: password };
    return this.http.post(this.url + 'login', body);
  }
  logout() {
    this.storageService.removeAll();
  }
}
