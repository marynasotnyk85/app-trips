import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'trips',
    loadChildren: () =>
      import('./trips/trips.module').then((m) => m.TripsModule),
  },
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: '**', redirectTo: '/trips' }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
