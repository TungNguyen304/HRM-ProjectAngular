import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-upload',
  templateUrl: './employee-upload.component.html',
  styleUrls: ['./employee-upload.component.scss'],
  providers: [MessageService]
})
export class EmployeeUploadComponent {
  @ViewChild('drop') drop: ElementRef;
  @ViewChild('upload') upload: ElementRef;
  public file: File | undefined;

  constructor(private messageService: MessageService) {
    
  }

  handleOnDragEnter(event:any) {
    event.preventDefault();
    this.drop.nativeElement.style.border = '2px solid var(--primary-color-main)';
    this.drop.nativeElement.style.backgroundColor = '#00b7ff1a';
  }

  handleOnDragEnd() {
    if (this.file) {
      this.drop.nativeElement.style.border = '2px solid transparent';
    } else {
      this.drop.nativeElement.style.border = '2px dashed var(--primary-color-main)';
    }
    this.drop.nativeElement.style.backgroundColor = 'unset';
  }

  checkTypeImage(file: File | undefined): boolean {
    if (
      file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return true;  
    }
    return false;
  }

  showAlert(noti: any): void {
    this.messageService.add({
      severity: noti.severity,
      summary: noti.summary,
      detail: noti.detail,
    });
  }

  handleOnDrop(event:any) {
    if (this.checkTypeImage(event.dataTransfer?.files[0]) || (event.target.files && this.checkTypeImage(event.target.files[0]))) {
      if (event instanceof DragEvent) {
        event.preventDefault();
        this.file = event?.dataTransfer?.files[0];
      } else {
        this.file = event.target.files[0];
      }
      this.showAlert({
        severity: 'success',
        summary: 'Success',
        detail: 'Tải file lên thành công',
      });
      this.drop.nativeElement.style.border = '2px solid var(--primary-color-main)';
    } else {
      if (event instanceof DragEvent) {
        event.preventDefault();
      }
      this.showAlert({
        severity: 'error',
        summary: 'Fail',
        detail: 'Loại File phải là ảnh xlsx hoặc xls',
      });
      this.handleOnDragEnd();
    }
    this.upload.nativeElement.value = "";
  }
}
