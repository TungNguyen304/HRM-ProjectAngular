import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkUnitComponent } from './work-unit/work-unit.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeUploadComponent } from './employee-upload/employee-upload.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { OverlayModule } from 'primeng/overlay';
import { CreateWorkplaceComponent } from './components/create-workplace/create-workplace.component';
import { DialogModule } from 'primeng/dialog';
import { MemberTableComponent } from './components/member-table/member-table.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { CalendarModule } from 'primeng/calendar';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { FileUploadModule } from 'primeng/fileupload';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DetailEmployeeComponent } from './components/detail-employee/detail-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkingProcessComponent } from './components/create-employee/working-process/working-process.component';
import { ContactInformationComponent } from './components/create-employee/contact-information/contact-information.component'
import { OtherInformationComponent } from './components/create-employee/other-information/other-information.component';
import { BasicInformationComponent } from './components/create-employee/basic-information/basic-information.component';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TreeSelectModule } from 'primeng/treeselect';


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
        path: 'management/create-employee',
        component: CreateEmployeeComponent
      },
      {
        path: 'management/detail-employee/:id',
        component: DetailEmployeeComponent
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
    DetailEmployeeComponent,
    WorkingProcessComponent,
    ContactInformationComponent,
    OtherInformationComponent,
    BasicInformationComponent,
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
    PanelModule,
    FileUploadModule,
    TriStateCheckboxModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    SplitButtonModule,
    SpeedDialModule,
    PaginatorModule,
    TranslateModule,
    SharedModule,
    TreeSelectModule
  ],
})
export class EmployeeModule {}
