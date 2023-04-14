import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import {
  handleFormatDataUnit,
  handleFormatDataUnitTreeSelect,
} from 'src/app/core/services/helper/unit.service';
import { emojiValidator } from 'src/app/core/services/helper/validator.service';

import {
  emojiWarning,
  maxLengthWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitService } from 'src/app/core/services/http/unit.service';
import { IPosition, IWarningCreateWorkplace } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-create-workplace',
  templateUrl: './create-workplace.component.html',
  styleUrls: ['./create-workplace.component.scss'],
  providers: [MessageService],
})
export class CreateWorkplaceComponent implements OnInit {
  public workplaceForm: FormGroup;
  public unitList: any[];
  public disable: boolean = false;
  public warning: IWarningCreateWorkplace = {
    code: null,
    name: null,
    otherName: null,
    type: null,
    unit: null,
    unitSelect: null,
  };
  @Input() infoUpdate: IPosition;
  @Input() typeAction: 'Add' | 'Update';
  @ViewChild('buttonSave') buttonSave: ElementRef;
  @Output() showMessage: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private unitService: UnitService,
    private positionService: PositionService
  ) {}

  handleTypeRequestApi(data: any, id?: string): Observable<Object> {
    if (id && this.typeAction === 'Update') {
      return this.positionService.updatePosition(data, id);
    }
    return this.positionService.addPosition(data);
  }

  onSubmit(): void {
    this.commonService.markAsDirty(this.workplaceForm);
    if (this.workplaceForm.valid) {
      const data = {
        ...this.infoUpdate,
        job_position_code: this.getControl('code')?.value,
        job_position_name: this.getControl('name')?.value,
        job_position_category: this.getControl('type')?.value,
        job_position_other_name: this.getControl('otherName')?.value,
        organization_unit_id: this.getControl('unitSelect')?.value?.unit?.key,
      };
      this.buttonSave.nativeElement.classList.toggle('button--loading');
      this.disable = true;
      this.handleTypeRequestApi(
        data,
        this.infoUpdate?.job_position_id
      ).subscribe(
        (data:any) => {
          if(data.response.statusCode === 200) {
            this.showMessage.emit(true);
          }
        },
        () => {
          this.showMessage.emit(false);
          this.buttonSave.nativeElement.classList.toggle('button--loading');
          this.disable = false;
        }
      );
    }
  }

  getControl(control: string): AbstractControl | null {
    return this.workplaceForm.get(control);
  }

  ngOnInit() {
    this.workplaceForm = this.fb.group({
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
      unitSelect: this.fb.group({
        unit: ['', [Validators.required]],
      }),
    });

    this.workplaceForm.valueChanges.subscribe(() => {
      this.warningDetect();
    });

    if (this.infoUpdate && this.typeAction === 'Update') {
      const data = {
        name: this.infoUpdate.job_position_name,
        code: this.infoUpdate.job_position_code,
        type: this.infoUpdate.job_position_category,
        otherName: this.infoUpdate.job_position_other_name,
        unitSelect: {
          unit: {
            label: this.infoUpdate.organization?.organization_unit_name || '',
            key: this.infoUpdate.organization?.organization_unit_id,
          },
        },
      };
      this.workplaceForm.patchValue(data);
    }

    this.unitService.getUnit().subscribe((data: any) => {
      if(data.response.statusCode === 200) {
        this.unitList = handleFormatDataUnitTreeSelect(data.response.data);
      }
    }, (err) => {
      console.log(err);
    });
  }

  warningDetect(): void {
    this.handleSetWarning('code', 100);
    this.handleSetWarning('name', 255);
    this.handleSetWarning('otherName', 255);
    this.handleSetWarning('type', 255);
    this.handleSetWarning(['unitSelect', 'unit'], 255);
  }

  handleSetWarning(
    type: keyof IWarningCreateWorkplace | Array<keyof IWarningCreateWorkplace>,
    length: number
  ): void {
    requireWarning(this.workplaceForm, this, type);
    if (!(type instanceof Array)) {
      emojiWarning(this.workplaceForm, this, type);
      maxLengthWarning(this.workplaceForm, this, type, length);
    }
  }
}
