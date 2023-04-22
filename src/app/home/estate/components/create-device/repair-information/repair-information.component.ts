import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import {
  emojiWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { IWarningRepairForm } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-repair-information',
  templateUrl: './repair-information.component.html',
  styleUrls: [
    './repair-information.component.scss',
    '../create-device.component.scss',
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class RepairInformationComponent {
  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {}
  public warning: IWarningRepairForm = {
    repairDate: null,
    content: null,
    money: null,
  };
  @Input() deviceForm: FormGroup;
  @Input() deviceInfo: any;
  public lang = {
    currency: 'USD',
    locale: 'en-US',
  };

  get repairListControl(): AbstractControl<any>[] {
    return (this.deviceForm.get('repairInfo') as FormArray).controls;
  }

  handleAddSocial(): void {
    // khong them .control vao formArray
    (this.deviceForm.get('repairInfo') as FormArray).push(
      this.fb.group({
        repairDate: ['', [Validators.required]],
        content: ['', [Validators.required]],
        money: ['', [Validators.required]],
      })
    );
  }

  getControl(control: string, id: number): AbstractControl | null | undefined {
    return (this.deviceForm.get('repairInfo') as FormArray).controls[id].get(
      control
    );
  }

  handleDeleteSocial(index: number) {
    (this.deviceForm.get('repairInfo') as FormArray).removeAt(index);
  }

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => {
      (this.deviceForm.get('repairInfo') as FormArray)?.controls.forEach(
        (control) => {
          control
            ?.get('money')
            ?.setValue(
              this.commonService.convertCurrency(control?.get('money')?.value)
            );
        }
      );
      switch (lang) {
        case 'en': {
          this.lang = {
            currency: 'USD',
            locale: 'en-US',
          };
          break;
        }
        case 'vi': {
          this.lang = {
            currency: 'VND',
            locale: 'vi-VN',
          };
        }
      }
    });

    this.warningDetect();
    this.deviceForm.get('repairInfo')?.valueChanges.subscribe(() => {
      this.warningDetect();
    });
  }

  ngOnChanges() {
    this.deviceInfo?.update_asset_history_collection?.map((item:any, index:number) => {
      this.handleAddSocial();
      (this.deviceForm.get('repairInfo') as FormArray).controls[index].patchValue({
        repairDate: this.commonService.convertDateVi(item.date_updated),
        content: item.content_updated,
        money: this.commonService.convertUSDtoVND(item.total_amount),
      })
    })
  }

  warningDetect(): void {
    this.repairListControl?.forEach((control) => {
      this.handleSetWarning('repairDate', control);
      this.handleSetWarning('content', control);
      this.handleSetWarning('money', control);
    });
  }

  handleSetWarning(
    type: keyof IWarningRepairForm,
    formWorkingProcess: AbstractControl
  ): void {
    requireWarning(formWorkingProcess, this, type);
  }
}
