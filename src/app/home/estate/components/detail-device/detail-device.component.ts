import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { CommonService } from 'src/app/core/services/common.service';
import { labelDeviceVi, labelDeviceEn } from './data';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from 'src/app/shared/interfaces/language';
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
    private languageService: LanguageService
  ) {}
  handleBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((data: any) => {
      this.id = data.id;
    });
    this.deviceService.getDeviceById(this.id).subscribe((data2) => {
      this.device = data2;
      this.languageService.language$.subscribe((data: ILanguage) => {
        if (data === 'vi') {
          this.deviceList = this.commonService.convertDataForTableRowStyle(
            labelDeviceVi,
            this.device
          );
        } else {
          this.deviceList = this.commonService.convertDataForTableRowStyle(
            labelDeviceEn,
            this.device
          );
        }
      });
    });
  }
}