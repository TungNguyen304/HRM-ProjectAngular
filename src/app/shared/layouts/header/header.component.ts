import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ChooseLanguageService } from 'src/app/core/services/helper/chooseLanguage.service';
import { LanguageService } from 'src/app/core/services/state/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private chooseLanguageService: ChooseLanguageService,
    private languageService: LanguageService
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
  @ViewChild('country', { static: true }) country: ElementRef;

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => {
      this.languages.forEach((item) => {
        if (item.name === lang) {
          this.country.nativeElement.src =
            '../../../../assets/images/' + item.image;
        }
      });
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
    this.country.nativeElement.src =
      this.chooseLanguageService.handleChoseLanguage(language);
  }
}
