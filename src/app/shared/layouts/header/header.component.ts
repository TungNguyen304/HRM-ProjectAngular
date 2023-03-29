import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { LanguageService } from 'src/app/core/services/state/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {}
  public items: MenuItem[];
  public home: MenuItem;
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
    this.items = [];
    console.log(this.router);
    this.handleBreadCrumb(this.router.url);
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.handleBreadCrumb(val.url);
      }
    });
    this.home = { icon: 'bi bi-house-fill', routerLink: '/team-member' };
  }

  transformBreadcrumb(val:string) {
    const newVal = val.split('-').map((item) => {
      return item[0].toUpperCase() + item.slice(1);
    })
    return newVal.join(' ');
  }

  handleBreadCrumb(val: string) {
    const [a, ...url] = val.split('/');
    console.log(url);
    // const newUrl = url.filter(item => item!=='employee' && item!=='estate')
    let urlTemp = '';
    this.items = url.map((item) => {
      urlTemp += `/${item}`;
      if(item === 'employee' || item === 'estate') {
        return {}
      }
      return {
        label: this.transformBreadcrumb(item),
        routerLink: urlTemp,
      };
    }).filter((item) => {
      return Object.keys(item).length > 0;

    });
  }
  displayPopupLanguage(): void {
    if (this.popupLanguage.nativeElement.style.display === 'grid') {
      this.popupLanguage.nativeElement.style.display = 'none';
    } else {
      this.popupLanguage.nativeElement.style.display = 'grid';
    }
  }
  display(): void {
    this.displaySidebar.emit();
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
