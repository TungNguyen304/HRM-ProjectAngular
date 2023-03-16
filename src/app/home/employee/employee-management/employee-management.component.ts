import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/api/employee.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent {
  public status: {value:string}[];
  public sex: {value:string}[];
  public employeeList: any;
  public showCreateEmployee:boolean = false;

  constructor(private employeeService:EmployeeService, private router:Router) {
      this.status = [
          {value: 'On'},
          {value: 'Off'},
      ];
      this.sex = [
        {value: 'Nam'},
        {value: 'Nữ'},
      ]
  }

  ngOnInit() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeList = data
    })
  }

  handleDisplayCreateEmployee():void {
    this.showCreateEmployee = !this.showCreateEmployee;
    this.router.navigate(['employee', 'management', 'create-employee']);
  }

  handleNavigateDetailEmployee():void {
    this.router.navigate(['employee', 'management', 'detail-employee']);
  }
}
