import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CharactersApiService } from '../../data-access/characters.api.service';
import { RouterLink } from '@angular/router';
import { LocationsModel } from '../../model/locations.mode';
import { Character } from '../../model/characters.model';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  @Input() locationId: string | null = null;

  private backend = inject(CharactersApiService);

  nextCharID: number | null = null;
  prevCharID: number | null = null;
  rickyLocation: LocationsModel | null = null;
  residents: string[] | null = null;
  characterIDs: number[] = [];
  residentsChars: Character[] | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locationId'] && this.locationId) {
      this.getLocation(this.locationId);
    }
  }

  getLocation(locationId: string) {
    this.backend
      .getSingleLocation(locationId)
      .pipe(
        map((response) => {
          this.rickyLocation = response;
          this.residents = response.residents;

          this.characterIDs = this.residents.map((url) => {
            const parts = url.split('/');
            return parseInt(parts[parts.length - 1]);
          });

          return this.characterIDs;
        }),
        switchMap((characterIDs) => {
          if (characterIDs && characterIDs.length) {
            return this.backend.getMultipleCharacters(characterIDs);
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        console.log(response);

        this.residentsChars = response;
      });
  }

  getNextPrevIndex(currentIndex: number) {
    this.prevCharID = currentIndex > 1 ? currentIndex - 1 : null;
    this.nextCharID = currentIndex + 1;
  }
}
