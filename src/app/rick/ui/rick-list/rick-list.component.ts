import { Component, Input, OnInit, inject } from '@angular/core';
import { RickCardComponent } from '../rick-card/rick-card.component';
import { Character } from '../../model/characters.model';
import { JsonPipe } from '@angular/common';
import { CharactersApiService } from '../../data-access/characters.api.service';

@Component({
  selector: 'app-rick-list',
  standalone: true,
  imports: [RickCardComponent, JsonPipe],
  templateUrl: './rick-list.component.html',
  styleUrl: './rick-list.component.scss',
})
export class RickListComponent implements OnInit {
  @Input({ required: true }) characters!: Character[];

  private backend = inject(CharactersApiService);

  favChar: Character[] = [];

  addToFav(char: Character) {
    this.backend.addCharacterToLocalStorage(char);
  }

  ngOnInit(): void {
    this.favChar = this.backend.getFavoritesChar();
  }

  checkForFav(char: Character) {
    return this.favChar.some((favChar) => favChar.id === char.id);
  }
}
