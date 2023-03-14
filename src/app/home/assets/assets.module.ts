import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderComponent } from './provider/provider.component';
import { DeviceComponent } from './device/device.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'provider',
        component: ProviderComponent
      },
      {
        path: 'device',
        component: DeviceComponent
      },
      {
        path: '',
        redirectTo: 'provider',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProviderComponent,
    DeviceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AssetsModule { }
