import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUpload } from 'primeng/fileupload';
import { getControlCommon } from 'src/app/core/services/helper/formControl.service';

export interface IData {
  url:string,
  size: number
}

export interface IHandle {
  form: FormGroup,
  controls: string[],
  inputFileElement: FileUpload
}

@Directive({
  selector: '[appDragDropAvt]',
})
export class DragDropAvtDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
  ) {}
  @Input('appDragDropAvt') dataForDirective: IData;
  @Input('handleInDirective') handleInDirective: IHandle;
  @Output() showAlert = new EventEmitter<any>();
  @Output() handleSetUrl = new EventEmitter<any>();

  ngOnInit() {
    this.handleInDirective.inputFileElement.onSelect.emit = (event: any) => {
      this.handleDropFile(event);
    };
  }

  @HostListener('dragover', ['$event']) dragover(event: DragEvent) {
    event.preventDefault();
    this.elementRef.nativeElement.style.border =
      '2px solid var(--primary-color-main)';
    this.elementRef.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  @HostListener('dragleave') dragleave() {
    if (this.dataForDirective.url) {
      this.elementRef.nativeElement.style.border = '2px solid transparent';
    } else {
      this.elementRef.nativeElement.style.border = '2px dashed black';
    }
    this.elementRef.nativeElement.style.backgroundColor = 'unset';
  }

  @HostListener('drop', ['$event']) drop(event: any) {
    this.handleDropFile(event);
  }

  handleDropFile(event: any) {
    if (
      this.checkTypeImage(event.dataTransfer?.files[0]) ||
      (event.files && this.checkTypeImage(event.files[0]))
    ) {
      if (
        this.checkSizeImage(event.dataTransfer?.files[0]) ||
        (event.files && this.checkSizeImage(event.files[0]))
      ) {
        if (event instanceof DragEvent) {
          event.preventDefault();
          getControlCommon(this.handleInDirective.form, ...this.handleInDirective.controls)?.setValue(
            event.dataTransfer?.files[0]
          );
          this.handleSetUrl.emit(
            this.sanitize(
              URL.createObjectURL(event.dataTransfer?.files[0] as Blob)
            )
          );
        } else {
          if (this.checkTypeImage(event.files[0])) {
            getControlCommon(this.handleInDirective.form, ...this.handleInDirective.controls)?.setValue(
              event.files[0]
            );
            this.handleSetUrl.emit(
              this.sanitize(
                event.files[0].objectURL.changingThisBreaksApplicationSecurity
              )
            );
          }
        }
        this.showAlert.emit({
          severity: 'success',
          summary: 'Success',
          detail: 'Tải ảnh lên thành công',
        });
      } else {
        if (event instanceof DragEvent) {
          event.preventDefault();
        }
        this.showAlert.emit({
          severity: 'error',
          summary: 'Fail',
          detail: `The size of the Avt should not be more than ${this.dataForDirective.size}mb`,
        });
        this.handleOnDragEnd();
      }
      this.elementRef.nativeElement.style.border = '2px solid black';
    } else {
      if (event instanceof DragEvent) {
        event.preventDefault();
      }
      this.showAlert.emit({
        severity: 'error',
        summary: 'Fail',
        detail: 'Avt must be a png/jpg file',
      });
      this.handleOnDragEnd();
    }
    this.handleInDirective.inputFileElement.clear();
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  checkTypeImage(file: File | undefined): boolean {
    if (
      file?.type === 'image/jpeg' ||
      file?.type === 'image/jpg' ||
      file?.type === 'image/png'
    ) {
      return true;
    }
    return false;
  }

  checkSizeImage(file: File | undefined): boolean {
    if (
      file?.size &&
      Number((file?.size / (1024 * 1024)).toFixed(2)) < this.dataForDirective.size
    ) {
      return true;
    }
    return false;
  }

  handleOnDragEnter(event: any) {
    event.preventDefault();
    this.elementRef.nativeElement.style.border =
      '2px solid var(--primary-color-main)';
    this.elementRef.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  handleOnDragEnd() {
    if (this.dataForDirective.url) {
      this.elementRef.nativeElement.style.border = '2px solid transparent';
    } else {
      this.elementRef.nativeElement.style.border = '2px dashed black';
    }
    this.elementRef.nativeElement.style.backgroundColor = 'unset';
  }
}
