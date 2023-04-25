import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { CommonService } from 'src/app/core/services/common.service';
import { labelDeviceVi, labelDeviceEn } from './data';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from 'src/app/shared/interfaces/language';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { map, of, switchMap } from 'rxjs';
import { StatusAsset } from '../../device/data';
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
  public deviceExcel: any;
  constructor(
    private location: Location,
    private activateRoute: ActivatedRoute,
    private commonService: CommonService,
    private deviceService: DeviceService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private exportFileService: ExportFileService
  ) {}
  handleBack(): void {
    this.location.back();
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
    setTimeout(() => {
      this.loadingService.setloading(true);
    });
    this.activateRoute.params
      .pipe(
        switchMap((params) => this.deviceService.getDeviceById(params['id'])),
        switchMap((device: any) => {
          if (device.statusCode === 200) {
            console.log(device.response);

            this.deviceExcel = device.response;
            return this.languageService.language$.pipe(
              map((language) => {
                switch (language) {
                  case 'vi':
                    return this.commonService.convertDataForTableRowStyle(
                      labelDeviceVi,
                      this.transformDataForDetail(device.response)
                    );
                  default:
                    return this.commonService.convertDataForTableRowStyle(
                      labelDeviceEn,
                      this.transformDataForDetail(device.response)
                    );
                }
              })
            );
          }
          return of('');
        })
      )
      .subscribe((data) => {
        this.deviceList = data;
        this.loadingService.setloading(false);
      });
  }
}
