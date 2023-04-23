import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AccountService } from 'src/app/core/services/state/account.service';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { IAccount, ILanguage } from '../../interfaces';
import { translateBreadcrumbEn, translateBreadcrumbVi } from './data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}
  
  public account: any;
  @Output() displaySidebar: EventEmitter<void> = new EventEmitter<void>();
  public checked: boolean = false;
  public languages = [
    {
      name: 'en',
      image: 'england_flag.gif',
    },
    {
      name: 'vi',
      image: 'vietnam_flag.gif',
    },
    {
      name: 'de',
      image: 'germany_flag.gif',
    },
    {
      name: 'cn',
      image: 'china_flag.gif',
    },
    {
      name: 'ca',
      image: 'canada_flag.gif',
    },
    {
      name: 'us',
      image: 'america_flag.gif',
    },
    {
      name: 'au',
      image: 'australia_flag.gif',
    },
  ];
  public flag: string =
    JSON.parse(localStorage.getItem('language') as string)?.image ||
    'england_flag.gif';
  @ViewChild('popupLanguage') popupLanguage: ElementRef;
  @ViewChild('country') country: ElementRef;

  ngOnInit() {
    
    this.accountService.account$.subscribe((data: any) => {
      this.account = data;
    });
  }

  

  display(): void {
    this.displaySidebar.emit();
  }

  

  displayPopupLanguage(): void {
    if (this.popupLanguage.nativeElement.style.display === 'grid') {
      this.popupLanguage.nativeElement.style.display = 'none';
    } else {
      this.popupLanguage.nativeElement.style.display = 'grid';
    }
  }
  

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
    this.country.nativeElement.src =
      '../../../../assets/images/' + language.image;
  }
}
