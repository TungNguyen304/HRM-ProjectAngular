import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/http/auth.service';
import { AccountService } from './core/services/state/account.service';
import { LanguageService } from './core/services/state/language.service';
import { LoadingService } from './core/services/state/loading.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from './core/services/helper/toast.service';
import { ModalService } from './core/services/helper/modal.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService, MessageService, ToastService, ModalService],
})
export class AppComponent implements OnInit {
  title: any = 'HRM-Project';
  public display$: Observable<boolean>;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private messageService: MessageService,
    private authService: AuthService,
    private accountService: AccountService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
    const language = JSON.parse(localStorage.getItem('language') as string);
    if (language) {
      this.languageService.setLanguage(language.name);
      this.translate.use(language.name);
    }
  }

  showAlert(noti: any): void {
    this.messageService.add({
      severity: noti.severity,
      summary: noti.summary,
      detail: noti.detail,
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.authService.getMyInfo().subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.accountService.setAccount(data.response);
          }
        },
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['auth/login']);
        }
      );
    }
    this.display$ = this.loadingService.loading$;
  }
}
