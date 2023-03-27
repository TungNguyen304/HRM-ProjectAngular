import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguage } from 'src/app/shared/interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  public language$ = new BehaviorSubject<any>('en')

  setLanguage(language:ILanguage) {
    this.language$.next(language)
  }
}
