import { Component } from '@angular/core';
import { DeviceService } from 'src/app/core/services/api/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent {
  public status = [{ value: 'On' }, { value: 'Off' }];
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public deviceList:any;
  constructor(private deviceService:DeviceService) {}
  handleDisplayCreateDevice():void {

  }

  ngOnInit() {
    this.deviceService.getDevice().subscribe((data) => {
      this.deviceList = data;
    })
  }
}
