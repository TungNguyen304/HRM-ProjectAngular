import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-working-process',
  template: `<div formGroupName="workingProcess" class="working_process">
    <h3 class="title">Quá trình công tác</h3>
    <div>
      <div class="form_item">
        <label for="unit">
          <span>Đơn vị công tác</span>
        </label>
        <p-dropdown
          formControlName="unit"
          placeholder="Chọn"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
      </div>
      <div class="form_item">
        <label for="position">
          <span>Vị trí công việc</span>
        </label>
        <p-dropdown
          formControlName="position"
          placeholder="Chọn"
          [options]="sex"
          optionLabel="value"
        ></p-dropdown>
      </div>
      <div class="form_item">
        <label for="time">
          <span>Thời gian</span>
        </label>
        <p-calendar
          formControlName="workingTime"
          placeholder="Choose or Enter response here"
          [showButtonBar]="true"
          dateFormat="dd.mm.yy"
        ></p-calendar>
      </div>
      <div class="form_item">
        <label for="">
          <span>Hình thức làm việc</span>
        </label>
        <p-dropdown
          formControlName="workingForm"
          placeholder="Chọn"
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
