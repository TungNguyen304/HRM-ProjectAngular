import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { requireWarning } from 'src/app/core/services/helper/warningForm.service';
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
export class EmployeeInformationComponent implements OnInit {
  constructor(private deviceService: DeviceService) {}
  public employeeList: any = [];
  public warning: any = {
    email: null,
  };
  @Input() deviceForm: FormGroup;
  getControl(control: string): AbstractControl | null | undefined {
    return this.deviceForm.get('employeeInfo')?.get(control);
  }
  ngOnInit() {
    this.deviceForm.valueChanges.subscribe(() => {
      requireWarning(this.deviceForm.get('employeeInfo'), this, 'email');
    });
    this.deviceService.deviceStore$.subscribe((data) => {
      this.employeeList = data.employee;
    });
  }
}
