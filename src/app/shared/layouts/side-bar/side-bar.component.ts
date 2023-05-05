import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ChooseLanguageService } from 'src/app/core/services/helper/chooseLanguage.service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/services/state/language.service';
import { ILanguage } from '../../interfaces';
type typeScreen = 'small' | 'medium' | 'large';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, AfterViewInit {
  public checked: boolean = false;
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('layer') layer: ElementRef;
  @ViewChildren('link') link: QueryList<any>;
  public lang: any;
  public typeScreen: typeScreen = 'large';
  public visible: boolean = false;
  public languages = [
    {
      name: 'English',
      value: 'en',
      image: 'england_flag.gif',
    },
    {
      name: 'Viet Nam',
      value: 'vi',
      image: 'vietnam_flag.gif',
    },
  ];
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ChooseLanguageService: ChooseLanguageService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageService.language$.subscribe((lang: ILanguage) => {
      this.languages.forEach((item) => {
        if (item.value === lang) {
          this.lang = item;
        }
      });
    });
  }

  displaySidebar(): void {
    this.handleDisplay();
  }

  handleChoseLanguage() {
    this.visible = true;
  }

  onChange(event: any) {
    this.ChooseLanguageService.handleChoseLanguage({
      name: event.value.value,
      image: event.value.image,
    });
    this.visible = false;
  }

  handleDisplay(): void {
    if (this.sidebar.nativeElement && this.layer.nativeElement) {
      if (this.typeScreen === 'small') {
        (this.sidebar.nativeElement as HTMLDivElement).style.left = '0%';
        (this.layer.nativeElement as HTMLDivElement).style.opacity = '1';
        (this.layer.nativeElement as HTMLDivElement).style.zIndex = '50';
      } else {
        this.sidebar.nativeElement.classList.toggle('close');
      }
    }
  }

  hidenSidebar(): void {
    if (this.sidebar.nativeElement && this.layer.nativeElement) {
      (this.sidebar.nativeElement as HTMLDivElement).style.left = '-100%';
      (this.layer.nativeElement as HTMLDivElement).style.opacity = '0';
      (this.layer.nativeElement as HTMLDivElement).style.zIndex = '-1';
    }
  }

  sidebarMobile(): void {
    if (this.sidebar.nativeElement && this.layer.nativeElement) {
      this.typeScreen = 'small';
      this.sidebar.nativeElement.classList.remove('close');
      (this.sidebar.nativeElement as HTMLDivElement).style.left = '-100%';
      (this.layer.nativeElement as HTMLDivElement).style.opacity = '0';
      (this.layer.nativeElement as HTMLDivElement).style.zIndex = '-1';
      this.cdr.detectChanges();
    }
  }

  handleResponsiveSidebar(): void {
    if (window.innerWidth <= 768) {
      this.sidebarMobile();
    }
    window.onresize = () => {
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        if (this.sidebar.nativeElement && this.layer.nativeElement) {
          this.typeScreen = 'medium';
          this.sidebar.nativeElement.classList.add('close');
          (this.sidebar.nativeElement as HTMLDivElement).style.left = '0%';
          (this.layer.nativeElement as HTMLDivElement).style.opacity = '0';
          (this.layer.nativeElement as HTMLDivElement).style.zIndex = '-1';
          this.displaySidebar = () => {
            this.handleDisplay();
          };
          this.cdr.detectChanges();
        }
      }
      if (window.innerWidth <= 768) {
        this.sidebarMobile();
      }
    };
  }

  ngAfterViewInit() {
    this.handleResponsiveSidebar();
    this.link.forEach((item) => {
      item.nativeElement.onclick = () => {
        if (this.typeScreen === 'small') {
          this.hidenSidebar();
        }
      };
    });
  }

  handleLogout(event: MouseEvent): void {
    event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }
}
