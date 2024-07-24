import { Component, inject, signal } from '@angular/core';
import { RickCardComponent } from '../ui/rick-card/rick-card.component';
import { RickFilterComponent } from '../ui/rick-filter/rick-filter.component';
import { RickListComponent } from '../ui/rick-list/rick-list.component';
import { CharactersApiService } from '../data-access/characters.api.service';
import { Character } from '../model/characters.model';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../ui/pagination/pagination.component';
import { LoaderComponent } from '../../ui/loader/loader.component';

type TasksListFiltersForm = FormGroup<{
  searchChar: FormControl<string>;
  page: FormControl<number>;
}>;

export type TaskFilterValue = ReturnType<TasksListFiltersForm['getRawValue']>;

@Component({
  selector: 'app-rick-page',
  standalone: true,
  imports: [
    RickCardComponent,
    RickFilterComponent,
    RickListComponent,
    RouterLink,
    PaginationComponent,
    LoaderComponent,
  ],
  templateUrl: './rick-page.component.html',
  styleUrl: './rick-page.component.scss',
})
export class RickPageComponent {
  private backend = inject(CharactersApiService);
  characters = signal<Character[]>([]);
  maxItem: number = 0;
  prevPage: number = 0;
  nextPage: number = 1;
  currentPage = 1;
  totalPages: number = 0;
  searchChar: string = '';
  loading: boolean = false;

  handleFiltersChange(searchChar: TaskFilterValue): void {
    this.currentPage = 1;

    this.getCharcters(searchChar);
  }

  getCharcters(searchChar: TaskFilterValue) {
    this.loading = true;
    this.backend
      .getAll({ name: searchChar.searchChar, page: searchChar.page })
      .subscribe((response) => {
        if (Array.isArray(response.body?.results)) {
          this.characters.set(response.body?.results);
        }

        if (response.body?.info) {
          this.totalPages = response.body.info.pages;
        }

        this.searchChar = searchChar.searchChar;
        this.loading = false;
      });
  }

  nextPageFun(currentPage: number) {
    this.currentPage = currentPage;

    this.getCharcters({
      searchChar: this.searchChar,
      page: this.currentPage + 1,
    });
  }

  prevPageFun(currentPage: number) {
    this.currentPage = currentPage;

    this.getCharcters({
      searchChar: this.searchChar,
      page: this.currentPage - 1,
    });
  }
}
