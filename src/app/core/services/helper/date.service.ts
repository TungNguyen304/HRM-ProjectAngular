import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DateService {
    handleConvertDateToIOString(date: any): string {
        if (!date) return '';
        if (typeof date === 'string') {
          const [day, month, year] = date.split('/');
          return new Date([year, month, day].join('/')).toISOString();
        }
        return date.toISOString();
      }
}