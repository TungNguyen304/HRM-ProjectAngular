import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';
import { CommonService } from 'src/app/core/services/common.service';

const labelDevice = [
  { key: 'codeDevice', name: 'Mã tài sản' },
  { key: 'nameDevice', name: 'Tên tài sản' },
  { key: 'type', name: 'Loại' },
  { key: 'buyDate', name: 'Ngày mua' },
];

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.scss']
})
export class DetailDeviceComponent {
  public deviceList:any;
  constructor(private location:Location, private activateRoute:ActivatedRoute, private commonService:CommonService, private deviceService:DeviceService) {}
  handleBack():void {
    this.location.back()
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((data:any) => {
      this.deviceService.getDeviceById(data.id).subscribe(data2 => {
        this.deviceList = this.commonService.convertDataForTableRowStyle(
          labelDevice,
          data2
        );
      })
    });
    
  }


}
