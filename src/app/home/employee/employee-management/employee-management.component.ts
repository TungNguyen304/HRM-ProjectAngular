import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import { emojiWarning, maxLengthWarning } from 'src/app/core/services/helper/warningForm.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';

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
  public searchForm:FormGroup;
  public warning:{codeNameEmail: any} = {
    codeNameEmail: null
  };
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

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.searchForm, control);
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      codeNameEmail: new FormControl('', [Validators.maxLength(255), emojiValidator])
    })
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeeList = data;
    });
    this.warningDetect();
    this.searchForm.valueChanges.subscribe(() => {
      this.warningDetect();
    })
  }

  warningDetect(): void {
    this.handleSetWarning('codeNameEmail', 'Mã tài sản', 255);
  }

  handleSetWarning(
    type: string,
    label: string,
    length?: number
  ): void {
    emojiWarning(this.searchForm, this, type, label);
    length && maxLengthWarning(this.searchForm, this, type, label, length);
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
