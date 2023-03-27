import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-working-process',
  template: `<div formGroupName="workingProcess" class="working_process">
    <h3 class="title">{{'title.workingProcess' | translate}}</h3>
    <div>
      <div class="form_item">
        <label for="unit">
          <span>{{'sidebar.workUnit' | translate}}</span>
        </label>
        <p-dropdown
          formControlName="unit"
          [placeholder]="'common.select' | translate"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
      </div>
      <div class="form_item">
        <label for="position">
          <span>{{'sidebar.workPlace' | translate}}</span>
        </label>
        <p-dropdown
          formControlName="position"
          [placeholder]="'common.select' | translate"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
      </div>
      <div class="form_item">
        <label for="time">
          <span>{{'createEmployee.time' | translate}}</span>
        </label>
        <p-calendar
          formControlName="workingTime"
          [showButtonBar]="true"
          dateFormat="dd.mm.yy"
        ></p-calendar>
      </div>
      <div class="form_item">
        <label for="">
          <span>{{'createEmployee.workingForm' | translate}}</span>
        </label>
        <p-dropdown
          formControlName="workingForm"
          [placeholder]="'common.select' | translate"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
      </div>
    </div>
  </div>`,
  styleUrls: ['./create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class WorkingProcessComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
}
