import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import {
  emojiWarning,
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { IWarningBasicInfoDevice } from 'src/app/shared/interfaces';
import {
  StatusAsset,
  deviceStatusEn,
  deviceStatusVi,
} from '../../../device/data';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: [
    './basic-information.component.scss',
    '../create-device.component.scss',
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BasicInformationComponent {
  constructor(
    private deviceService: DeviceService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}
  public lang = {
    currency: 'USD',
    locale: 'en-US',
  };
  public deviceTypeList: any[] = [];
  public employeeList: any[] = [];
  public providerList: any[] = [];
  public statusList: any[] = [];
  @Input() deviceForm: FormGroup;
  @Input() deviceInfo: any;
  public warning: IWarningBasicInfoDevice = {
    code: null,
    name: null,
    type: null,
    provider: null,
    buyDate: null,
    billNumber: null,
    money: null,
    employee: null,
    status: null,
  };
  ngOnInit() {
    this.deviceService.deviceStore$.subscribe((data) => {
      this.deviceTypeList = data.type;
      this.employeeList = data.employee;
      this.providerList = data.provider;
      this.statusList = data.status;
    });

    this.warningDetect();
    this.deviceForm.get('basicInfo')?.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  ngOnChanges() {
    this.languageService.language$.subscribe((lang) => {
      switch (lang) {
        case 'en': {
          this.deviceForm.get('basicInfo.status')?.patchValue({
            value: deviceStatusEn[this.deviceInfo?.status - 1]?.value,
            key: this.deviceInfo?.status,
          });
          this.cdr.detectChanges();
          break;
        }
        case 'vi': {
          this.deviceForm.get('basicInfo.status')?.patchValue({
            value: deviceStatusVi[this.deviceInfo?.status - 1]?.value,
            key: this.deviceInfo?.status,
          });
          break;
        }
      }
    });
  }

  getControl(control: string): AbstractControl | null | undefined {
    return this.deviceForm.get('basicInfo')?.get(control);
  }

  warningDetect(): void {
    this.handleSetWarning('code', 100);
    this.handleSetWarning('name', 255);
    this.handleSetWarning('type');
    this.handleSetWarning('provider');
    this.handleSetWarning('buyDate', 255);
    this.handleSetWarning('billNumber', 255);
    this.handleSetWarning('money');
    this.handleSetWarning('employee');
    this.handleSetWarning('status');
  }

  handleSetWarning(type: keyof IWarningBasicInfoDevice, length?: number): void {
    requireWarning(this.deviceForm.get('basicInfo'), this, type);
    emojiWarning(this.deviceForm.get('basicInfo'), this, type);
    length &&
      maxLengthWarning(this.deviceForm.get('basicInfo'), this, type, length);
  }
}
