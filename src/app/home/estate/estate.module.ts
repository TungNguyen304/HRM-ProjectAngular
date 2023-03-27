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
import { CreateDeviceComponent } from './components/create-device/create-device.component';
import { DetailDeviceComponent } from './components/detail-device/detail-device.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';

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
        path: 'device/create-device',
        component: CreateDeviceComponent
      },
      {
        path: 'device/detail-device/:id',
        component: DetailDeviceComponent
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
    CreateDeviceComponent,
    DetailDeviceComponent
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
    AccordionModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SplitButtonModule,
    ToastModule,
    TranslateModule
  ],
})
export class EstateModule {}
