import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/http/auth.service';
import { AccountService } from './core/services/state/account.service';
import { LanguageService } from './core/services/state/language.service';
import { LoadingService } from './core/services/state/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'HRM-Project';
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private authService: AuthService,
    private accountService: AccountService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    const language = JSON.parse(localStorage.getItem('language') as string);
    if (language) {
      languageService.setLanguage(language.name);
      translate.use(language.name);
    }
  }

  ngOnInit() {
    this.loadingService.loading$.subscribe((value) => {
      console.log(value);
      this.display = value;
    this.authService.getMyInfo().subscribe((data:any) => {
      this.accountService.setAccount(data);
    }, (err) => {
    })
  }
}
