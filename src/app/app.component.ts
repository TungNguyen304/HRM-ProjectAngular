import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/state/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'HRM-Project';
  constructor(private translate: TranslateService, private languageService:LanguageService) {
    translate.setDefaultLang('en');
    translate.use('en');
    const language = JSON.parse(localStorage.getItem('language') as string);
    if (language) {
      languageService.setLanguage(language.name);
      translate.use(language.name);
    }
  }
}
