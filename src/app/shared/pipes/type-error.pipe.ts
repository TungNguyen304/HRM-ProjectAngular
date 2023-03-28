import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeError'
})
export class TypeErrorPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string {
    return value === 'required' ? 'warning.required' : value === 'maxLength' ? 'warning.maxLength': value === 'emoji' ? 'warning.emoji' : value === 'file' ? 'warning.file' : '';
  }

}
