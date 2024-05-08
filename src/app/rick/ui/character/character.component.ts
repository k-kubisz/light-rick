import { Component, Input, OnInit, inject } from '@angular/core';
import { CharactersApiService } from '../../data-access/characters.api.service';
import { Character } from '../../model/characters.model';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent implements OnInit {
  @Input() characterId: string | null = null;

  singleChar: Character | null = null;

  private backend = inject(CharactersApiService);

  nextCharID: number | null = null;
  prevCharID: number | null = null;

  locationID: string | undefined = '';

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.characterId) {
      this.getCharacter(this.characterId);
      this.getNextPrevIndex(+this.characterId);
    }
  }

  getCharacter(charId: string) {
    this.backend.getSingleCharacter(charId).subscribe((response) => {
      if (response.location && response.location.url) {
        const locationUrl = response.location.url;
        const parts = locationUrl.split('/');
        if (parts) {
          this.locationID = parts.pop();
        }
      }
      this.singleChar = response;
    });
  }

  getNextPrevIndex(currentIndex: number) {
    this.prevCharID = currentIndex > 1 ? currentIndex - 1 : null;
    this.nextCharID = currentIndex + 1;
  }
}
