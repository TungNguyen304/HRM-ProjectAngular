import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
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
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import {
  IData,
  IHandle,
} from 'src/app/shared/directives/drag-drop-avt.directive';
import { ISex, IWarningBasicInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BasicInformationComponent implements OnInit {
  public sex: ISex[];
  public url: string = '';
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

  public dataForDirective: IData;

  public handleInDirective: IHandle;

  @ViewChild('avt') drag: ElementRef;
  @ViewChild('file', { static: true }) file: FileUpload;
  @Input() employeeForm: FormGroup;
  @Input() urlUpdate: string;
  constructor() {}

  ngOnInit() {
    this.sex = [{ value: 'Male' }, { value: 'FeMale' }];
    this.handleInDirective = {
      form: this.employeeForm,
      controls: ['basicInfo', 'avt'],
      inputFileElement: this.file,
    };
    this.warningDetect();
    getControlCommon(this.employeeForm, 'basicInfo')?.valueChanges.subscribe(
      () => {
        this.warningDetect();
      }
    );
  }

  ngOnChanges() {
    if (this.urlUpdate) this.url = this.urlUpdate;
    this.dataForDirective = {
      url: this.url,
      size: this.avtSize,
    };
  }

  handleSetUrl(url: any) {
    this.url = url;
  }

  handleClickInputFile() {
    this.file.basicFileInput.nativeElement.click();
  }

  getControl(control: string): AbstractControl | null | undefined {
    return this.employeeForm.get('basicInfo')?.get(control);
  }

  warningDetect(): void {
    this.handleSetWarning('code', 100);
    this.handleSetWarning('name', 255);
    this.handleSetWarning('sex');
    this.handleSetWarning('birthDay');
    this.handleSetWarning('currentResidence', 255);
    this.handleSetWarning('address', 255);
    this.handleSetWarning('joinDate');
    this.handleSetWarning('hireDate');
  }

  handleSetWarning(type: keyof IWarningBasicInfo, length?: number): void {
    requireWarning(this.employeeForm.get('basicInfo'), this, type);
    emojiWarning(this.employeeForm.get('basicInfo'), this, type);
    length &&
      maxLengthWarning(this.employeeForm.get('basicInfo'), this, type, length);
  }
}
