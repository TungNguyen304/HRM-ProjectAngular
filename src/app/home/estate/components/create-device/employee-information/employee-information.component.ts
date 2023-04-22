import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { DeviceService } from 'src/app/core/services/http/device.service';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: [
    './employee-information.component.scss',
    '../create-device.component.scss',
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class EmployeeInformationComponent {
  constructor(private deviceService: DeviceService) {}
  public employeeList: any = [];
  ngOnInit() {
    this.deviceService.deviceStore$.subscribe((data) => {
      this.employeeList = data.employee;
    });
  }
}
