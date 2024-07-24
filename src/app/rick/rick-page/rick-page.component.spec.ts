import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RickPageComponent } from './rick-page.component';

describe('RickPageComponent', () => {
  let component: RickPageComponent;
  let fixture: ComponentFixture<RickPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RickPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
