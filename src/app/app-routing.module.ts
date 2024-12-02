import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
   // Lazy load the Trips module
  {
    path: 'trips',
    loadChildren: () =>
      import('./trips/trips.module').then((m) => m.TripsModule),
  },
    // Redirect root to trips home
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
   // Fallback route for unmatched URLs with a dedicated error page
  { path: '**', redirectTo: '/trips' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
