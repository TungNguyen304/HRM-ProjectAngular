import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderComponent } from './provider/provider.component';
import { DeviceComponent } from './device/device.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DetailProviderComponent } from './components/detail-provider/detail-provider.component';
import { CreateProviderComponent } from './components/create-provider/create-provider.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'provider',
        component: ProviderComponent,
      },
      {
        path: 'device',
        component: DeviceComponent,
      },
      {
        path: '',
        redirectTo: 'provider',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    ProviderComponent,
    DeviceComponent,
    DetailProviderComponent,
    CreateProviderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    RadioButtonModule,
    DialogModule,
    AccordionModule
  ],
})
export class EstateModule {}
