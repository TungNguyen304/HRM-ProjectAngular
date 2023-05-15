import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import {
  AbstractControl,
  FormBuilder,
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
import { ModalService } from 'src/app/core/services/helper/modal.service';
import {
  IEmployeeResponse,
  IPosition,
  ISex,
  IUnit,
} from 'src/app/shared/interfaces';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { Observable, finalize, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';
import { DestroyDirective } from 'src/app/shared/directives/destroy.directive';
import {
  IFilter,
  PageService,
} from 'src/app/core/services/helper/page.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss'],
})
export class EmployeeManagementComponent
  extends DestroyDirective
  implements OnInit
{
  public sex: ISex[];
  public employeeList: IEmployeeResponse[];
  public unitList: IUnit[];
  public toast: any;
  public positionList: IPosition[];
  public showCreateEmployee = false;
  public actions: any[];
  public searchForm: FormGroup;
  public warning: { codeNameEmail: any } = {
    codeNameEmail: null,
  };
  public employeeActive: IEmployeeResponse;
  public loadDisplay = false;
  public limit = 4;
  public total = 0;
  public page = 1;
  public dataOnUrl: any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private unitTreeService: UnitTreeService,
    private positionService: PositionService,
    private loadingService: LoadingService,
    private exportFileService: ExportFileService,
    private toasMsgService: ToastMsgService,
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private commonService: CommonService
  ) {
    super();
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

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params) {
        this.dataOnUrl = params;
      }
      if (params.page) {
        this.page = params.page;
      }
    });

    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });

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
      this.unitTreeService.getUnitById(data, this.dataOnUrl?.unit);
      this.onSelectedChange({
        node: {
          key: this.dataOnUrl?.unit,
        },
      });
      this.searchForm.patchValue(
        this.commonService.transformDataSearchOnUrl(
          this.dataOnUrl,
          this.unitTreeService.unitById
        )
      );
      this.handleSendRequestGetEmployee();
    });
    this.handleGetEmployee();
    this.warningDetect();
    this.searchForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  handleActionsClick(employee: IEmployeeResponse) {
    this.employeeActive = employee;
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.searchForm, control);
  }

  saveUrl() {
    this.pageService.saveUrl(
      'employee/management',
      this.page,
      '',
      this.getValueSearch()
    );
  }

  onPageChange(event: any): void {
    this.page = event.page + 1;
    this.saveUrl();
    this.handleSendRequestGetEmployee();
  }

  handleGetEmployee(): void {
    this.loadDisplay = true;
    this.handleSendRequestGetEmployee()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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

  handleSendRequestGetEmployee(): Observable<object> {
    this.loadDisplay = true;
    return this.employeeService.getEmployee(
      this.page,
      this.limit,
      this.getControl('codeNameEmail')?.value,
      this.getControl('sex')?.value?.value?.toUpperCase() || '',
      this.getControl('unit')?.value.key || '',
      this.getControl('position')?.value || ''
    );
  }

  handleSearchEmployee(): void {
    if (this.searchForm.valid) {
      this.handleSendRequestGetEmployee();
      this.saveUrl();
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
            this.toastService.toastSuccess(this.toast.deleteEmployeeSuccess);
          },
          () => {
            this.toastService.toastError(this.toast.deleteEmployeeFail);
          }
        );
      this.handleSendRequestGetEmployee();
    });
  }

  exportFile() {
    this.loadingService.setloading(true);
    this.employeeService
      .getAllStaff()
      .pipe(
        finalize(() => {
          this.loadingService.setloading(false);
        })
      )
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.exportFileService.exportAsExcelFile(
            data.response.data,
            'Employee List'
          );
        }
      });
  }

  getValueSearch(): IFilter {
    return {
      keyword: this.searchForm.value.codeNameEmail,
      position: this.searchForm.value.position,
      gender: this.searchForm.value.sex.value,
      unit: this.searchForm.value.unit.key,
    };
  }

  handleDisplayCreateEmployee(): void {
    this.showCreateEmployee = !this.showCreateEmployee;
    this.router.navigate(['employee/management/create-employee']);
  }

  handleNavigateDetailEmployee(id: string): void {
    this.router.navigate(['employee/management/detail-employee', id]);
  }
}
