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
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BasicInformationComponent } from './components/create-device/basic-information/basic-information.component';
import { RepairInformationComponent } from './components/create-device/repair-information/repair-information.component';
import { EmployeeInformationComponent } from './components/create-device/employee-information/employee-information.component';
import { DeviceQrcodeComponent } from './device-qrcode/device-qrcode.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'provider',
        children: [
          {
            path: '',
            component: ProviderComponent,
          },
          { path: ':id', component: ProviderComponent },
        ],
      },
      {
        path: 'device',
        children: [
          { path: '', component: DeviceComponent },
          {
            path: 'create-device',
            component: CreateDeviceComponent,
          },
          {
            path: 'update-device/:id',
            component: CreateDeviceComponent,
          },
          {
            path: 'detail-device/:id',
            component: DetailDeviceComponent,
          },
          { path: ':id', component: DeviceComponent },
        ],
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
    DetailDeviceComponent,
    BasicInformationComponent,
    RepairInformationComponent,
    EmployeeInformationComponent,
    DeviceQrcodeComponent,
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
    TranslateModule,
    SharedModule,
    PaginatorModule,
    NgxQRCodeModule,
  ],
})
export class EstateModule {}
