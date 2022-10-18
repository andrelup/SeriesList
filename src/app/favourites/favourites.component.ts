import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../models/characters';
import { User } from '../models/user';
import { CharactersService } from '../services/characters.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  displayedColumns: string[] = [
    'Position',
    'Name',
    'Status',
    'Species',
    'Gender',
    'Details',
  ];
  actualPage: number;
  totalPages: number;
  previousPage: any;
  nextPage: any;
  genderForm: string;
  statusForm: string;
  speciesForm: string;
  nameForm: string;
  episodesForm: string;
  locationForm: string;
  userData: User;
  charactersListData: Character[];
  charactersListFilter: Character[];
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
    this.getFavouritesCharacters(null);
  }
  filterFavourites() {
    console.log('nameForm: ', this.nameForm);
    console.log('specieForm: ', this.speciesForm);
    console.log('statusForm: ', this.statusForm);
    console.log('genderForm: ', this.genderForm);
    console.log('locationForm: ', this.locationForm);
    console.log('episodesForm: ', this.episodesForm);
    let filters: any = {};
    if (this.nameForm) filters['name'] = this.nameForm;
    if (this.speciesForm) filters['species'] = this.speciesForm;
    if (this.statusForm) filters['status'] = this.statusForm;
    if (this.genderForm) filters['gender'] = this.genderForm;
    if (this.locationForm) filters['location'] = this.locationForm;
    if (this.episodesForm) filters['episodes'] = this.episodesForm;
    this.getFavouritesCharacters(filters);
  }
  getFavouritesCharacters(filters: any) {
    this.loadingCharacters = true;
    this.actualPage = 0;
    this.totalPages = 0;
    this.previousPage = null;
    this.nextPage = null;
    this.charactersListData = [];
    let ids = '';
    this.userData.favourites.forEach((item) => (ids += item + ','));
    this.charactersService.getCharactersById(ids, filters).subscribe({
      next: (result: any) => {
        console.log('[getCharactersById] result: ', result);
        if (!result.error) {
          this.charactersListData = result;
          this.charactersListFilter = result;
          this.loadingCharacters = false;
        }
      },
      error: (err) => {
        console.error('[getCharacters] error: ', err);
      },
    });
  }

  showDetailCharater(character: any) {
    this.router.navigate(['logged/character/' + character.id]);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
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
    value: 'dead',
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
