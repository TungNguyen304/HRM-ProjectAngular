import { Location } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Observable,
  catchError,
  combineLatest,
  concatMap,
  finalize,
  forkJoin,
  map,
  mergeMap,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { EstateService } from 'src/app/core/services/helper/estate.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { EmployeeService } from 'src/app/core/services/http/employee.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { StatusAsset, deviceStatusEn, deviceStatusVi } from '../../device/data';
import { CommonService } from 'src/app/core/services/common.service';
import { IAssetHistory, typeAction } from 'src/app/shared/interfaces';
import { DateService } from 'src/app/core/services/helper/date.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { toast } from 'src/app/shared/toastMessage';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss'],
})
export class CreateDeviceComponent {
  public deviceForm: FormGroup;
  public deviceInfo: any;
  public providerList: any;
  public typeAction: typeAction = this.router.url.includes('update-device')
    ? 'update'
    : 'add';

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private deviceService: DeviceService,
    private providerService: ProviderService,
    private employeeService: EmployeeService,
    private estateService: EstateService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService,
    private dateService: DateService,
    private router: Router,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit(): void {
    this.commonService.markAsDirty(this.deviceForm);
    if (this.deviceForm.valid) {
      const data = {
        asset_type_id: this.deviceForm.value?.basicInfo?.type?.asset_type_id,
        asset_code: this.deviceForm.value?.basicInfo?.code,
        asset_name: this.deviceForm.value?.basicInfo?.name,
        distributor_id:
          this.deviceForm.value?.basicInfo?.provider?.distributor_id,
        date_bought: this.dateService.handleConvertDateToIOString(
          this.deviceForm.value?.basicInfo?.buyDate
        ),
        bill_number: this.deviceForm.value?.basicInfo?.billNumber,
        total_amount: String(
          this.commonService.convertVNDtoUSD(
            this.deviceForm.value?.basicInfo?.money
          )
        ),
        user_used_id:
          this.deviceForm.value?.basicInfo?.employee?.employee_id || '',
        status: String(this.deviceForm.value?.basicInfo?.status?.key),
        user_using_id:
          this.deviceForm.value?.employeeInfo?.email?.employee_id || '',
        date_use: this.dateService.handleConvertDateToIOString(
          this.deviceForm.value?.employeeInfo?.useDate
        ),
        update_asset_histories: this.handleGetDataRepairInfo(),
      };
      this.loadingService.setloading(true);
      this.deviceService
        .addDevice(data)
        .pipe(
          finalize(() => {
            this.loadingService.setloading(false);
          })
        )
        .subscribe(
          (data: any) => {
            if (data.statusCode === 200) {
              this.router.navigate(['estate/device']);
              this.toastService.toastSuccess(
                toast.deviceSuccess,
                this.typeAction
              );
            }
          },
          () => {
            this.toastService.toastError(toast.deviceFail, this.typeAction);
          }
        );
    }
  }

  handleBack(): void {
    this.location.back();
  }

  handleGetDataRepairInfo(): IAssetHistory[] {
    return this.deviceForm.value.repairInfo?.map((item: any) => {
      return {
        date_updated: this.dateService.handleConvertDateToIOString(
          item.repairDate
        ),
        content_updated: item.content,
        total_amount: String(this.commonService.convertVNDtoUSD(item.money)),
      };
    });
  }

  patchValueForForm(deviceInfo: any) {
    const newData = {
      basicInfo: {
        code: deviceInfo.asset_code,
        name: deviceInfo.asset_name,
        provider: this.estateService.handleGetValueProvider(
          this.providerList,
          deviceInfo.distributor_id
        ),
        type: deviceInfo.asset_type_collection,
        buyDate: this.commonService.convertDateVi(deviceInfo.date_bought),
        billNumber: deviceInfo.bill_number,
        money: this.commonService.convertUSDtoVND(deviceInfo.total_amount),
        employee: deviceInfo.user_used_collection,
      },
      employeeInfo: {
        email: deviceInfo.user_using_collection,
        useDate: this.commonService.convertDateVi(deviceInfo.date_use),
      },
    };
    this.deviceForm.patchValue(newData);
  }

  handleTransformDataRepair(data: any) {}

  ngOnInit() {
    this.deviceForm = this.fb.group({
      basicInfo: this.fb.group({
        code: [
          '',
          [Validators.required, Validators.maxLength(100), emojiValidator],
        ],
        name: [
          '',
          [Validators.required, Validators.maxLength(255), emojiValidator],
        ],
        provider: ['', [Validators.required]],
        type: ['', [Validators.required]],
        buyDate: [''],
        billNumber: [
          '',
          [Validators.required, Validators.maxLength(100), emojiValidator],
        ],
        money: ['', [Validators.maxLength(10)]],
        employee: [''],
        status: [''],
      }),
      repairInfo: this.fb.array([]),
      employeeInfo: this.fb.group({
        email: [''],
        useDate: [''],
      }),
    });

    setTimeout(() => {
      this.loadingService.setloading(true);
    });
    const subcription = combineLatest({
      provider: this.providerService.getProvider(),
      employee: this.employeeService.getEmployee(),
      lang: this.languageService.language$,
      type: this.deviceService.getDeviceType(),
      params: this.activatedRoute.params,
    })
      .pipe(
        switchMap((data: any) => {
          Object.keys(data).forEach((item) => {
            if (!data[item].statusCode || data[item].statusCode === 200) {
              switch (item) {
                case 'lang': {
                  switch (data[item]) {
                    case 'en': {
                      this.estateService.handleSetValueForDeviceStore(
                        'status',
                        deviceStatusEn
                      );
                      this.cdr.detectChanges();
                      break;
                    }
                    case 'vi': {
                      this.estateService.handleSetValueForDeviceStore(
                        'status',
                        deviceStatusVi
                      );
                      this.cdr.detectChanges();
                      break;
                    }
                  }
                  break;
                }
                case 'provider': {
                  this.providerList = data[item].response.data;
                  this.estateService.handleSetValueForDeviceStore(
                    item,
                    data[item].response.data
                  );
                  break;
                }
                case 'employee': {
                  this.estateService.handleSetValueForDeviceStore(
                    item,
                    data[item].response.data?.map((item: any) => {
                      return {
                        employee_id: item.employee_id,
                        email: item.email,
                      };
                    })
                  );
                  break;
                }
                case 'type': {
                  this.estateService.handleSetValueForDeviceStore(
                    item,
                    data[item].response?.map((item: any) => {
                      return {
                        asset_type_id: item.asset_type_id,
                        asset_type_name: item.asset_type_name,
                      };
                    })
                  );
                  break;
                }
                default:
                  break;
              }
            }
          });
          if (data?.params?.id) {
            return this.deviceService.getDeviceById(data.params.id);
          }
          return of({});
        }),
        catchError((err) => {
          this.loadingService.setloading(false);
          return throwError(() => new Error(err));
        })
      )
      .subscribe((data: any) => {
        this.deviceInfo = data?.response || {};
        this.loadingService.setloading(false);
        if (this.typeAction === 'update') {
          this.patchValueForForm(this.deviceInfo);
        }
        console.log(this.providerList);

        subcription.unsubscribe();
      });
  }
}
