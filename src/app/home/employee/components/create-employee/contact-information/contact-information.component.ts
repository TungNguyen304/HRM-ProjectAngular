import { Component, Input } from '@angular/core';
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
export class ContactInformationComponent {
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
    this.handleSetWarning('email', 'Email', 255);
    this.handleSetWarning('phone', 'Số điện thoại', 11);
    this.handleSetWarning('skypeId', 'SkypeID', 255);
  }

  handleSetWarning(
    type: keyof IWarningContactInfo,
    label: string,
    length?: number
  ): void {
    requireWarning(this.employeeForm.get('contactInfo'), this, type, label);
    emojiWarning(this.employeeForm.get('contactInfo'), this, type, label);
    length &&
      maxLengthWarning(
        this.employeeForm.get('contactInfo'),
        this,
        type,
        label,
        length
      );
  }
}
