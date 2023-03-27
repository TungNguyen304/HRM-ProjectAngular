import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/state/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private translate:TranslateService, private languageService:LanguageService) {

  }
  @Output() displaySidebar: EventEmitter<void> = new EventEmitter<void>();
  public checked: boolean = false;
  public languages = [
    {
      name: 'en',
      image: 'england_flag.gif'
    },
    {
      name: 'vi',
      image: 'vietnam_flag.gif'
    },
    {
      name: 'de',
      image: 'germany_flag.gif'
    },
    {
      name: 'cn',
      image: 'china_flag.gif'
    },
    {
      name: 'ca',
      image: 'canada_flag.gif'
    },
    {
      name: 'us',
      image: 'america_flag.gif'
    },
    {
      name: 'au',
      image: 'australia_flag.gif'
    }
  ]
  public flag:string = JSON.parse(localStorage.getItem('language') as string)?.image || 'england_flag.gif';
  @ViewChild('popupLanguage') popupLanguage:ElementRef;
  @ViewChild('country') country:ElementRef;
  displayPopupLanguage():void {
    if(this.popupLanguage.nativeElement.style.display === 'grid') {
      this.popupLanguage.nativeElement.style.display = 'none'
    } else {
      this.popupLanguage.nativeElement.style.display = 'grid'
    }
  }
  display(): void {
    this.displaySidebar.emit();
  }

  handleChoseLanguage(language:any) {
    if(language.name === 'vi') {
      this.translate.use('vi');
      localStorage.setItem('language', JSON.stringify({
        name: 'vi',
        image: 'vietnam_flag.gif'
      }));
      this.languageService.setLanguage('vi')
    } else if(language.name === 'en') {
      this.translate.use('en');
      localStorage.setItem('language', JSON.stringify({
        name: 'en',
        image: 'england_flag.gif'
      }));
      this.languageService.setLanguage('en')
    }
    this.country.nativeElement.src = '../../../../assets/images/' + language.image;
  }
}
