import { Injectable } from '@angular/core';
import { DeviceService } from '../http/device.service';

@Injectable({
  providedIn: 'root',
})
export class EstateService {
  constructor(private deviceService: DeviceService) {}
  handleSetValueForDeviceStore(key: string, value: any) {
    let store: any;
    this.deviceService.deviceStore$.subscribe((data) => {
      store = data;
    });
    this.deviceService.deviceStore$.next({
      ...store,
      [key]: value,
    });
  }
}
