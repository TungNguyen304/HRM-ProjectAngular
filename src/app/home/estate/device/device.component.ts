import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, switchMap } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import {
  emojiWarning,
  maxLengthWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { IWarningDeviceSearch } from 'src/app/shared/interfaces';
import { deviceStatusEn, deviceStatusVi } from './data';
import { EstateService } from 'src/app/core/services/helper/estate.service';
import { StatusAsset } from './data';
import { ModalService } from 'src/app/core/services/helper/modal.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { toast } from 'src/app/shared/toastMessage';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [MessageService],
})
export class DeviceComponent {
  public status: any = [];
  public typeDevice: any = [];
  public deviceList: any;
  public searchDeviceForm: FormGroup;
  public actions: any;
  public loadDisplay: boolean = false;
  public total: number = 0;
  public limit: number = 4;
  public pageCurrent: number = 1;
  public deviceTemp: any;
  public warning: IWarningDeviceSearch = {
    code: null,
    employee: null,
  };
  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private modalService: ModalService,
    private estateService: EstateService,
    private toastService: ToastService
  ) {
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
          this.handleNavigateDetailDevice(this.deviceTemp.asset_id);
        },
      },
      {
        label: 'QR',
        icon: 'bi bi-qr-code-scan',
        command: () => {},
      },
    ];
  }

  handleActionsClick(device: any) {
    this.deviceTemp = device;
  }

  handleGetStatusFormId(id: number) {
    return this.status[id - 1].value;
  }

  onPageChange(event: any): void {
    if (event.page + 1 !== this.pageCurrent) {
      this.pageCurrent = event.page + 1;
      this.loadDisplay = true;
      this.handleSendRuest(this.pageCurrent);
    }
  }

  handleSendRuest(page: number) {
    this.deviceService.getDevice(page, this.limit);
  }

  getValueSearch(): Array<string> {
    return Object.values(this.searchDeviceForm.value);
  }

  update() {
    this.router.navigate([
      'estate/device/update-device',
      this.deviceTemp.asset_id,
    ]);
  }

  delete() {
    this.modalService.confirmDetele(this.deviceTemp.asset_name, () => {
      this.loadDisplay = true;
      this.deviceService.deleteDevice(this.deviceTemp.asset_id).subscribe(
        () => {
          this.toastService.toastSuccess(toast.deleteEmployeeSuccess);
        },
        () => {
          this.toastService.toastError(toast.deleteEmployeeFail);
        }
      );
      this.handleGetDevice();
    });
  }

  handleDisplayCreateDevice(): void {
    this.router.navigate(['estate/device/create-device']);
  }

  handleNavigateDetailDevice(id: string): void {
    this.router.navigate(['estate/device/detail-device', id]);
  }

  warningDetect(): void {
    this.handleSetWarning('code', 255);
    this.handleSetWarning('employee', 255);
  }

  handleSetWarning(type: keyof IWarningDeviceSearch, length?: number): void {
    emojiWarning(this.searchDeviceForm, this, type);
    length && maxLengthWarning(this.searchDeviceForm, this, type, length);
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.searchDeviceForm, control);
  }

  onSubmit(): void {
    console.log(...Object.values(this.searchDeviceForm.value));
  }

  handleGetDevice(): Observable<Object> {
    return this.deviceService.getDevice(this.pageCurrent, this.limit);
  }

  ngOnInit() {
    this.loadDisplay = true;
    this.handleGetDevice().subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          console.log(data.response.data);

          this.deviceList = data.response.data;
          this.total = data.response.total;
          this.loadDisplay = false;
        }
      },
      () => {
        this.loadDisplay = false;
      }
    );

    this.deviceService.getDeviceType().subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.typeDevice = data.response;
      }
    });

    this.searchDeviceForm = this.fb.group({
      code: ['', [Validators.maxLength(255), emojiValidator]],
      employee: ['', [Validators.maxLength(255), emojiValidator]],
      type: [''],
      status: [''],
    });

    this.languageService.language$.subscribe((data) => {
      switch (data) {
        case 'en': {
          this.status = deviceStatusEn;
          break;
        }
        case 'vi': {
          this.status = deviceStatusVi;
          break;
        }
      }
      this.estateService.handleSetValueForDeviceStore('status', this.status);
    });

    this.warningDetect();
    this.searchDeviceForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }
}
