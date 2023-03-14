import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  public status: {value:string}[];
  public sex: {value:string}[];

  constructor() {
      this.status = [
          {value: 'Chọn'},
          {value: 'On'},
          {value: 'Off'},
      ];
      this.sex = [
        {value: 'Chọn'},
        {value: 'Nam'},
        {value: 'Nữ'},
      ]
  }
}
