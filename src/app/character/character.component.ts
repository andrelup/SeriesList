import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Character } from '../models/characters';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  id: string;
  characterData: Character;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getCharacterById();
    });
  }
  getCharacterById() {
    this.charactersService.getCharactersById(this.id).subscribe({
      next: (result: any) => {
        console.log('[getCharacterById] result: ', result);
        if (result.error) {
          this.router.navigate(['/logged/not-found']);
        }
        this.characterData = result;
      },
      error: (err) => {
        console.error('[getCharacterById] error: ', err);
      },
    });
  }
  backToHome() {
    this.router.navigate(['logged/list']);
  }
}
