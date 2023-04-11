import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import {
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import {
  IPosition,
  IStatus,
  IUnit,
  IWarningOtherInfo,
} from 'src/app/shared/interfaces';
import { toast } from 'src/app/shared/toastMessage';

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
    private toastService: ToastService
  ) {}
  public statusList: IStatus[];
  public cvSize = 2;
  public unitList: IUnit[];
  public unitId: string;
  @Input() employeeForm: FormGroup;
  public positionList: IPosition[];
  @ViewChild('cv', { static: true }) cv: any;
  public warning: IWarningOtherInfo = {
    unit: null,
    position: null,
    status: null,
    description: null,
    cv: null,
  };

  ngOnInit() {
    this.unitTreeService.unitTree$.subscribe((data: any) => {
      this.unitList = data;
    });
    getControlCommon(this.employeeForm, 'otherInfo', 'position')?.disable();

    this.employeeService.getStatus().subscribe((data: any) => {
      this.statusList = data.response.data.map((status: any) => ({
        employee_status_id: status.employee_status_id,
        employee_status_name: status.employee_status_name,
      }));
    });

    this.warningDetect();

    getControlCommon(this.employeeForm, 'otherInfo')?.valueChanges.subscribe(
      () => {
        this.warningDetect();
      }
    );
  }

  ngAfterViewInit() {
    getControlCommon(this.employeeForm, 'otherInfo')?.valueChanges.subscribe(
      () => {
        const unitIdTemp = getControlCommon(
          this.employeeForm,
          'otherInfo',
          'unit'
        )?.value?.key;
        this.onSelectedChange({ node: { key: unitIdTemp } });
        this.warningDetect();
      }
    );
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
      this.positionService
        .getPositionByUnitId(event.node.key)
        .subscribe((data: any) => {
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
        });
    }
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.employeeForm, 'otherInfo', control);
  }

  checkTypeCV(file: File | undefined): boolean {
    if (file?.type === 'application/pdf') {
      return true;
    }
    return false;
  }

  checkSizeCV(file: File | undefined): boolean {
    if (
      file?.size &&
      Number((file?.size / (1024 * 1024)).toFixed(2)) < this.cvSize
    ) {
      return true;
    }
    return false;
  }

  myUploader(event: FileUpload) {
    if (this.checkTypeCV(event.files[0])) {
      if (this.checkSizeCV(event.files[0])) {
        this.employeeForm.get('otherInfo')?.get('cv')?.setValue(event.files[0]);
        this.toastService.toastSuccess(
          toast.uploadCvSuccess.summary,
          toast.uploadCvSuccess.detail
        );
      } else {
        this.cv.clear();
        this.toastService.toastError(
          toast.uploadCvSizeFail.summary,
          (toast.uploadCvSizeFail.detail as Function)(this.cvSize)
        );
      }
    } else {
      this.cv.clear();
      this.toastService.toastError(
        toast.uploadCvTypeFail.summary,
        toast.uploadCvTypeFail.detail
      );
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
