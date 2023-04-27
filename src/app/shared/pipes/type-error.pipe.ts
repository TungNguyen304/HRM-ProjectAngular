import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeError',
})
export class TypeErrorPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string {
    switch (value) {
      case 'required':
        return 'warning.required';
      case 'maxLength':
        return 'warning.maxLength';
      case 'emoji':
        return 'warning.emoji';
      case 'file':
        return 'warning.file';
      case 'email':
        return 'warning.email';
      case 'api':
        return 'warning.api';
      default:
        return value || '';
    }
  }
}
