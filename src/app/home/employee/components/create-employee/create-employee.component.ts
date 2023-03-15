import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {
  public sex = [
    {value: 'Nam'},
    {value: 'Nữ'},
  ]

  @ViewChild('drag') drag:ElementRef;

  handleOnDragEnter() {
    this.drag.nativeElement.style.border = '2px solid var(--primary-color)';
    this.drag.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  handleOnDragEnd() {
    this.drag.nativeElement.style.border = '2px dashed black';
    this.drag.nativeElement.style.backgroundColor = 'unset';
  }

  ngAfterViewInit() {
    
  }
}
