import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickListComponent } from './rick-list.component';

describe('RickListComponent', () => {
  let component: RickListComponent;
  let fixture: ComponentFixture<RickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
