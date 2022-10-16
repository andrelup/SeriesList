import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Character } from '../models/characters';
import { CharactersService } from '../services/characters.service';

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
  charactersListData: Character[];
  loadingCharacters: boolean;
  statusOptions: OptionSelect[] = STATUS_OPTIONS;
  genderOptions: OptionSelect[] = GENDER_OPTIONS;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}
  ngOnInit(): void {
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
          this.loadingCharacters = false;
        },
        error: (err) => {
          console.error('[nextPageClick] error: ', err);
        },
      });
    }
  }
  favouriteClick(character: Character) {
    character['favourite'] = character['favourite']
      ? !character['favourite']
      : true;
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
