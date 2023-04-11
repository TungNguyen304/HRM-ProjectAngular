import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import {
  emojiWarning,
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { IWarningContactInfo } from 'src/app/shared/interfaces';
import { toast } from 'src/app/shared/toastMessage';
import { socialNetworks } from './data';

type Tsocial = 'type' | 'name';

@Component({
  selector: 'app-contact-information',
  templateUrl: `./contact-information.component.html`,
  styleUrls: [
    '../create-employee.component.scss',
    './contact-information.component.scss',
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ContactInformationComponent implements OnInit {
  constructor(private fb: FormBuilder, private toastService:ToastService) {}
  public socialNetworks = socialNetworks;
  @Input() employeeForm: FormGroup;
  public warning: IWarningContactInfo = {
    email: null,
    phone: null,
    skypeId: null,
    value: null,
    name: null,
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

  getSocialControl(control: string, id: number): AbstractControl | null {
    return (
      getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray
    ).controls[id].get(control);
  }

  getSocialControlList(): AbstractControl<any>[] {
    return (
      getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray
    ).controls;
  }

  warningDetect(): void {
    this.handleSetWarning('email' , 255);
    this.handleSetWarning('phone', 11);
    this.handleSetWarning('skypeId', 255);
    (getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray).controls.forEach((control) => {
      if(control.get('name')?.errors?.['required']) {
        this.warning.name = {
          type: 'required'
        }
      }
      if(control.get('value')?.errors?.['required']) {
        this.warning.value = {
          type: 'required'
        }
      }
    })
  }
  
  handleSetWarning(type: keyof IWarningContactInfo, length?: number): void {
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

  handleAddSocial(): void {
    const socialList = (
      getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray
    );
    if (socialList.length < 5) {
      socialList.push(
        this.fb.group({
          name: ['', [Validators.required]],
          value: ['', [Validators.required]],
        })
      );
    } else {
      this.toastService.toastWarn(toast.maxLengthSocial.summary, toast.maxLengthSocial.detail);
    }
  }


  handleDeleteSocial(index: number) {
    const socialList = (
      getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray
    ).controls;
    socialList.splice(index, 1);
  }
}
