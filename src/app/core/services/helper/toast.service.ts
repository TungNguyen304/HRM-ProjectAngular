import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

const type = {
  'success': 'success',
  'error': 'error',
  'warn': 'warn',
  'info': 'info'
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) { }
  toastSuccess(summary:string, detail:string | Function) {
    this.messageService.add({
        severity: type.success,
        summary: summary,
        detail: detail  as string,
      });
  }

  toastError(summary:string, detail:string | Function) {
    this.messageService.add({
        severity: type.error,
        summary: summary,
        detail: detail  as string,
      });
  }

  toastWarn(summary:string, detail:string | Function) {
    this.messageService.add({
        severity: type.warn,
        summary: summary,
        detail: detail  as string,
      });
  }

  toastInfo(summary:string, detail:string | Function) {
    this.messageService.add({
        severity: type.info,
        summary: summary,
        detail: detail  as string,
      });
  }
}
