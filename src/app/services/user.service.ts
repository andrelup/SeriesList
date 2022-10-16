import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    let body = { email: email, password: password };
    return this.http.post(this.url + 'login', body);
  }
}
