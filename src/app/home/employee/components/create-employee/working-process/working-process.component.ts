import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';
import { PositionService } from 'src/app/core/services/http/position.service';
import { IPosition, IUnit } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-working-process',
  templateUrl: `./working-process.component.html`,
  styleUrls: ['../create-employee.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class WorkingProcessComponent {
  public workingForm = [
    {
      value: "FULL_TIME",
      label: "Toàn thời gian",
    },
    {
      value: "HALF_TIME",
      label: "Bán thời gian",
    },
    {
      value: "COLLABORATORS",
      label: "Cộng tác viên",
    },
  ];
  @Input() unitList:IUnit[];
  @Input() employeeForm:FormGroup;
  public positionList:IPosition[];
  public disableSelectPosition:boolean = true;
  constructor (private positionService:PositionService) {}  
  ngOnInit() {
    getControlCommon(this.employeeForm, 'workingProcess', 'position')?.disable();
  }
  onSelectedChange(event:any) {
    this.positionService.getPositionByUnitId(event.node.key).subscribe((data:any) => {
      this.positionList = data.response.data;
      getControlCommon(this.employeeForm, 'workingProcess', 'position')?.enable();
    })
  }
}
