import { Component, OnInit, inject } from '@angular/core';
import { CharactersApiService } from '../../data-access/characters.api.service';
import { RouterLink } from '@angular/router';
import { Character } from '../../model/characters.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private favorites = inject(CharactersApiService);

  characters: Character[] = [];

  ngOnInit(): void {
    this.characters = this.favorites.getFavoritesChar();
  }

  removeFromFav(char: Character) {
    this.favorites.removeItemFromLocalStorage(char);
  }
}
