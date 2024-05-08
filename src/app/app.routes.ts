import { Routes } from '@angular/router';
import { CharacterComponent } from './rick/ui/character/character.component';
import { RickCardComponent } from './rick/ui/rick-card/rick-card.component';
import { RickPageComponent } from './rick/rick-page/rick-page.component';
import { LocationsComponent } from './rick/ui/locations/locations.component';
import { LocationsPageComponent } from './rick/locations-page/locations-page.component';
import { FavoritesComponent } from './rick/ui/favorites/favorites.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    title: 'Characters',
    children: [
      {
        path: '',
        component: RickPageComponent,
      },
      {
        path: ':characterId',
        component: CharacterComponent,
      },
    ],
  },
  {
    path: 'locations',
    title: 'Locations',
    children: [
      {
        path: '',
        component: LocationsPageComponent,
      },
      {
        path: ':locationId',
        component: LocationsComponent,
      },
    ],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];
