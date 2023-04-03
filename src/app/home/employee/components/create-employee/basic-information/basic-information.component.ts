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
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { IWarningBasicInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BasicInformationComponent {
  public sex = [{ value: 'Male' }, { value: 'FeMale' }];
  public url: any = '';
  public avtSize: number = 0.1;
  public warning: IWarningBasicInfo = {
    code: null,
    name: null,
    sex: null,
    birthDay: null,
    currentResidence: null,
    address: null,
    joinDate: null,
    hireDate: null,
    avt: null,
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

  showAlertFromBasicInfo(alert:any) {
    this.showAlert.emit(alert);
  }

  handleSetUrl(url:any) {
    this.url = url
  } 

  handleClickInputFile() {
    this.file.basicFileInput.nativeElement.click();
  }

  getControl(control: string): AbstractControl | null | undefined {
    return this.employeeForm.get('basicInfo')?.get(control);
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
  }
}
