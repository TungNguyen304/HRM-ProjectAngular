import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/core/services/http/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent {
  public status = [{ value: 'On' }, { value: 'Off' }];
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public deviceList:any;
  constructor(private deviceService:DeviceService, private router:Router) {}
  handleDisplayCreateDevice():void {
    this.router.navigate(['estate', 'device', 'create-device']);
  }

  handleNavigateDetailDevice(id:number):void {
    this.router.navigate(['estate', 'device', 'detail-device', id]);
  }

  ngOnInit() {
    this.deviceService.getDevice().subscribe((data) => {
      this.deviceList = data;
    })
  }
}
