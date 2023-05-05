import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { CommonService } from 'src/app/core/services/common.service';
import { labelDeviceVi, labelDeviceEn } from './data';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { catchError, finalize, map, switchMap, throwError } from 'rxjs';
import { StatusAsset } from '../../device/data';
import { EstateService } from 'src/app/core/services/helper/estate.service';
import { ProviderService } from 'src/app/core/services/http/provider.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { ExportFileService } from 'src/app/core/services/helper/export-file.service';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';
@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.scss'],
})
export class DetailDeviceComponent implements OnInit {
  public deviceList: any;
  public id: number;
  public device: any;
  public repairInfoList: any;
  public displayHistoryBorrow: boolean = false;
  public loadDisplay: boolean = false;
  public displayCreateRequest: boolean = false;
  public total: number = 0;
  public limit: number = 4;
  public token: string;
  public historyBorrow: any[];
  public requestForm: FormGroup;
  public displayQr: boolean = false;
  public elementType = NgxQrcodeElementTypes.URL;
  public correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  public deviceExcel: any;
  public estate: boolean = true;
  public url: string;
  public toast: any;
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
    private exportFileService: ExportFileService,
    private router: Router,
    private toasMsgService: ToastMsgService
  ) {}
  handleBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.loadingService.setloading(true);
      console.log(this.requestForm.value);
      const data = {
        description: this.requestForm.value.description,
        date_borrow_from: new Date(
          this.requestForm.value.time[0]
        ).toLocaleDateString(),
        date_borrow_to: new Date(
          this.requestForm.value.time[1]
        ).toLocaleDateString(),
        type_request: 0,
        signature_data: 'hello',
      };
      this.deviceService
        .addRequestBorrow(data)
        .pipe(
          finalize(() => {
            this.loadingService.setloading(false);
            this.loadDisplay = false;
            this.displayHistoryBorrow = false;
          })
        )
        .subscribe((data: any) => {
          if (data.statusCode === 200) {
            this.toastService.toastSuccess(this.toast.RequestSuccess);
          }
        });
    }
  }

  onPageChange(event: any) {
    console.log(event);
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

  exportFile() {
    this.exportFileService.exportAsExcelFile(
      [this.deviceExcel],
      `Device ${this.deviceExcel?.asset_name}`
    );
  }

  ngOnInit() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.estate = this.router.url.includes('estate');
    setTimeout(() => {
      this.loadingService.setloading(true);
    });
    this.activateRoute.params
      .pipe(
        switchMap((params) => {
          this.token = params['token'];
          if (this.token) {
            return this.deviceService.getDeviceById(params['id'], this.token);
          }
          return this.deviceService.getDeviceById(params['id']);
        }),
        switchMap((device: any) => {
          this.deviceExcel = device.response;
          this.url = `${window.location.host}/detail-device/${
            this.deviceExcel.asset_id
          }/${localStorage.getItem('token')}`;
          return this.providerService.getAllProvider(this.token).pipe(
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
        }),
        catchError((err) => {
          this.loadingService.setloading(false);
          return throwError(err);
        })
      )
      .subscribe((data) => {
        this.deviceList = data;
        this.loadingService.setloading(false);
      });

    this.requestForm = this.fb.group({
      time: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
