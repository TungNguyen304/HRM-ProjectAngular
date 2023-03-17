import { Injectable } from '@angular/core';

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
}
