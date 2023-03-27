import {
  Component,
  ElementRef,
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
  emojiWarning,
  maxLengthWarning,
  maxSizeFileWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { IWarningOtherInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-other-information',
  template: `
    <div class="otherInfo" formGroupName="otherInfo">
    <h3 class="title">{{'title.otherInfo' | translate}}</h3>
      <div class="form_item">
        <label for="description">
          <span>{{'createEmployee.generalDescription' | translate}}</span>
        </label>
        <textarea
          formControlName="description"
          id="description"
          [rows]="5"
          [cols]="30"
          pInputTextarea
          [autoResize]="true"
        ></textarea>
        <p
          *ngIf="
            getControl('description')?.dirty &&
            getControl('description')?.errors
          "
          class="warning"
        >
          <i class="bi bi-cone-striped"></i>{{ warning.description }}
        </p>
      </div>
      <div class="form_item">
        <label for="position">
          <span>{{'sidebar.workUnit' | translate}}</span>
          <span style="color: red;">*</span>
        </label>
        <p-dropdown
          formControlName="unit"
          [placeholder]="'common.select' | translate"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
        <p
          *ngIf="getControl('unit')?.dirty && getControl('unit')?.errors"
          class="warning"
        >
          <i class="bi bi-cone-striped"></i>{{ warning.unit }}
        </p>
      </div>
      <div class="form_item">
        <label for="time">
          <span>{{'sidebar.workPlace' | translate}}</span>
          <span style="color: red;">*</span>
        </label>
        <p-dropdown
          formControlName="position"
          [placeholder]="'common.select' | translate"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
        <p
          *ngIf="
            getControl('position')?.dirty && getControl('position')?.errors
          "
          class="warning"
        >
          <i class="bi bi-cone-striped"></i>{{ warning.position }}
        </p>
      </div>
      <div class="form_item">
        <label for="addresscurrent">
          <span>CV</span>
        </label>
        <p-fileUpload
          #cv
          (click)="handleResetCV()"
          mode="basic"
          (onSelect)="myUploader($event)"
          [chooseLabel]="'createEmployee.uploadCV' | translate"
        ></p-fileUpload>
        <p *ngIf="checkValidateSizeCV" class="warning">
          <i class="bi bi-cone-striped"></i>{{ warning.cv }}
        </p>
      </div>
      <div class="form_item">
        <label for="status">
          <span>{{'common.status' | translate}}</span>
          <span style="color: red;">*</span>
        </label>
        <p-dropdown
          formControlName="status"
          [placeholder]="'common.select' | translate"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
        <p
          *ngIf="getControl('status')?.dirty && getControl('status')?.errors"
          class="warning"
        >
          <i class="bi bi-cone-striped"></i>{{ warning.status }}
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class OtherInformationComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public cvSize = 2;
  public checkValidateSizeCV: boolean = false;
  @Input() employeeForm: FormGroup;
  @ViewChild('cv', { static: true }) cv: any;
  @Output() showAlert: EventEmitter<any> = new EventEmitter<any>();
  public warning: IWarningOtherInfo = {
    unit: '',
    position: '',
    status: '',
    description: '',
    cv: '',
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
      file?.type === 'image/jpeg' ||
      file?.type === 'image/jpg' ||
      file?.type === 'image/png'
    ) {
      return true;
    }
    return false;
  }

  myUploader(event: FileUpload) {
    if (this.checkTypeCV(event.files[0])) {
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
        detail: 'CV upload Error',
      });
    }
  }
  warningDetect(): void {
    this.handleSetWarning('unit', 'Đơn vị công tác');
    this.handleSetWarning('position', 'Vị trí công việc');
    this.handleSetWarning('status', 'Trạng thái');
    this.handleSetWarning('description', 'Mô tả chung', 500);
    this.handleSetWarning('cv', 'CV');
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
    const size = getControlCommon(this.employeeForm, 'otherInfo', 'cv')?.value
      .size;
    type === 'cv' && maxSizeFileWarning(size, this, type, label, this.cvSize);
  }
}
