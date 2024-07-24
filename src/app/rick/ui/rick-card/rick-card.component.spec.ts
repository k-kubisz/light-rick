import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickCardComponent } from './rick-card.component';

describe('RickCardComponent', () => {
  let component: RickCardComponent;
  let fixture: ComponentFixture<RickCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RickCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
