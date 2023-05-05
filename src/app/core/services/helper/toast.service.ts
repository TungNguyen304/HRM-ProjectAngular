import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

const type = {
  success: 'success',
  error: 'error',
  warn: 'warn',
  info: 'info',
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  toastSuccess(key: any, params?: any) {
    this.messageService.add({
      severity: type.success,
      summary: key.summary,
      detail: params ? key.detail(params) : (key.detail as string),
    });
  }

  toastError(key: any, params?: any) {
    this.messageService.add({
      severity: type.error,
      summary: key.summary,
      detail: params ? key.detail(params) : key.detail,
    });
  }

  toastWarn(key: any) {
    this.messageService.add({
      severity: type.warn,
      summary: key.summary,
      detail: key.detail as string,
    });
  }

  toastInfo(key: any) {
    this.messageService.add({
      severity: type.info,
      summary: key.summary,
      detail: key.detail as string,
    });
  }
}
