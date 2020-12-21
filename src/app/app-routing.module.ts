import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'battleblocks',
    loadChildren: () => import('./pages/battleblocks/battleblocks.module').then( m => m.BattleblocksPageModule)
  },
  {
    path: '',
    redirectTo: 'battleblocks',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
