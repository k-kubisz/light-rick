import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input({ required: true }) currentPage!: number;
  @Input({ required: true }) totalPages!: number;

  @Output() nextPage = new EventEmitter<number>();
  @Output() prevPage = new EventEmitter<number>();
}
