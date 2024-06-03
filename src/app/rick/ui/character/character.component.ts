import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { CharactersApiService } from '../../data-access/characters.api.service';
import { Character } from '../../model/characters.model';
import { RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../../../ui/loader/loader.component';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [RouterLink, NgIf, ReactiveFormsModule, LoaderComponent],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  @Input() characterId: string | null = null;

  private formBuilder = inject(NonNullableFormBuilder);
  private backend = inject(CharactersApiService);

  singleChar: Character | null = null;
  nextCharID: number | null = null;
  prevCharID: number | null = null;
  locationID: string | undefined = '';
  loading: boolean = false;

  form = this.formBuilder.group({
    name: this.formBuilder.control<string>(''),
    description: this.formBuilder.control<string>(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characterId'] && this.characterId) {
      this.getCharacter(this.characterId);
      this.getNextPrevIndex(+this.characterId);
    }
  }

  getCharacter(charId: string) {
    this.loading = true;
    this.backend.getSingleCharacter(charId).subscribe((response) => {
      if (response.location && response.location.url) {
        const locationUrl = response.location.url;
        const parts = locationUrl.split('/');
        if (parts) {
          this.locationID = parts.pop();
        }
      }
      this.loading = false;
      this.singleChar = response;
    });
  }

  getNextPrevIndex(currentIndex: number) {
    this.prevCharID = currentIndex > 1 ? currentIndex - 1 : null;
    this.nextCharID = currentIndex + 1;
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
