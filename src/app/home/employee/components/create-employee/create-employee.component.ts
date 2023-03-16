import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  public sex = [{ value: 'Nam' }, { value: 'Nữ' }];
  public url: any = '';
  public assetList = [];
  constructor(private sanitizer: DomSanitizer, private location:Location) {}
  @ViewChild('avt') drag: ElementRef;
  @ViewChild('file') file: ElementRef;

  handleOnDragEnter(event: any) {
    event.preventDefault();
    this.drag.nativeElement.style.border = '2px solid var(--primary-color)';
    this.drag.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  handleOnDragEnd() {
    if (this.url) {
      this.drag.nativeElement.style.border = '2px solid transparent';
    } else {
      this.drag.nativeElement.style.border = '2px dashed black';
    }
    this.drag.nativeElement.style.backgroundColor = 'unset';
  }

  handleOnDrop(event: any) {
    event.preventDefault();
    if (event.type === 'change') {
      this.url = this.sanitize(URL.createObjectURL(event.target.files[0]));
    } else {
      this.url = this.sanitize(
        URL.createObjectURL(event.dataTransfer.files[0])
      );
    }
    this.drag.nativeElement.style.border = '2px solid transparent';
  }

  handleClickInputFile() {
    this.file.nativeElement.click();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  handleBack() {
    this.location.back();
  }

  myUploader(event: any) {
    console.log(event.files[0]);
  }

  ngAfterViewInit() {}
}
