import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StartAppGuard } from './core/start-app.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guide', pathMatch: 'full'
  },
  {
    path: 'guide',
    loadChildren: () => import('./pages/guide/guide.module').then( m => m.GuidePageModule),
    canActivate: [StartAppGuard]
  },
  {
    path:'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },


  {
    path: 'passport',
    loadChildren: () => import('./pages/passport/passport.module').then( m => m.PassportPageModule)
  },
 


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
