import { Component, Input, OnInit } from '@angular/core';
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
import {
  emojiWarning,
  requireWarning,
} from 'src/app/core/services/helper/warningForm.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import {
  IPosition,
  IUnit,
  IWarningWorkingProcess,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-working-process',
  templateUrl: `./working-process.component.html`,
  styleUrls: [
    '../create-employee.component.scss',
    './working-process.component.scss',
  ],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class WorkingProcessComponent implements OnInit {
  public workingForm = [
    {
      value: 'FULL_TIME',
      label: 'Toàn thời gian',
    },
    {
      value: 'HALF_TIME',
      label: 'Bán thời gian',
    },
    {
      value: 'COLLABORATORS',
      label: 'Cộng tác viên',
    },
  ];
  public unitList: IUnit[];
  public warning: IWarningWorkingProcess = {
    unit: null,
    position: null,
    workingTime: null,
    workingForm: null,
  };
  @Input() employeeForm: FormGroup;
  public positionList: IPosition[];
  public processControlList: FormArray;
  public disableSelectPosition: boolean = true;
  constructor(
    private positionService: PositionService,
    private unitTreeService: UnitTreeService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.warningDetect();
    this.employeeForm.get('workingProcess')?.valueChanges.subscribe(() => {
      this.warningDetect();
    });

    this.processControlList = getControlCommon(
      this.employeeForm,
      'workingProcess'
    ) as FormArray;

    this.unitTreeService.unitTree$.subscribe((data: any) => {
      this.unitList = data;
    });
  }

  onSelectedChange(event: any, index: number) {
    this.positionService
      .getPositionByUnitId(event.node.key)
      .subscribe((data: any) => {
        this.positionList = data.response.data;
        getControlCommon(
          this.employeeForm,
          'workingProcess',
          'position'
        )?.enable();
      });
    this.processControlList.controls[index].get('position')?.enable();
  }

  getWorkingProcessList(): AbstractControl<any>[] {
    return this.processControlList.controls;
  }

  handleAddProcess(): void {
    this.processControlList.push(
      this.fb.group({
        unit: ['', [Validators.required]],
        position: ['', [Validators.required]],
        workingTime: ['', [Validators.required]],
        workingForm: ['', [Validators.required]],
      })
    );
    this.processControlList.controls.forEach((control) => {
      if(!control.get('unit')?.valid) {
        control.get('position')?.disable();
      }
    });
  }

  getControl(control: string, id: number): AbstractControl | null {
    return this.processControlList?.controls[id]?.get(control);
  }

  handleDeleteProcess(index: number): void {
    this.processControlList?.controls.splice(index, 1);
  }

  warningDetect(): void {
    this.processControlList?.controls.forEach((control) => {
      this.handleSetWarning('unit', control);
      this.handleSetWarning('position', control);
      this.handleSetWarning('workingTime', control);
      this.handleSetWarning('workingForm', control);
    });
  }

  handleSetWarning(
    type: keyof IWarningWorkingProcess,
    formWorkingProcess: AbstractControl
  ): void {
    requireWarning(formWorkingProcess, this, type);
  }
}
