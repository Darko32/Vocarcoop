import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en/home' },
  { path: 'en/home', loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule) },

  { path: 'mk/pochetna', loadChildren: () => import('./routes/home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
