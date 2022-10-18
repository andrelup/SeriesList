import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  setItem(key: string, item: any) {
    let itemStringfy = JSON.stringify(item);
    sessionStorage.setItem(key, itemStringfy);
  }
  getItem(key: string) {
    return JSON.parse(sessionStorage.getItem(key) as string);
  }
  removeAll() {
    sessionStorage.removeItem('userDetails');
    sessionStorage.removeItem('token');
  }
}
