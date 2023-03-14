import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TeamMemberComponent } from './team-member/team-member.component';
import { MemberComponent } from './team-member/member.component';

const routes:Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'team-member',
        component: TeamMemberComponent
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'assets',
        loadChildren: () => import('./assets/assets.module').then(m => m.AssetsModule)
      },
      {
        path: '',
        redirectTo: 'team-member',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    HomeComponent,
    TeamMemberComponent,
    MemberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
