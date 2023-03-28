import { Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-working-process',
  templateUrl: `./working-process.component.html`,
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class WorkingProcessComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
}
