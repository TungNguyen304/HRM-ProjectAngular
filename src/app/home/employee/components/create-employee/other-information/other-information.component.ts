import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { CommonService } from 'src/app/core/services/common.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import {
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import {
  IPosition,
  IStatus,
  IUnit,
  IWarningOtherInfo,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-other-information',
  templateUrl: `./other-information.component.html`,
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class OtherInformationComponent implements OnInit {
  constructor(
    private unitTreeService: UnitTreeService,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private toastService: ToastService,
    private commonService: CommonService,
    private toasMsgService: ToastMsgService
  ) {}
  public statusList: IStatus[];
  public cvSize = 2;
  public unitList: IUnit[];
  public unitId: string;
  @Input() employeeForm: FormGroup;
  public positionList: IPosition[];
  public toast: any;
  @ViewChild('cv', { static: true }) cv: any;
  public warning: IWarningOtherInfo = {
    unit: null,
    position: null,
    status: null,
    description: null,
    cv: null,
  };

  ngOnInit() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.unitTreeService.unitTree$.subscribe((data: any) => {
      this.unitList = data;
    });
    getControlCommon(this.employeeForm, 'otherInfo', 'position')?.disable();

    this.employeeService.getStatus().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.statusList = data.response.data.map((status: any) => ({
          employee_status_id: status.employee_status_id,
          employee_status_name: status.employee_status_name,
        }));
      }
    });

    this.warningDetect();

    getControlCommon(this.employeeForm, 'otherInfo')?.valueChanges.subscribe(
      () => {
        this.warningDetect();
      }
    );
  }

  ngAfterViewInit() {
    this.employeeForm.get('otherInfo.unit')?.valueChanges.subscribe(() => {
      const unitIdTemp = getControlCommon(
        this.employeeForm,
        'otherInfo',
        'unit'
      )?.value?.key;
      this.onSelectedChange({ node: { key: unitIdTemp } });
      this.warningDetect();
    });
  }

  handleResetCV(): void {
    if (this.cv._files.length > 0) {
      this.cv.clear();
      setTimeout(() => {
        this.cv.basicFileInput.nativeElement.click();
      });
    }
  }

  onSelectedChange(event: any): void {
    if (event.node.key !== this.unitId) {
      this.unitId = event.node.key;
      const subcribtion = this.positionService
        .getPositionByUnitId(event.node.key)
        .subscribe(
          (data: any) => {
            if (data.statusCode === 200) {
              this.positionList = data.response.data.map((position: any) => ({
                job_position_id: position.job_position_id,
                job_position_name: position.job_position_name,
                job_position_code: position.job_position_code,
                job_position_code_name: position.job_position_code_name,
              }));
              getControlCommon(
                this.employeeForm,
                'otherInfo',
                'position'
              )?.enable();
            }
            subcribtion.unsubscribe();
          },
          (err) => {
            console.log(err);
            subcribtion.unsubscribe();
          }
        );
    }
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.employeeForm, 'otherInfo', control);
  }

  myUploader(event: FileUpload) {
    if (this.commonService.checkTypeCV(event.files[0], 'application/pdf')) {
      if (this.commonService.checkSizeCV(event.files[0], this.cvSize)) {
        this.employeeForm.get('otherInfo')?.get('cv')?.setValue(event.files[0]);
        this.toastService.toastSuccess(this.toast.uploadCvSuccess);
      } else {
        this.cv.clear();
        this.toastService.toastError(this.toast.uploadCvSizeFail, this.cvSize);
      }
    } else {
      this.cv.clear();
      this.toastService.toastError(this.toast.uploadCvTypeFail);
    }
  }
  warningDetect(): void {
    this.handleSetWarning('unit');
    this.handleSetWarning('position');
    this.handleSetWarning('status');
    this.handleSetWarning('description', 500);
  }

  handleSetWarning(type: keyof IWarningOtherInfo, length?: number): void {
    requireWarning(this.employeeForm.get('otherInfo'), this, type);
    length &&
      maxLengthWarning(this.employeeForm.get('otherInfo'), this, type, length);
  }
}
