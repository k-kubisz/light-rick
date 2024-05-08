import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../model/characters.model';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CharactersApiService } from '../../data-access/characters.api.service';

@Component({
  selector: 'app-rick-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, LowerCasePipe, RouterLink],
  templateUrl: './rick-card.component.html',
  styleUrl: './rick-card.component.scss',
})
export class RickCardComponent {
  @Input({ required: true }) character!: Character;
  @Input({ required: true }) isFav!: boolean;

  private backend = inject(CharactersApiService);

  favChar: Character[] = [];

  addToFav(char: Character) {
    this.backend.addCharacterToLocalStorage(char);
  }

  removeFromFav(char: Character) {
    this.backend.removeItemFromLocalStorage(char);
  }
}
