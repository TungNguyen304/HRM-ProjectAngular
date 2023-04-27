import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { ILanguage } from 'src/app/shared/interfaces';
import { toastEn, toastVi } from 'src/app/shared/toastMessage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastMsgService {
  public toast$ = new BehaviorSubject<any>(toastEn);
  setToast(lang: ILanguage) {
    switch (lang) {
      case 'vi': {
        this.toast$.next(toastVi);
        break;
      }
      case 'en': {
        this.toast$.next(toastEn);
        break;
      }
      default:
        break;
    }
  }
}
