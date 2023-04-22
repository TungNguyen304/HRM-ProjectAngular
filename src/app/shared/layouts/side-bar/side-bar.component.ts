import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
type typeScreen = 'small' | 'medium' | 'large';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public checked: boolean = false;
  @ViewChild('sidebar') sidebar: ElementRef;
  @ViewChild('layer') layer: ElementRef;
  @ViewChildren('link') link: QueryList<any>;
  public typeScreen: typeScreen = 'large';
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  displaySidebar(): void {
    this.handleDisplay();
  }

  handleDisplay(): void {
    if (this.typeScreen === 'small') {
      (this.sidebar?.nativeElement as HTMLDivElement).style.left = '0%';
      (this.layer?.nativeElement as HTMLDivElement).style.opacity = '1';
      (this.layer?.nativeElement as HTMLDivElement).style.zIndex = '50';
    } else {
      this.sidebar?.nativeElement.classList.toggle('close');
    }
  }

  hidenSidebar(): void {
    (this.sidebar?.nativeElement as HTMLDivElement).style.left = '-100%';
    (this.layer?.nativeElement as HTMLDivElement).style.opacity = '0';
    (this.layer?.nativeElement as HTMLDivElement).style.zIndex = '-1';
  }

  sidebarMobile(): void {
    this.typeScreen = 'small';
    this.sidebar?.nativeElement.classList.remove('close');
    (this.sidebar?.nativeElement as HTMLDivElement).style.left = '-100%';
    (this.layer?.nativeElement as HTMLDivElement).style.opacity = '0';
    (this.layer?.nativeElement as HTMLDivElement).style.zIndex = '-1';
    this.cdr.detectChanges();
  }

  handleResponsiveSidebar(): void {
    if (window.innerWidth <= 768) {
      this.sidebarMobile();
    }
    window.onresize = (e) => {
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        this.typeScreen = 'medium';
        this.sidebar?.nativeElement.classList.add('close');
        (this.sidebar?.nativeElement as HTMLDivElement).style.left = '0%';
        (this.layer?.nativeElement as HTMLDivElement).style.opacity = '0';
        (this.layer?.nativeElement as HTMLDivElement).style.zIndex = '-1';
        this.displaySidebar = () => {
          this.handleDisplay();
        };
        this.cdr.detectChanges();
      }
      if (window.innerWidth <= 768) {
        this.sidebarMobile();
      }
    };
  }

  ngOnInit() {
    const body = document.querySelector('body'),
      sidebar = body?.querySelector('nav'),
      toggle = body?.querySelector('.toggle'),
      searchBtn = body?.querySelector('.search-box'),
      modeSwitch = body?.querySelector('.toggle-switch'),
      modeText = body?.querySelector('.mode-text'),
      circle = body?.querySelector('.switch .circle');
    toggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('close');
    });

    searchBtn?.addEventListener('click', () => {
      sidebar?.classList.remove('close');
    });
    modeSwitch?.addEventListener('click', () => {
      body?.classList.toggle('dark');
      if (body?.classList.contains('dark')) {
        (circle as HTMLSpanElement).style.left = 'unset';
        (circle as HTMLSpanElement).style.right = '5px';
        (modeText as HTMLSpanElement).innerText = 'Light mode';
      } else {
        (circle as HTMLSpanElement).style.left = '5px';
        (circle as HTMLSpanElement).style.right = 'unset';
        (modeText as HTMLSpanElement).innerText = 'Dark mode';
      }
    });
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
