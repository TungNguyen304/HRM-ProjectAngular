import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeImage',
})
export class SafeImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): unknown {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
