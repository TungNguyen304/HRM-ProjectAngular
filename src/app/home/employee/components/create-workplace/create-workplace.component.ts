import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { handleFormatDataUnit, handleFormatDataUnitTreeSelect } from 'src/app/core/services/helper/unit.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';

import {
  emojiWarning,
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IWarningCreateWorkplace } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-workplace',
  templateUrl: './create-workplace.component.html',
  styleUrls: ['./create-workplace.component.scss'],
})
export class CreateWorkplaceComponent {
  public position: any;
  public workplaceForm: FormGroup;
  public unitList:any[];
  public warning:IWarningCreateWorkplace = {
    code: null,
    name: null,
    otherName: null,
    type: null,
    unit: null,
  };

  constructor(private fb: FormBuilder, private commonService:CommonService, private unitService:UnitService) {
    this.position = [
      { value: 'Đơn vị 1' },
      { value: 'Đơn vị 2' },
      { value: 'Đơn vị 3' },
      { value: 'Đơn vị 4' },
    ];
  }

  onSubmit(): void {
    console.log('submit');
    this.commonService.markAsDirty(this.workplaceForm);
  }

  getControl(control: string): AbstractControl | null {
    return this.workplaceForm.get(control);
  }

  ngOnInit() {
    this.workplaceForm = this.fb.group(
      {
        code: [
          '',
          [Validators.required, emojiValidator, Validators.maxLength(100)],
        ],
        name: [
          '',
          [Validators.required, emojiValidator, Validators.maxLength(255)],
        ],
        otherName: [
          '',
          [Validators.required, emojiValidator, Validators.maxLength(255)],
        ],
        type: [
          '',
          [Validators.required, emojiValidator, Validators.maxLength(255)],
        ],
        unit: this.fb.group({
          selectedNodes: ['', [Validators.required]]
        }),
      }
    );
    this.warningDetect();
    this.workplaceForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });

    this.unitService.getUnit().subscribe((data:any) => {
      this.unitList = handleFormatDataUnitTreeSelect(data.response.data);
    })
  }

  warningDetect(): void {
    this.handleSetWarning('code', 'Mã', 100);
    this.handleSetWarning('name', 'Tên', 255);
    this.handleSetWarning('otherName', 'Tên khác', 255);
    this.handleSetWarning('type', 'Loại vị trí', 255);
    this.handleSetWarning('unit', 'Đơn vị', 255);
  }

  handleSetWarning(type: keyof IWarningCreateWorkplace, label: string, length: number): void {
    requireWarning(this.workplaceForm, this, type, label);
    emojiWarning(this.workplaceForm, this, type, label);
    maxLengthWarning(this.workplaceForm, this, type, label, length);
  }
}

