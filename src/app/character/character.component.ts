import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  backToHome() {
    this.router.navigate(['list']);
  }
}
