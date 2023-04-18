import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { CommonService } from 'src/app/core/services/common.service';
import { labelDeviceVi, labelDeviceEn } from './data';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from 'src/app/shared/interfaces/language';
import { LoadingService } from 'src/app/core/services/state/loading.service';
import { map, switchMap } from 'rxjs';
@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.scss'],
})
export class DetailDeviceComponent {
  public deviceList: any;
  public id: number;
  public device: any;
  constructor(
    private location: Location,
    private activateRoute: ActivatedRoute,
    private commonService: CommonService,
    private deviceService: DeviceService,
    private languageService: LanguageService,
    private loadingService: LoadingService
  ) {}
  handleBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadingService.setloading(true);
    this.activateRoute.params
      // .pipe(
      //   switchMap((params) =>
      //     this.employeeService.getEmployeeById(params['id'])
      //   ),
      //   switchMap((employee: any) =>
      //     this.languageService.language$.pipe(
      //       map((language) => {
      //         switch (language) {
      //           case 'vi':
      //             return this.commonService.convertDataForTableRowStyle(
      //               labelDeviceVi,
      //               employee.response
      //             );
      //           default:
      //             return this.commonService.convertDataForTableRowStyle(
      //               labelDeviceEn,
      //               employee.response
      //             );
      //         }
      //       })
      //     )
      //   )
      // )
      .subscribe((data) => {
        this.deviceList = data;
        this.loadingService.setloading(false);
      });
  }
}