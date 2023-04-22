import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import {
  AbstractControl,
  FormBuilder,
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
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { toast } from 'src/app/shared/toastMessage';
import { ModalService } from 'src/app/core/services/helper/modal.service';
import { ISex } from 'src/app/shared/interfaces';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
})
export class EmployeeManagementComponent {
  public sex: ISex[];
  public employeeList: any;
  public unitList: any[];
  public positionList: any[];
  public showCreateEmployee: boolean = false;
  public actions: any[];
  public searchForm: FormGroup;
  public warning: { codeNameEmail: any } = {
    codeNameEmail: null,
  };
  public employeeActive: any;
  public loadDisplay: boolean = false;
  public limit: number = 4;
  public total: number = 0;
  public page: number = 1;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private unitTreeService: UnitTreeService,
    private positionService: PositionService
  ) {
    this.sex = [{ value: 'Male' }, { value: 'FeMale' }];
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
          this.handleNavigateDetailEmployee(this.employeeActive.employee_id);
        },
      },
    ];
  }

  handleActionsClick(event: any) {
    this.employeeActive = event;
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.searchForm, control);
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.handleSendRequestGetEmployee();
  }

  ngOnInit() {
    this.getControl('position')?.disable();

    this.searchForm = this.fb.group({
      codeNameEmail: ['', [Validators.maxLength(255), emojiValidator]],
      sex: '',
      unit: '',
      position: '',
    });
    this.unitTreeService.getUnitTreeByUnitId();
    this.unitTreeService.unitTree$.subscribe((data: any) => {
      this.unitList = data;
    });
    this.handleGetEmployee();
    this.warningDetect();
    this.searchForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  handleGetEmployee(): void {
    this.loadDisplay = true;
    this.handleSendRequestGetEmployee().subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.employeeList = data?.response?.data;
          this.loadDisplay = false;
          this.total = data?.response?.total;
        }
      },
      () => {
        this.loadDisplay = false;
        this.employeeList = [];
      }
    );
  }

  handleSendRequestGetEmployee(): Observable<Object> {
    this.loadDisplay = true;
    return this.employeeService.getEmployee(
      this.page,
      this.limit,
      this.getControl('codeNameEmail')?.value,
      this.getControl('sex')?.value?.value?.toUpperCase() || '',
      this.getControl('unit')?.value.key || '',
      this.getControl('position')?.value.job_position_id || ''
    );
  }

  handleSearchEmployee(): void {
    if (this.searchForm.valid) {
      this.handleSendRequestGetEmployee();
    }
  }

  onSelectedChange(event: any) {
    event.node.key &&
      this.positionService
        .getPositionByUnitId(event.node.key)
        .subscribe((data: any) => {
          this.positionList = data.response.data;
          this.getControl('position')?.enable();
        });
  }

  handleResetSearchForm(): void {
    this.searchForm.setValue({
      codeNameEmail: '',
      sex: '',
      unit: '',
      position: '',
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
    this.router.navigate([
      'employee/management/update-employee',
      this.employeeActive.employee_id,
    ]);
  }

  delete() {
    this.modalService.confirmDetele(this.employeeActive.full_name, () => {
      this.loadDisplay = true;
      this.employeeService
        .deleteEmployeeById(this.employeeActive.employee_id)
        .subscribe(
          () => {
            this.toastService.toastSuccess(toast.deleteEmployeeSuccess);
          },
          () => {
            this.toastService.toastError(toast.deleteEmployeeFail);
          }
        );
      this.handleSendRequestGetEmployee();
    });
  }

  handleDisplayCreateEmployee(): void {
    this.showCreateEmployee = !this.showCreateEmployee;
    this.router.navigate(['employee/management/create-employee']);
  }

  handleNavigateDetailEmployee(id: string): void {
    this.router.navigate(['employee/management/detail-employee', id]);
  }
}
