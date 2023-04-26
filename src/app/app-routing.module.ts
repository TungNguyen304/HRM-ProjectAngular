import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { LoginGuard } from './guard/login.guard';
import { ForbiddenComponent } from './shared/layouts/forbidden/forbidden.component';
import { DeviceQrcodeComponent } from './home/estate/device-qrcode/device-qrcode.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'detail-device/:id/:token',
    canActivate: [LoginGuard],
    component: DeviceQrcodeComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
