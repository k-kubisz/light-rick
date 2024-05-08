import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Subscription, debounceTime, startWith } from 'rxjs';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rick-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './rick-filter.component.html',
  styleUrl: './rick-filter.component.scss',
})
export class RickFilterComponent {
  private formBuilder = inject(NonNullableFormBuilder);

  private formChangesSubscription?: Subscription;

  @Output() filtersChange = new EventEmitter<any>();

  form = this.formBuilder.group({
    searchChar: this.formBuilder.control<string>(''),
    page: 1,
  });

  ngOnInit(): void {
    this.formChangesSubscription = this.form.valueChanges
      .pipe(startWith(this.form.value), debounceTime(200))
      .subscribe((value) => {
        this.filtersChange.emit(value);
      });
  }

  ngOnDestroy() {
    this.formChangesSubscription?.unsubscribe();
  }
}
