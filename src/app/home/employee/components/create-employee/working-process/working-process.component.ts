import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { requireWarning } from 'src/app/core/services/helper/warningForm.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { UnitTreeService } from 'src/app/core/services/state/uint-tree.service';
import {
  IPosition,
  IUnit,
  IWarningWorkingProcess,
} from 'src/app/shared/interfaces';
import { workingForm } from './data';

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
  public workingForm = workingForm;
  public unitList: IUnit[];
  public warning: IWarningWorkingProcess = {
    unit: null,
    position: null,
    workingTime: null,
    workingForm: null,
  };
  @Input() employeeForm: FormGroup;
  public positionList: Array<IPosition[]> = [];
  public processControlList: FormArray;
  constructor(
    private positionService: PositionService,
    private unitTreeService: UnitTreeService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
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

  ngAfterViewInit() {
    getControlCommon(this.employeeForm, 'otherInfo')?.valueChanges.subscribe(
      () => {
        const workingProcess = getControlCommon(
          this.employeeForm,
          'workingProcess'
        )?.value;
        workingProcess.forEach((item: any, index: number) => {
          this.onSelectedChange({ node: { key: item.unit.key } }, index);
        });

        this.warningDetect();
      }
    );
  }

  onSelectedChange(event: any, index: number) {
    event.node.key &&
      this.positionService
        .getPositionByUnitId(event.node.key)
        .subscribe((data: any) => {
          if (data.statusCode === 200) {
            this.positionList[index] = data.response.data.map(
              (position: any) => {
                return {
                  job_position_id: position.job_position_id,
                  job_position_name: position.job_position_name,
                  job_position_code: position.job_position_code,
                  job_position_code_name: position.job_position_code_name,
                };
              }
            );
            this.processControlList.controls[index].get('position')?.enable();
            this.cdr.detectChanges();
          }
        });
  }

  get workingProcessList(): AbstractControl<any>[] {
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
      if (!control.get('unit')?.valid) {
        control.get('position')?.disable();
      }
    });
  }

  getControl(control: string, id: number): AbstractControl | null {
    return this.processControlList?.controls[id]?.get(control);
  }

  handleDeleteProcess(index: number): void {
    this.processControlList?.controls.splice(index, 1);
    this.positionList.splice(index, 1);
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
