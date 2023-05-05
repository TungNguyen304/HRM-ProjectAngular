import { Injectable } from '@angular/core';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ToastService } from './toast.service';
import { ToastMsgService } from '../state/toastMsg.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toastService: ToastService,
    private toasMsgService: ToastMsgService
  ) {}
  public toast: any;
  start() {
    this.toasMsgService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }
  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  confirmDetele(value: string, acceptFunc: any) {
    this.confirmationService.confirm({
      message: `Do you want to delete <span class="actor_modal">${value}</span>`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        acceptFunc();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.toastService.toastError(this.toast.rejected);
            break;
          case ConfirmEventType.CANCEL:
            this.toastService.toastWarn(this.toast.cancelled);
            break;
        }
      },
    });
  }
}
