import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, isFormArray, isFormControl, isFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  convertDataForTableRowStyle(labelList:any, data:any){
    const infoList:any = [];
    labelList.forEach((item:any) => {
      if (Object.keys(data).includes(item.key)) {
        if(data[item.key] instanceof Object || data[item.key] instanceof Array) {
          infoList.push(...this.convertDataForTableRowStyle(item.children, data[item.key]));
        } else {
          infoList.push({
            name: item.name,
            value: data[item.key],
            key: item.key
        })
        }
      } else {
        infoList.push({
            name: item.name,
            value: '',
            key: item.key
        })
      }
    });
    return infoList;
  }

  markAsDirty(group: AbstractControl) {
    Object.keys((group as FormArray).controls).forEach((field) => {
      const control = group.get(field);
      if (isFormControl(control)) {
        control.markAsDirty();
      }
      else if (isFormGroup(control) || isFormArray(control)) {
        this.markAsDirty(control);
      }
    });
  }
}
