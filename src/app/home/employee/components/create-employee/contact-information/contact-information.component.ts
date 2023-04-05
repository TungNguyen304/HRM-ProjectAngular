import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import {
  emojiWarning,
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { IWarningContactInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-contact-information',
  templateUrl: `./contact-information.component.html`,
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ContactInformationComponent implements OnInit {
  constructor() {}
  @Input() employeeForm: FormGroup;
  public warning: IWarningContactInfo = {
    email: null,
    phone: null,
    skypeId: null,
  };

  ngOnInit() {
    this.warningDetect();
    this.employeeForm.get('contactInfo')?.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  myUploader(event: any): void {
    console.log(event.files[0]);
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.employeeForm, 'contactInfo', control);
  }

  warningDetect(): void {
    this.handleSetWarning('email', 255);
    this.handleSetWarning('phone', 11);
    this.handleSetWarning('skypeId', 255);
  }

  handleSetWarning(
    type: keyof IWarningContactInfo,
    length?: number
  ): void {
    requireWarning(this.employeeForm.get('contactInfo'), this, type);
    emojiWarning(this.employeeForm.get('contactInfo'), this, type);
    length &&
      maxLengthWarning(
        this.employeeForm.get('contactInfo'),
        this,
        type,
        length
      );
  }
}
