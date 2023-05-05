import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public language$ = new BehaviorSubject<any>('en');
  public language = 'en';

  setLanguage(language: string) {
    this.language$.next(language);
    this.language = language;
  }
}
