import { Component } from '@angular/core';

@Component({
  selector: 'app-create-workplace',
  templateUrl: './create-workplace.component.html',
  styleUrls: ['./create-workplace.component.scss']
})
export class CreateWorkplaceComponent {
  public position:any;
  constructor() {
    this.position = [
      { value: 'Đơn vị 1' },
      { value: 'Đơn vị 2' },
      { value: 'Đơn vị 3' },
      { value: 'Đơn vị 4' }
    ]
  }
}
