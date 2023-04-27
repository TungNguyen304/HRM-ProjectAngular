import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/core/services/helper/toast.service';
import { ToastMsgService } from 'src/app/core/services/state/toastMsg.service';

@Component({
  selector: 'app-employee-upload',
  templateUrl: './employee-upload.component.html',
  styleUrls: ['./employee-upload.component.scss'],
})
export class EmployeeUploadComponent {
  @ViewChild('drop') drop: ElementRef;
  @ViewChild('upload') upload: ElementRef;
  public file: File | undefined;
  public toast: any;

  constructor(
    private toastService: ToastService,
    private toasMsgService: ToastMsgService
  ) {}

  ngOnInit() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }

  handleOnDragEnter(event: any) {
    event.preventDefault();
    this.drop.nativeElement.style.border =
      '2px solid var(--primary-color-main)';
    this.drop.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  handleOnDragEnd() {
    if (this.file) {
      this.drop.nativeElement.style.border = '2px solid transparent';
    } else {
      this.drop.nativeElement.style.border =
        '2px dashed var(--primary-color-main)';
    }
    this.drop.nativeElement.style.backgroundColor = 'unset';
  }

  checkTypeImage(file: File | undefined): boolean {
    if (
      file?.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return true;
    }
    return false;
  }

  handleOnDrop(event: any) {
    if (
      this.checkTypeImage(event.dataTransfer?.files[0]) ||
      (event.target.files && this.checkTypeImage(event.target.files[0]))
    ) {
      if (event instanceof DragEvent) {
        event.preventDefault();
        this.file = event?.dataTransfer?.files[0];
      } else {
        this.file = event.target.files[0];
      }
      this.toastService.toastSuccess(this.toast.uploadFileSuccess);
      this.drop.nativeElement.style.border =
        '2px solid var(--primary-color-main)';
    } else {
      if (event instanceof DragEvent) {
        event.preventDefault();
      }
      this.toastService.toastError(this.toast.uploadFileFail.summary);
      this.handleOnDragEnd();
    }
    this.upload.nativeElement.value = '';
  }
}
