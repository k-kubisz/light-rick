import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickFilterComponent } from './RickFilterComponent';

describe('RickFilterComponent', () => {
  let component: RickFilterComponent;
  let fixture: ComponentFixture<RickFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RickFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
