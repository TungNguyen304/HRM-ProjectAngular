import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss'],
})
export class CreateDeviceComponent {
  public sex = [
    {
      value: 'Nam',
    },
    {
      value: 'Nữ',
    },
  ];

  constructor(private location:Location) {}
  handleBack():void {
    this.location.back()
  }
}
