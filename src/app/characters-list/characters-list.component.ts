import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '../models/characters';
import { User } from '../models/user';
import { CharactersService } from '../services/characters.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css'],
})
export class CharactersListComponent implements OnInit {
  displayedColumns: string[] = [
    'Position',
    'Name',
    'Status',
    'Species',
    'Gender',
    'Details',
    'Favourite',
  ];
  actualPage: number;
  totalPages: number;
  previousPage: any;
  nextPage: any;
  genderForm: string;
  statusForm: string;
  speciesForm: string;
  nameForm: string;
  userData: User;
  charactersListData: Character[];
  loadingCharacters: boolean;
  statusOptions: OptionSelect[] = STATUS_OPTIONS;
  genderOptions: OptionSelect[] = GENDER_OPTIONS;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private userService: UserService,
    private charactersService: CharactersService
  ) {}
  ngOnInit(): void {
    this.userData = this.storageService.getItem('userDetails');
    this.getCharacters(null);
  }
  filterCharacters() {
    console.log('nameForm: ', this.nameForm);
    console.log('specieForm: ', this.speciesForm);
    console.log('statusForm: ', this.statusForm);
    console.log('genderForm: ', this.genderForm);
    let filters: any = {};
    if (this.nameForm && this.nameForm.length > 0)
      filters['name'] = this.nameForm;
    if (this.speciesForm && this.speciesForm.length > 0)
      filters['species'] = this.speciesForm;
    if (this.statusForm && this.statusForm.length > 0)
      filters['status'] = this.statusForm;
    if (this.genderForm && this.genderForm.length > 0)
      filters['gender'] = this.genderForm;
    this.getCharacters(filters);
  }
  getCharacters(filters: any) {
    this.loadingCharacters = true;
    this.actualPage = 0;
    this.totalPages = 0;
    this.previousPage = null;
    this.nextPage = null;
    this.charactersListData = [];
    this.charactersService.getCharacters(filters).subscribe({
      next: (result: any) => {
        console.log('[getCharacters] result: ', result);
        if (!result.error) {
          this.actualPage = 1;
          this.totalPages = result.info.pages;
          this.previousPage = null;
          this.nextPage = result.info.next;
          this.charactersListData = result.results;
          this.findFavourites();
          this.loadingCharacters = false;
        }
      },
      error: (err) => {
        console.error('[getCharacters] error: ', err);
      },
    });
  }
  previousPageClick() {
    console.log('previousPageClick');
    if (this.actualPage > 1) {
      this.actualPage--;
      this.loadingCharacters = true;
      this.charactersService
        .getOtherCharacterPage(this.previousPage)
        .subscribe({
          next: (result: any) => {
            console.log('[previousPageClick] result: ', result);
            this.previousPage = result.info.prev;
            this.nextPage = result.info.next;
            this.charactersListData = result.results;
            this.findFavourites();
            this.loadingCharacters = false;
          },
          error: (err) => {
            console.error('[previousPageClick] error: ', err);
          },
        });
    }
  }
  nextPageClick() {
    console.log('nextPageClick');
    if (this.totalPages !== this.actualPage) {
      this.actualPage++;
      this.loadingCharacters = true;
      this.charactersService.getOtherCharacterPage(this.nextPage).subscribe({
        next: (result: any) => {
          console.log('[nextPageClick] result: ', result);
          this.previousPage = result.info.prev;
          this.nextPage = result.info.next;
          this.charactersListData = result.results;
          this.findFavourites();
          this.loadingCharacters = false;
        },
        error: (err) => {
          console.error('[nextPageClick] error: ', err);
        },
      });
    }
  }
  favouriteClick(character: Character) {
    if (character['favourite']) {
      const index = this.userData.favourites.indexOf(character.id);
      if (index > -1) {
        this.userData.favourites.splice(index, 1);
      }
    } else {
      this.userData.favourites.push(character.id);
      console.log('userData: ', this.userData);
    }
    this.userService.editUser(this.userData).subscribe({
      next: (result: any) => {
        console.log('[favouriteClick.editUser] result: ', result);
        this.storageService.setItem('userDetails', this.userData);
        character['favourite'] = character['favourite']
          ? !character['favourite']
          : true;
      },
      error: (err) => {
        console.error('[favouriteClick.editUser] error: ', err);
      },
    });
  }
  findFavourites() {
    let favourites = this.userData.favourites;
    if (favourites && favourites.length > 0) {
      this.charactersListData.forEach((item) => {
        item['favourite'] = favourites.includes(item.id) ? true : false;
      });
    }
  }

  showDetailCharater(character: any) {
    this.router.navigate(['logged/character/' + character.id]);
  }
}
export interface OptionSelect {
  description: string;
  value: string;
}
const STATUS_OPTIONS: OptionSelect[] = [
  {
    description: 'Alive',
    value: 'alive',
  },
  {
    description: 'Dead',
    value: 'death',
  },
  {
    description: 'Unknown',
    value: 'unknown',
  },
];
const GENDER_OPTIONS: OptionSelect[] = [
  {
    description: 'Male',
    value: 'male',
  },
  {
    description: 'Female',
    value: 'female',
  },
  {
    description: 'GenderLess',
    value: 'genderless',
  },
  {
    description: 'Unknown',
    value: 'unknown',
  },
];
