import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TeamMemberComponent } from './team-member/team-member.component';
import { MemberComponent } from './team-member/member.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { BreadcrumbModule } from 'primeng/breadcrumb';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'team-member',
        pathMatch: 'full',
      },
      {
        path: 'team-member',
        component: TeamMemberComponent,
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path: 'estate',
        loadChildren: () =>
          import('./estate/estate.module').then((m) => m.EstateModule),
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, TeamMemberComponent, MemberComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TranslateModule,
    PaginatorModule,
    BreadcrumbModule,
  ],
})
export class HomeModule {}
