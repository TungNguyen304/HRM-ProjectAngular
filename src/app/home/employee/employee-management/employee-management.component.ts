import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
  providers: [MessageService],
})
export class EmployeeManagementComponent {
  public status: { value: string }[];
  public sex: { value: string }[];
  public employeeList: any;
  public showCreateEmployee: boolean = false;
  public actions: any[];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.status = [{ value: 'On' }, { value: 'Off' }];
    this.sex = [{ value: 'Nam' }, { value: 'Nữ' }];
    this.actions = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.update();
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.delete();
        },
      },
      { label: 'Detail', icon: 'bi bi-card-text',command: () => {
        this.handleNavigateDetailEmployee();
      },},
    ];
  }

  ngOnInit() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeList = data;
    });
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Deleted',
    });
  }

  handleDisplayCreateEmployee(): void {
    this.showCreateEmployee = !this.showCreateEmployee;
    this.router.navigate(['employee', 'management', 'create-employee']);
  }

  handleNavigateDetailEmployee(): void {
    this.router.navigate(['employee', 'management', 'detail-employee']);
  }
}
