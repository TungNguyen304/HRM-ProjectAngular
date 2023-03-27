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
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from 'primeng/fileupload';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import {
  emojiWarning,
  maxLengthWarning,
  maxSizeFileWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { IWarningBasicInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-basic-information',
  template: `
    <div formGroupName="basicInfo" class="main_info">
    <h3 class="title">{{'title.basicInformation' | translate}}</h3>
      <div>
        <div class="form_item">
          <label for="code">
            <span>{{'employeeManagement.employeeCode' | translate}}</span>
           <span style="color: red;">*</span>
          </label>
          <input
            formControlName="code"
            type="text"
            id="code"
            pInputText
          />
          <p
            *ngIf="getControl('code')?.dirty && getControl('code')?.errors"
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.code }}
          </p>
        </div>
        <div class="form_item">
          <label for="name">
            <span>{{'employeeManagement.fullName' | translate}}</span>
           <span style="color: red;">*</span>
          </label>
          <input
            formControlName="name"
            type="text"
            id="name"
            pInputText
          />
          <p
            *ngIf="getControl('name')?.dirty && getControl('name')?.errors"
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.name }}
          </p>
        </div>
        <div class="form_item">
          <label for="sex">
            <span>{{'employeeManagement.sex' | translate}}</span>
           <span style="color: red;">*</span>
          </label>
          <p-dropdown
            formControlName="sex"
            [placeholder]="'common.select' | translate"
            [options]="sex"
            optionLabel="value"
          ></p-dropdown>
          <p
            *ngIf="getControl('sex')?.dirty && getControl('sex')?.errors"
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.sex }}
          </p>
        </div>
        <div class="form_item">
          <label for="birthday">
            <span>{{'createEmployee.birthday' | translate}}</span>
           <span style="color: red;">*</span>
          </label>
          <p-calendar
            formControlName="birthDay"
            [showButtonBar]="true"
            dateFormat="dd.mm.yy"
          ></p-calendar>
          <p
            *ngIf="
              getControl('birthDay')?.dirty && getControl('birthDay')?.errors
            "
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.birthDay }}
          </p>
        </div>
        <div class="form_item">
          <label for="">
            <span>{{'createEmployee.currentResidence' | translate}}</span>
          </label>
          <input
            type="text"
            formControlName="currentResidence"
            pInputText
          />
          <p
            *ngIf="
              getControl('currentResidence')?.dirty &&
              getControl('currentResidence')?.errors
            "
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.currentResidence }}
          </p>
        </div>
        <div class="form_item">
          <label for="address">
            <span>{{'createEmployee.permanentAddress' | translate}}</span>
          </label>
          <input
            type="text"
            formControlName="address"
            pInputText
          />
          <p
            *ngIf="
              getControl('address')?.dirty && getControl('address')?.errors
            "
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.address }}
          </p>
        </div>
        <div class="form_item">
          <label for="joinDate">
            <span>{{'createEmployee.jobDate' | translate}}</span>
          </label>
          <p-calendar
            formControlName="joinDate"
            [showButtonBar]="true"
            dateFormat="dd.mm.yy"
          ></p-calendar>
          <p
            *ngIf="
              getControl('joinDate')?.dirty && getControl('joinDate')?.errors
            "
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.joinDate }}
          </p>
        </div>
        <div class="form_item">
          <label for="hireDate">
            <span>{{'createEmployee.dateOfHire' | translate}}</span>
          </label>
          <p-calendar
            formControlName="hireDate"
            [showButtonBar]="true"
            dateFormat="dd.mm.yy"
          ></p-calendar>
          <p
            *ngIf="
              getControl('hireDate')?.dirty && getControl('hireDate')?.errors
            "
            class="warning"
          >
            <i class="bi bi-cone-striped"></i>{{ warning.hireDate }}
          </p>
        </div>
        <div class="form_item">
          <label for="avt">
            <span>{{'createEmployee.image' | translate}}</span>
          </label>
          <div
            #avt
            class="avt"
            (click)="handleClickInputFile()"
            (dragover)="handleOnDragEnter($event)"
            (dragleave)="handleOnDragEnd()"
            (drop)="handleOnDrop($event)"
          >
            <div style="display: none;">
              <p-fileUpload
                #file
                type="file"
                showButtons="false"
                mode="basic"
                (onSelect)="handleOnDrop($event)"
              ></p-fileUpload>
            </div>
            <img
              [ngClass]="{ image: url ? true : false }"
              draggable="false"
              [src]="url || '../../../../../assets/images/plus-icon.png'"
              alt=""
            />
          </div>
          <p *ngIf="checkValidateSizeAvt" class="warning">
            <i class="bi bi-cone-striped"></i>{{ warning.avt }}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BasicInformationComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public url: any = '';
  public avtSize: number = 1;
  public checkValidateSizeAvt: boolean = false;
  public warning: IWarningBasicInfo = {
    code: '',
    name: '',
    sex: '',
    birthDay: '',
    currentResidence: '',
    address: '',
    joinDate: '',
    hireDate: '',
    avt: '',
  };

  @ViewChild('avt') drag: ElementRef;
  @ViewChild('file') file: FileUpload;
  @Input() employeeForm: FormGroup;
  @Output() showAlert = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.warningDetect();
    getControlCommon(this.employeeForm, 'basicInfo')?.valueChanges.subscribe(
      () => {
        this.warningDetect();
      }
    );
  }

  handleClickInputFile() {
    this.file.basicFileInput.nativeElement.click();
  }

  getControl(control: string): AbstractControl | null | undefined {
    return this.employeeForm.get('basicInfo')?.get(control);
  }

  handleOnDragEnter(event: any) {
    event.preventDefault();
    this.drag.nativeElement.style.border = '2px solid var(--primary-color-main)';
    this.drag.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  handleOnDragEnd() {
    if (this.url) {
      this.drag.nativeElement.style.border = '2px solid transparent';
    } else {
      this.drag.nativeElement.style.border = '2px dashed black';
    }
    this.drag.nativeElement.style.backgroundColor = 'unset';
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  checkTypeImage(file: File | undefined): boolean {
    if (
      file?.type === 'image/jpeg' ||
      file?.type === 'image/jpg' ||
      file?.type === 'image/png'
    ) {
      return true;  
    }
    return false;
  }

  handleOnDrop(event: any) {
    console.log(event.files[0]);
    
    if (this.checkTypeImage(event.dataTransfer?.files[0]) || (event.files && this.checkTypeImage(event.files[0]))) {
      if (event instanceof DragEvent) {
        event.preventDefault();
        getControlCommon(this.employeeForm, 'basicInfo', 'avt')?.setValue(
          event.dataTransfer?.files[0]
        );
        this.url = this.sanitize(
          URL.createObjectURL(event.dataTransfer?.files[0] as Blob)
        );
      } else {
        if (this.checkTypeImage(event.files[0])) {
          getControlCommon(this.employeeForm, 'basicInfo', 'avt')?.setValue(
            event.files[0]
          );
          this.url = this.sanitize(
            event.files[0].objectURL.changingThisBreaksApplicationSecurity
          );
        }
      }
      this.showAlert.emit({
        severity: 'success',
        summary: 'Success',
        detail: 'Tải ảnh lên thành công',
      });
      this.drag.nativeElement.style.border = '2px solid black';
    } else {
      if (event instanceof DragEvent) {
        event.preventDefault();
      }
      this.showAlert.emit({
        severity: 'error',
        summary: 'Fail',
        detail: 'Loại File phải là ảnh jpg hoặc png',
      });
      this.handleOnDragEnd();
    }
    this.file.clear();
  }

  warningDetect(): void {
    this.handleSetWarning('code', 'Mã NV', 100);
    this.handleSetWarning('name', 'Họ Tên', 255);
    this.handleSetWarning('sex', 'Giới tính');
    this.handleSetWarning('birthDay', 'Ngày sinh');
    this.handleSetWarning('currentResidence', 'Nơi ở hiện tại', 255);
    this.handleSetWarning('address', 'Địa chỉ thường trú', 255);
    this.handleSetWarning('joinDate', 'Ngày nhận việc');
    this.handleSetWarning('hireDate', 'Ngày được  thuê');
    this.handleSetWarning('avt', 'Ảnh');
    this.checkValidateSizeAvt =
      Number(
        (
          getControlCommon(this.employeeForm, 'basicInfo', 'avt')?.value.size /
          (1024 * 1024)
        ).toFixed(2)
      ) > this.avtSize;
  }

  handleSetWarning(
    type: keyof IWarningBasicInfo,
    label: string,
    length?: number
  ): void {
    requireWarning(this.employeeForm.get('basicInfo'), this, type, label);
    emojiWarning(this.employeeForm.get('basicInfo'), this, type, label);
    length &&
      maxLengthWarning(
        this.employeeForm.get('basicInfo'),
        this,
        type,
        label,
        length
      );
    const size = getControlCommon(this.employeeForm, 'basicInfo', 'avt')?.value
      .size;
    type === 'avt' && maxSizeFileWarning(size, this, type, label, this.avtSize);
  }
}
