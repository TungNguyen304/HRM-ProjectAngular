import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/services/common.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import { emojiWarning, maxLengthWarning } from 'src/app/core/services/helper/warningForm.service';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { IWarningDeviceSearch } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
  providers: [MessageService],
})
export class DeviceComponent {
  public status = [{ value: 'On' }, { value: 'Off' }];
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public deviceList: any;
  public searchDeviceForm: FormGroup;
  public actions: any;
  public idDeviceTemp: number
  public warning: IWarningDeviceSearch = {
    code: '',
    name: '',
    employee: '',
  };
  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private fb: FormBuilder,
    private commonService:CommonService,
    private messageService: MessageService
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
      { label: 'Detail', icon: 'bi bi-card-text',command: () => {
        this.handleNavigateDetailDevice(this.idDeviceTemp);
      },},
    ];
  }

  handleActionsClick(id:number) {
    this.idDeviceTemp = id    
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Deleted',
    });
  }
  handleDisplayCreateDevice(): void {
    this.router.navigate(['estate', 'device', 'create-device']);
  }

  handleNavigateDetailDevice(id: number): void {
    this.router.navigate(['estate', 'device', 'detail-device', id]);
  }

  warningDetect(): void {
    this.handleSetWarning('code', 'Mã tài sản', 255);
    this.handleSetWarning('name', 'Tên tài sản', 255);
    this.handleSetWarning('employee', 'Nhân viên sử dụng', 255);
  }

  handleSetWarning(type: keyof IWarningDeviceSearch, label: string, length?:number): void {
    emojiWarning(this.searchDeviceForm, this, type, label);
    length && maxLengthWarning(this.searchDeviceForm, this, type, label, length);
  }

  getControl(control:string):AbstractControl|null {
    return getControlCommon(this.searchDeviceForm, control);
  }

  onSubmit():void {
    console.log(this.searchDeviceForm);
  }

  ngOnInit() {
    this.deviceService.getDevice().subscribe((data) => {
      this.deviceList = data;
    });

    this.searchDeviceForm = this.fb.group({
      code: ['', [Validators.maxLength(255), emojiValidator]],
      name: ['', [Validators.maxLength(255), emojiValidator]],
      employee: ['', [Validators.maxLength(255), emojiValidator]],
      type: [''],
      status: [''],
    });

    this.warningDetect();
    this.searchDeviceForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }
}
