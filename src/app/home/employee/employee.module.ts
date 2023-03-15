import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkUnitComponent } from './work-unit/work-unit.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {AccordionModule} from 'primeng/accordion';
import { OverlayModule } from 'primeng/overlay';
import { CreateWorkplaceComponent } from './components/create-workplace/create-workplace.component';
import {DialogModule} from 'primeng/dialog';
import { MemberTableComponent } from './components/member-table/member-table.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import {CalendarModule} from 'primeng/calendar';
import {DragDropModule} from 'primeng/dragdrop';
import {PanelModule} from 'primeng/panel';
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
        path: 'management',
        component: EmployeeManagementComponent,
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
    EmployeeManagementComponent,
    EmployeeUploadComponent,
    CreateWorkplaceComponent,
    MemberTableComponent,
    CreateEmployeeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
    InputTextModule,
    TreeTableModule,
    DropdownModule,
    AccordionModule,
    OverlayModule,
    DialogModule,
    CalendarModule,
    DragDropModule,
    PanelModule
  ],
})
export class EmployeeModule {}
