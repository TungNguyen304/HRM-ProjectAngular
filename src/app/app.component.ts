import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/http/auth.service';
import { AccountService } from './core/services/state/account.service';
import { LanguageService } from './core/services/state/language.service';
import { LoadingService } from './core/services/state/loading.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit {
  title:any = 'HRM-Project';
  public display$:Observable<boolean>;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private authService: AuthService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: Router
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
    if (localStorage.getItem('token')) {
      this.authService.getMyInfo().subscribe(
        (data: any) => {
          this.accountService.setAccount(data);
        },
        (err) => {
          localStorage.removeItem('token');
          this.router.navigate(['auth', 'login']);
        }
      );
    }
    this.display$ = this.loadingService.loading$
  }
}
