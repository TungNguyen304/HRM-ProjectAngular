import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkUnitComponent } from './work-unit/work-unit.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'work-unit',
        component: WorkUnitComponent,
      },
      {
        path: 'workplace',
        component: WorkplaceComponent,
      },
      {
        path: 'list',
        component: EmployeeListComponent,
      },
      {
        path: 'upload',
        component: EmployeeUploadComponent,
      },
      {
        path: '',
        redirectTo: 'work-unit',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  declarations: [
    WorkUnitComponent,
    WorkplaceComponent,
    EmployeeListComponent,
    EmployeeUploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
    InputTextModule,
    TreeTableModule,
    DropdownModule
  ],
})
export class EmployeeModule {}
