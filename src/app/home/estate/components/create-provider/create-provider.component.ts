import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { requireWarning } from 'src/app/core/services/helper/warningForm.service';
import { IWarningProvider } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss'],
})
export class CreateProviderComponent implements OnInit {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public providerForm: FormGroup;
  constructor(private location: Location, private fb: FormBuilder, private commonService:CommonService) {}
  public warning: IWarningProvider = {
    name: null,
    item: null,
    contact: null,
  };
  handleBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.commonService.markAsDirty(this.providerForm);
  }

  ngOnInit() {
    this.providerForm = this.fb.group({
      name: ['', [Validators.required]],
      item: ['', [Validators.required]],
      address: [''],
      contact: ['', [Validators.required]],
      priority: [''],
      note: [''],
      conclude: [''],
    });

    this.warningDetect();
    this.providerForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  getControl(control: string): AbstractControl | null {
    return getControlCommon(this.providerForm, control);
  }

  warningDetect(): void {
    this.handleSetWarning('name');
    this.handleSetWarning('item');
    this.handleSetWarning('contact');
  }

  handleSetWarning(type: keyof IWarningProvider): void {
    requireWarning(this.providerForm, this, type);
  }
}
