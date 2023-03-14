import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkUnitComponent } from './work-unit/work-unit.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';

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
  declarations: [WorkUnitComponent, WorkplaceComponent, EmployeeListComponent, EmployeeUploadComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmployeeModule {}
