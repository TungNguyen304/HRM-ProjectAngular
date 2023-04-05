import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import {
  emojiWarning,
  maxLengthWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class EmployeeManagementComponent {
  public status: { value: string }[];
  public sex: { value: string }[];
  public employeeList: any;
  public showCreateEmployee: boolean = false;
  public actions: any[];
  public searchForm: FormGroup;
  public warning: { codeNameEmail: any } = {
    codeNameEmail: null,
  };
  public idEmployee:string;
  public loadDisplay: boolean = false;
  public limit: number = 5;
  public total: number;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
      {
        label: 'Detail',
        icon: 'bi bi-card-text',
        command: () => {
          this.handleNavigateDetailEmployee(this.idEmployee);
        },
      },
    ];
  }

  handleActionsClick(event:any) {
    this.idEmployee = event;
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.searchForm, control);
  }

  onPageChange(event: any): void {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      codeNameEmail: new FormControl('', [
        Validators.maxLength(255),
        emojiValidator,
      ]),
    });
    this.loadDisplay = true;
    this.employeeService.getEmployee(1, this.limit).subscribe((data: any) => {
      this.employeeList = data.response.data;
      this.loadDisplay = false;  
      this.total = data.response.total
    });
    this.warningDetect();
    this.searchForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  warningDetect(): void {
    this.handleSetWarning('codeNameEmail', 255);
  }

  handleSetWarning(type: string, length?: number): void {
    emojiWarning(this.searchForm, this, type);
    length && maxLengthWarning(this.searchForm, this, type, length);
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

  handleNavigateDetailEmployee(id:string): void {
    this.router.navigate(['employee', 'management', 'detail-employee', id]);
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}

confirm2() {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        }
    });
}
}
