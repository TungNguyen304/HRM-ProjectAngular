import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { emojiWarning, maxLengthWarning, requireWarning } from 'src/app/core/services/helper/warningForm.service';
import { IWarningContactInfo } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-contact-information',
  template: `
    <div formGroupName="contactInfo" class="contact_information">
      <h3 class="title">Thông tin liên hệ</h3>
      <div>
        <div class="form_item">
          <label for="email">
            <span>Email</span>
            <span style="color: red;">*</span>
          </label>
          <input
            formControlName="email"
            type="text"
            id="email"
            pInputText
            placeholder="Enter response here"
          />
          <p *ngIf="getControl('email')?.dirty && getControl('email')?.errors" class="warning"><i class="bi bi-cone-striped"></i>{{warning.email}}</p>
        </div>
        <div class="form_item">
          <label for="phone">
            <span>Số điện thoại</span>
            <span style="color: red;">*</span>
          </label>
          <input
            formControlName="phone"
            type="text"
            id="phone"
            pInputText
            placeholder="Enter response here"
          />
          <p *ngIf="getControl('phone')?.dirty && getControl('phone')?.errors" class="warning"><i class="bi bi-cone-striped"></i>{{warning.phone}}</p>
        </div>
        <div class="form_item">
          <label for="skype">
            <span>SkypeID</span>
            <span style="color: red;">*</span>  
          </label>
          <input
            formControlName="skypeId"
            type="text"
            id="skype"
            pInputText
            placeholder="Enter response here"
          />
          <p *ngIf="getControl('skypeId')?.dirty && getControl('skypeId')?.errors" class="warning"><i class="bi bi-cone-striped"></i>{{warning.skypeId}}</p>
        </div>
        
      </div>
    </div>
  `,
  styleUrls: ['./create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ContactInformationComponent {
  constructor() {}
  @Input() employeeForm:FormGroup;
  public warning:IWarningContactInfo = {
    email: '',
    phone: '',
    skypeId: ''
  }

  ngOnInit() {
    this.warningDetect();
    this.employeeForm.get('contactInfo')?.valueChanges.subscribe(() => {
      this.warningDetect();
    })
  }
  
  myUploader(event: any):void {
    console.log(event.files[0]);
  }

  getControl(control:string):AbstractControl | null {
    return getControlCommon(this.employeeForm, 'contactInfo', control)
  }

  warningDetect(): void {
    this.handleSetWarning('email', 'Email', 255);
    this.handleSetWarning('phone', 'Số điện thoại', 11);
    this.handleSetWarning('skypeId', 'SkypeID', 255);
  }

  handleSetWarning(type: keyof IWarningContactInfo, label: string, length?: number): void {
    requireWarning(this.employeeForm.get('contactInfo'), this, type, label);
    emojiWarning(this.employeeForm.get('contactInfo'), this, type, label);
    length && maxLengthWarning(this.employeeForm.get('contactInfo'), this, type, label, length);
  }
}
