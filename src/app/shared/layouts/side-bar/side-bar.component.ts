import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public checked:boolean = false;
  @ViewChild('sidebar') sidebar:ElementRef;
  constructor(private translate: TranslateService, private router:Router) {}
  displaySidebar():void {
    this.sidebar.nativeElement.classList.toggle('close');
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

  handleLogout(event:MouseEvent):void {
    event.preventDefault();
    localStorage.removeItem('token')
    this.router.navigate(['auth', 'login'])
  }
}
