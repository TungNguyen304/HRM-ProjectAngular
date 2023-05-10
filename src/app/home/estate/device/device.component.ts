import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, combineLatest, finalize } from 'rxjs';
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
import { ModalService } from 'src/app/core/services/helper/modal.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { handleDownQrCode } from 'src/app/core/services/helper/qrcode.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [MessageService],
})
export class DeviceComponent implements OnInit {
  public status: any = [];
  public typeDevice: any = [];
  public deviceList: any;
  public searchDeviceForm: FormGroup;
  public actions: any;
  public loadDisplay = false;
  public total = 0;
  public limit = 4;
  public page = 1;
  public deviceTemp: any;
  public toast: any;
  public warning: IWarningDeviceSearch = {
    code: null,
    employee: null,
  };
  public displayQr: boolean = false;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public url: string;
  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private modalService: ModalService,
    private estateService: EstateService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private exportFileService: ExportFileService,
    private providerService: ProviderService,
    private toasMsgService: ToastMsgService,
    private activatedRoute: ActivatedRoute
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
        command: () => {
          this.displayQr = !this.displayQr;
        },
      },
    ];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.page = params.id;
      }
    });
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.loadDisplay = true;
    combineLatest({
      device: this.handleGetDevice(),
      type: this.deviceService.getDeviceType(),
      provider: this.providerService.getAllProvider(),
    }).subscribe(
      (res: any) => {
        if (res.type.statusCode === 200) {
          this.typeDevice = res.type.response;
        }
        if (res.provider.statusCode === 200 && res.device.statusCode === 200) {
          this.deviceList = this.handleGetProviderByDevice(
            res.device.response.data,
            res.provider.response.data
          );
          this.total = res.device.response.total;
        }
        this.loadDisplay = false;
      },
      () => {
        this.loadDisplay = false;
      }
    );

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

  handleActionsClick(device: any) {
    this.deviceTemp = device;
    this.url = `${window.location.origin}/detail-device/${
      device.asset_id
    }/${localStorage.getItem('token')}`;
  }

  handleGetStatusFormId(id: number) {
    return this.status[id - 1].value;
  }

  setQrCode(val: boolean) {
    this.displayQr = val;
  }

  onPageChange(event: any): void {
    if (event.page + 1 !== this.page) {
      this.router.navigateByUrl(`estate/device/${event.page + 1}`);
      this.page = event.page + 1;
      this.loadDisplay = true;
      this.handleSendRuest(this.page);
    }
  }

  handleSendRuest(page: number) {
    this.deviceService.getDevice(page, this.limit);
  }

  downQrCode() {
    handleDownQrCode();
    this.displayQr = false;
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
          this.toastService.toastSuccess(this.toast.deleteEmployeeSuccess);
        },
        () => {
          this.toastService.toastError(this.toast.deleteEmployeeFail);
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

  handleGetDevice(): Observable<object> {
    return this.deviceService.getDevice(this.page, this.limit);
  }

  exportFile() {
    this.loadingService.setloading(true);
    this.deviceService
      .getAllDevice()
      .pipe(
        finalize(() => {
          this.loadingService.setloading(false);
        })
      )
      .subscribe((data: any) => {
        if (data.statusCode === 200) {
          this.exportFileService.exportAsExcelFile(
            data.response.data,
            'Device List'
          );
        }
      });
  }

  handleGetProviderByDevice(deviceList: any[], providerList: any[]) {
    return deviceList.map((device) => {
      const provider = providerList.find((provider: any) => {
        return provider.distributor_id === device.distributor_id;
      });
      return { ...device, distributor_name: provider?.name || '' };
    });
  }

  handleSearchDevice(): void {
    if (this.searchDeviceForm.valid) {
      this.loadDisplay = true;
      this.deviceService.getDevice(
        1,
        this.limit,
        this.getControl('code')?.value,
        this.getControl('employee')?.value,
        this.getControl('type')?.value?.asset_type_id || '',
        this.getControl('status')?.value.key || 0
      );
    }
  }

  handleResetSearchForm(): void {
    this.searchDeviceForm.setValue({
      code: '',
      employee: '',
      type: '',
      status: '',
    });
  }
}
