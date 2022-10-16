import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, MaxLengthValidator } from '@angular/forms';
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

  constructor(private charactersService: CharactersService) {}
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
        console.log('[getCharacters] error: ', err);
        //TODO enseñar toaster de error de contraseña o email erroneos
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
            console.log('[previousPageClick] error: ', err);
            //TODO enseñar toaster de error de contraseña o email erroneos
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
          console.log('[nextPageClick] error: ', err);
          //TODO enseñar toaster de error de contraseña o email erroneos
        },
      });
    }
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
const DATA: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
  },
  {
    id: 2,
    name: 'Agency Director',
    status: 'Dead',
    species: 'Human',
    gender: 'Male',
  },
  {
    id: 3,
    name: 'Agency Director',
    status: 'Dead',
    species: 'Human',
    gender: 'Male',
  },
  {
    id: 4,
    name: 'Agency Director',
    status: 'Dead',
    species: 'Human',
    gender: 'Male',
  },
  {
    id: 5,
    name: 'Agency Director',
    status: 'Dead',
    species: 'Human',
    gender: 'Male',
  },
];
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];
