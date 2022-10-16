import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  url = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) {}

  getCharacters(queryParams: any) {
    let urlCharacters = new URL(this.url);
    if (queryParams) {
      console.log('[getCharacters] queryParams: ', queryParams);
      Object.keys(queryParams).forEach((key) =>
        urlCharacters.searchParams.append(key, queryParams[key])
      );
    }
    console.log('[getCharacters] url: ', urlCharacters.toString());
    return this.http.get(urlCharacters.toString());
  }
  getOtherCharacterPage(urlPage: string) {
    return this.http.get(urlPage);
  }
  getCharactersById(id: any) {
    return this.http.get(this.url + '/' + id);
  }
}
