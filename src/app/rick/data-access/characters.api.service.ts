import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Character } from '../model/characters.model';
import { environment } from '../../../environments/environment.development';
import { Info } from '../model/info.model';
import { LocationsModel } from '../model/locations.mode';

export type GetAllTasksSearchParams = {
  name: string;
  page: number;
};

@Injectable({
  providedIn: 'root',
})
export class CharactersApiService {
  private http = inject(HttpClient);

  private favorites: Character[] =
    JSON.parse(localStorage.getItem('ricky')!) ?? [];

  getAllCharacters() {
    return this.http.get<{
      results: Character[];
      info: Info;
    }>(`${environment.apiUrl}/character`);
  }

  getAll(searchParams: GetAllTasksSearchParams) {
    return this.http.get<{
      results: Character[];
      info: Info;
    }>(`${environment.apiUrl}/character`, {
      observe: 'response',
      params: searchParams,
    });
  }
  getSingleCharacter(characterId: string) {
    return this.http.get<Character>(
      `${environment.apiUrl}/character/${characterId}`
    );
  }

  getMultipleCharacters(charactersIds: number[]) {
    return this.http.get<Character[]>(
      `${environment.apiUrl}/character/${charactersIds}`
    );
  }

  getSingleLocation(locationId: string) {
    return this.http.get<LocationsModel>(
      `${environment.apiUrl}/location/${locationId}`
    );
  }

  addCharacterToLocalStorage(char: Character) {
    const isAdded = !!this.favorites.find(
      (el) => el.id === char.id && el.name === char.name
    );
    if (!isAdded) {
      this.favorites.push(char);
      localStorage.setItem('ricky', JSON.stringify(this.favorites));
    }
  }

  getFavoritesChar() {
    return this.favorites;
  }

  removeItemFromLocalStorage(char: Character): void {
    const characters = this.favorites;

    console.log(char);

    const index = characters.findIndex((character) => character.id === char.id);

    if (index !== -1) {
      characters.splice(index, 1);

      localStorage.setItem('ricky', JSON.stringify(characters));
    }
  }
}
