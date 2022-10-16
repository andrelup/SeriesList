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
    // 'Favourite',
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
    this.getCharacters(null);
  }
  filterFavourites() {
    console.log('nameForm: ', this.nameForm);
    console.log('specieForm: ', this.speciesForm);
    console.log('statusForm: ', this.statusForm);
    console.log('genderForm: ', this.genderForm);
    this.charactersListFilter = [];
    if (this.nameForm && this.nameForm.length > 0) {
      this.charactersListFilter = [
        ...this.charactersListData.filter((item) =>
          item.name.includes(this.nameForm)
        ),
      ];
    }
    if (this.speciesForm && this.speciesForm.length > 0) {
      this.filterBySpecies();
    }
    if (this.statusForm && this.statusForm.length > 0) {
      this.filterByStatus();
    }
    if (this.genderForm && this.genderForm.length > 0) {
      this.filterByGender();
    }
    console.log(
      '[filterFavourites] charactersListFilter: ',
      this.charactersListFilter
    );
  }
  getCharacters(filters: any) {
    this.loadingCharacters = true;
    this.actualPage = 0;
    this.totalPages = 0;
    this.previousPage = null;
    this.nextPage = null;
    this.charactersListData = [];
    let ids = '';
    this.userData.favourites.forEach((item) => (ids += item + ','));
    this.charactersService.getCharactersById(ids).subscribe({
      next: (result: any) => {
        console.log('[getCharacters] result: ', result);
        if (!result.error) {
          // this.actualPage = 1;
          // this.totalPages = result.info.pages;
          // this.previousPage = null;
          // this.nextPage = result.info.next;
          this.charactersListData = result;
          this.charactersListFilter = result;
          // this.findFavourites();
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
  filterBySpecies() {
    if (this.charactersListFilter.length > 1) {
      this.charactersListFilter = this.charactersListFilter.filter((item) =>
        item.species.includes(this.speciesForm)
      );
    } else {
      this.charactersListFilter = [
        ...this.charactersListData.filter((item) =>
          item.species.includes(this.speciesForm)
        ),
      ];
    }
  }
  filterByStatus() {
    if (this.charactersListFilter.length > 1) {
      this.charactersListFilter = this.charactersListFilter.filter((item) =>
        item.status.toLocaleLowerCase().includes(this.statusForm)
      );
    } else {
      this.charactersListFilter = [
        ...this.charactersListData.filter((item) =>
          item.status.toLocaleLowerCase().includes(this.statusForm)
        ),
      ];
    }
  }
  filterByGender() {
    if (this.charactersListFilter.length > 1) {
      this.charactersListFilter = this.charactersListFilter.filter((item) =>
        item.gender.toLocaleLowerCase().includes(this.genderForm)
      );
    } else {
      this.charactersListFilter = [
        ...this.charactersListData.filter((item) =>
          item.gender.toLocaleLowerCase().includes(this.genderForm)
        ),
      ];
    }
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
