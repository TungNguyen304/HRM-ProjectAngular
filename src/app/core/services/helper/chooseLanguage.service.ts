import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../state/language.service';

@Injectable({
  providedIn: 'root',
})
export class ChooseLanguageService {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}
  handleChoseLanguage(language: any) {
    if (language.name === 'vi') {
      this.translate.use(language.name);
      localStorage.setItem(
        'language',
        JSON.stringify({
          name: language.name,
          image: 'vietnam_flag.gif',
        })
      );
      this.languageService.setLanguage(language.name);
    } else if (language.name === 'en') {
      this.translate.use(language.name);
      localStorage.setItem(
        'language',
        JSON.stringify({
          name: language.name,
          image: 'england_flag.gif',
        })
      );
      this.languageService.setLanguage(language.name);
    }
    return '../../../../assets/images/' + language.image;
  }
}
