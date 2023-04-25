import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { CommonService } from 'src/app/core/services/common.service';
import { labelDeviceVi, labelDeviceEn } from './data';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from 'src/app/shared/interfaces/language';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { finalize, map, switchMap } from 'rxjs';
import { StatusAsset } from '../../device/data';
import { EstateService } from 'src/app/core/services/helper/estate.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { toast } from 'src/app/shared/toastMessage';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.scss'],
})
export class DetailDeviceComponent {
  public deviceList: any;
  public id: number;
  public device: any;
  public repairInfoList: any;
  public displayHistoryBorrow: boolean = false;
  public loadDisplay: boolean = false;
  public displayCreateRequest: boolean = false;
  public total: number = 0;
  public limit: number = 4;
  public historyBorrow: any[];
  public requestForm: FormGroup;
  public deviceExcel: any;
  constructor(
    private location: Location,
    private activateRoute: ActivatedRoute,
    private commonService: CommonService,
    private deviceService: DeviceService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private estateService: EstateService,
    private providerService: ProviderService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private exportFileService: ExportFileService
  ) {}
  handleBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.loadingService.setloading(true);
      const data = {
        description: this.requestForm.value.description,
        date_borrow_from: this.requestForm.value.time[0],
        date_borrow_to: this.requestForm.value.time[1],
        type_request: 1,
        signature_data: 'hello',
        asset_ids: [this.deviceExcel.asset_id],
      };
      this.deviceService
        .addRequestBorrow(data)
        .pipe(
          finalize(() => {
            this.loadingService.setloading(false);
            this.loadDisplay = false;
            this.displayHistoryBorrow = false;
            this.displayCreateRequest = false;
          })
        )
        .subscribe(
          (data: any) => {
            if (data.statusCode === 200) {
              this.toastService.toastSuccess(toast.requestSuccess);
            }
          },
          () => {
            this.toastService.toastError(toast.requestFail);
          }
        );
    }
  }

  displayBorrow(): void {
    this.displayHistoryBorrow = true;
    this.loadDisplay = true;
    setTimeout(() => {
      this.loadDisplay = false;
    }, 2000);
  }

  transformDataForDetail(data: any) {
    this.repairInfoList = data.update_asset_history_collection?.map(
      (item: any) => {
        return {
          ...item,
          date_updated: this.commonService.reverseStringDateToVi(
            item.date_updated
          ),
          total_amount: item.total_amount + ' $',
        };
      }
    );

    return {
      ...data,
      updated_at: this.commonService.convertIOStringToDateVi(data.updated_at),
      created_at: this.commonService.convertIOStringToDateVi(data.created_at),
      status: StatusAsset[data.status],
      total_amount: data.total_amount + ' $',
      date_bought: this.commonService.reverseStringDateToVi(data.date_bought),
      date_use: this.commonService.reverseStringDateToVi(data.date_use),
    };
  }

  onPageChange(event: any): void {}

  exportFile() {
    this.exportFileService.exportAsExcelFile(
      [this.deviceExcel],
      `Device ${this.deviceExcel?.asset_name}`
    );
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.setloading(true);
    });
    this.activateRoute.params
      .pipe(
        switchMap((params) => this.deviceService.getDeviceById(params['id'])),
        switchMap((device: any) => {
          return this.providerService.getAllProvider().pipe(
            map((provider: any) => {
              return {
                ...device.response,
                distributor_name:
                  this.estateService.handleGetValueProvider(
                    provider.response.data,
                    device.response.distributor_id
                  )?.name || '',
              };
            })
          );
        }),
        switchMap((device: any) => {
          this.deviceExcel = device;
          return this.languageService.language$.pipe(
            map((language) => {
              switch (language) {
                case 'vi':
                  return this.commonService.convertDataForTableRowStyle(
                    labelDeviceVi,
                    this.transformDataForDetail(device)
                  );
                default:
                  return this.commonService.convertDataForTableRowStyle(
                    labelDeviceEn,
                    this.transformDataForDetail(device)
                  );
              }
            })
          );
        })
      )
      .subscribe((data) => {
        this.deviceList = data;
        this.loadingService.setloading(false);
      });

    this.requestForm = this.fb.group({
      time: '',
      description: '',
    });
  }
}
