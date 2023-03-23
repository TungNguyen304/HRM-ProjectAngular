import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, isFormControl, isFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  convertDataForTableRowStyle(labelList:any, data:any){
    const infoList:any = [];
    labelList.forEach((item:any) => {
      if (Object.keys(data).includes(item.key)) {
        infoList.push({
            name: item.name,
            value: data[item.key as keyof typeof data],
            key: item.key
        })
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
    Object.keys((group as FormArray).controls).map((field) => {
      const control = group.get(field);
      if (isFormControl(control)) {
        control.markAsDirty();
      } else if (isFormGroup(control)) {
        this.markAsDirty(control);
      }
    });
  }
}
