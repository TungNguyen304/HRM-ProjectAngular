import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import {
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { IWarningOtherInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-other-information',
  templateUrl: `./other-information.component.html`,
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class OtherInformationComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public cvSize = 2;
  @Input() employeeForm: FormGroup;
  @ViewChild('cv', { static: true }) cv: any;
  @Output() showAlert: EventEmitter<any> = new EventEmitter<any>();
  public warning: IWarningOtherInfo = {
    unit: null,
    position: null,
    status: null,
    description: null,
    cv: null,
  };

  ngOnInit() {
    this.warningDetect();
    getControlCommon(this.employeeForm, 'otherInfo')?.valueChanges.subscribe(
      () => {
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

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.employeeForm, 'otherInfo', control);
  }

  checkTypeCV(file: File | undefined): boolean {
    if (
      file?.type === 'application/pdf'
    ) {
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
        this.showAlert.emit({
          severity: 'success',
          summary: 'Upload Success',
          detail: 'CV upload success',
        });
      } else {
        this.cv.clear();
        this.showAlert.emit({
          severity: 'error',
          summary: 'Upload Fail',
          detail: `The size of the CV should not be more than ${this.cvSize}mb`,
        });
      }
    } else {
      this.cv.clear();
      this.showAlert.emit({
        severity: 'error',
        summary: 'Upload Fail',
        detail: 'CV must be a pdf file',
      });
    }
  }
  warningDetect(): void {
    this.handleSetWarning('unit', 'Đơn vị công tác');
    this.handleSetWarning('position', 'Vị trí công việc');
    this.handleSetWarning('status', 'Trạng thái');
    this.handleSetWarning('description', 'Mô tả chung', 500);
  }

  handleSetWarning(
    type: keyof IWarningOtherInfo,
    label: string,
    length?: number
  ): void {
    requireWarning(this.employeeForm.get('otherInfo'), this, type, label);
    length &&
      maxLengthWarning(
        this.employeeForm.get('otherInfo'),
        this,
        type,
        label,
        length
      );
  }
}
