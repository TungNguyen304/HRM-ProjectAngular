import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import {
  apiWarning,
  emailWarning,
  emojiWarning,
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import {
  IWarningContactInfo,
  fieldFEEmployee,
} from 'src/app/shared/interfaces';
import { socialNetworks } from './data';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';

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
export class ContactInformationComponent implements OnInit, OnChanges {
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private toasMsgService: ToastMsgService
  ) {}
  public socialNetworks = socialNetworks;
  @Input() employeeForm: FormGroup;
  @Input() errorFromApi: HttpErrorResponse;
  public toast: any;
  public warning: IWarningContactInfo = {
    email: null,
    phone: null,
    skypeId: null,
    value: null,
    name: null,
  };

  ngOnInit() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
    this.warningDetect();
    this.employeeForm.get('contactInfo')?.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  ngOnChanges() {
    this.errorFromApi &&
      this.errorFromApi.error?.errors?.forEach((item: any) => {
        apiWarning(
          Object.values(item.constraints).join(', '),
          this,
          fieldFEEmployee[item.property as keyof typeof fieldFEEmployee]
        );
        this.employeeForm
          .get(
            `contactInfo.${
              fieldFEEmployee[item.property as keyof typeof fieldFEEmployee]
            }`
          )
          ?.setErrors({
            api: true,
          });
      });
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.employeeForm, 'contactInfo', control);
  }

  getSocialControl(control: string, id: number): AbstractControl | null {
    return (
      getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray
    ).controls[id].get(control);
  }

  get socialControlList(): AbstractControl<any>[] {
    return (
      getControlCommon(this.employeeForm, 'contactInfo', 'socials') as FormArray
    ).controls;
  }

  warningDetect(): void {
    this.handleSetWarning('email', 255);
    this.handleSetWarning('phone', 11);
    this.handleSetWarning('skypeId', 255);
    this.socialControlList.forEach((control) => {
      if (control.get('name')?.errors?.['required']) {
        this.warning.name = {
          type: 'required',
        };
      }
      if (control.get('value')?.errors?.['required']) {
        this.warning.value = {
          type: 'required',
        };
      }
    });
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
    emailWarning(this.employeeForm.get('contactInfo'), this, type);
  }

  handleAddSocial(): void {
    if (this.socialControlList.length < 5) {
      (
        getControlCommon(this.employeeForm, 'contactInfo.socials') as FormArray
      ).push(
        this.fb.group({
          name: ['', [Validators.required]],
          value: ['', [Validators.required]],
        })
      );
      this.cdr.detectChanges();
    } else {
      this.toastService.toastWarn(this.toast.maxLengthSocial);
    }
  }

  handleDeleteSocial(index: number) {
    (
      getControlCommon(this.employeeForm, 'contactInfo.socials') as FormArray
    ).removeAt(index);
  }
}
