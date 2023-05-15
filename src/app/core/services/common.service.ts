import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  isFormArray,
  isFormControl,
  isFormGroup,
} from '@angular/forms';
import { LanguageService } from './state/language.service';
import { IUnit } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private languageService: LanguageService) {}

  public dollar = 23.45;

  convertDataForTableRowStyle(labelList: any, data: any) {
    const infoList: any = [];
    labelList.forEach((item: any) => {
      if (Object.keys(data).includes(item.key)) {
        if (
          data[item.key] instanceof Object ||
          data[item.key] instanceof Array
        ) {
          infoList.push(
            ...this.convertDataForTableRowStyle(item.children, data[item.key])
          );
        } else {
          if (
            item.key === 'birth_date' ||
            item.key === 'hire_date' ||
            item.key === 'receive_date'
          ) {
            data[item.key] = this.reverseStringDateToVi(data[item.key]);
          }
          infoList.push({
            name: item.name,
            value: data[item.key],
            key: item.key,
          });
        }
      } else {
        infoList.push({
          name: item.name,
          value: '',
          key: item.key,
        });
      }
    });
    return infoList;
  }

  markAsDirty(group: AbstractControl) {
    Object.keys((group as FormArray).controls).forEach((field) => {
      const control = group.get(field);
      if (isFormControl(control)) {
        control.markAsDirty();
      } else if (isFormGroup(control) || isFormArray(control)) {
        this.markAsDirty(control);
      }
    });
  }

  convertIOStringToDateVi(date: string) {
    function addOtoNumber(number: number) {
      if (String(number).length === 1) {
        return '0' + number;
      }
      return number;
    }
    const newDate = new Date(date);
    return (
      addOtoNumber(newDate.getDay()) +
      '-' +
      addOtoNumber(newDate.getMonth()) +
      '-' +
      newDate.getFullYear()
    );
  }

  convertDateVi(date: string): string {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return new Date([month, day, year].join('/')).toLocaleDateString('vi-VN');
  }

  reverseStringDateToViChangeStyle(date: string): string {
    if (!date) return '';
    return date.split('-').reverse().join('/');
  }

  reverseStringDateToVi(date: string): string {
    if (!date) return '';
    return date.split('-').reverse().join('-');
  }

  convertCurrency(money: number): number {
    let lang = '';
    this.languageService.language$.subscribe((data) => {
      lang = data;
    });

    if (!money) return 0;
    switch (lang) {
      case 'vi': {
        return money * this.dollar;
      }
      case 'en': {
        return money / this.dollar;
      }
      default:
        return money;
    }
  }

  convertVNDtoUSD(money: number): number {
    if (!money) {
      return 0;
    }
    let lang = '';
    this.languageService.language$.subscribe((data) => {
      lang = data;
    });
    switch (lang) {
      case 'vi': {
        return money / this.dollar;
      }
      default:
        return money;
    }
  }

  convertUSDtoVND(money: number): number {
    let lang = '';
    this.languageService.language$.subscribe((data) => {
      lang = data;
    });
    switch (lang) {
      case 'vi': {
        return money * this.dollar;
      }
      default:
        return money;
    }
  }

  checkTypeCV(file: File | undefined, type: string): boolean {
    if (file?.type === type) {
      return true;
    }
    return false;
  }

  checkSizeCV(file: File | undefined, size: number): boolean {
    if (file?.size && Number((file?.size / (1024 * 1024)).toFixed(2)) < size) {
      return true;
    }
    return false;
  }

  transformDataSearchOnUrl(data: any, unit?: IUnit) {
    console.log('patch');

    return Object.keys(data).reduce((accumulator, currentValue) => {
      if (data[currentValue]) {
        switch (currentValue) {
          case 'keyword':
            return {
              ...accumulator,
              codeNameEmail: data[currentValue],
            };
          case 'position':
            return {
              ...accumulator,
              position: data[currentValue],
            };
          case 'gender':
            return {
              ...accumulator,
              sex: {
                value: data[currentValue],
              },
            };
          case 'unit':
            return {
              ...accumulator,
              unit: unit,
            };
          case 'code':
            return {
              ...accumulator,
              code: data[currentValue],
            };
          case 'employee':
            return {
              ...accumulator,
              employee: data[currentValue],
            };
          case 'type':
            return {
              ...accumulator,
              type: data[currentValue],
            };
          case 'status': {
            return {
              ...accumulator,
              status: Number(data[currentValue]),
            };
          }
        }
      }
      return accumulator;
    }, {});
  }
}
