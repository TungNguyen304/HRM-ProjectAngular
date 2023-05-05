import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  translateBreadcrumbEn,
  translateBreadcrumbVi,
} from '../shared/layouts/header/data';
import { ILanguage } from '../shared/interfaces';
import { LanguageService } from '../core/services/state/language.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public items: MenuItem[];
  public home: MenuItem;
  public language: ILanguage;
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.items = [];
    this.handleBreadCrumb(this.handleRemoveIdFromPath(this.router.url));
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.handleBreadCrumb(this.handleRemoveIdFromPath(val.url));
      }
    });
    this.languageService.language$.subscribe((data) => {
      this.language = data;
      this.handleBreadCrumb(this.handleRemoveIdFromPath(this.router.url));
    });
    this.home = { icon: 'bi bi-house-fill', routerLink: '/team-member' };
  }

  translateBreadcrumb(val: string): string {
    const newVal = val.split('-').map((item, index) => {
      if (index === 0) {
        return item;
      }
      return item[0].toUpperCase() + item.slice(1);
    });
    return newVal.join('');
  }

  handleRemoveIdFromPath(path: string): string {
    const listUrl = path.split('/');
    if (path.includes('detail-employee') || path.includes('detail-device')) {
      listUrl.pop();
    }
    return listUrl.join('/');
  }

  handleBreadCrumb(val: string) {
    const url = val.split('/');
    url.shift();
    let urlTemp = '';
    this.items = url
      ?.map((item) => {
        urlTemp += `/${item}`;
        return {
          label:
            this.language === 'en'
              ? translateBreadcrumbEn[
                  this.translateBreadcrumb(
                    item
                  ) as keyof typeof translateBreadcrumbEn
                ]
              : translateBreadcrumbVi[
                  this.translateBreadcrumb(
                    item
                  ) as keyof typeof translateBreadcrumbVi
                ],
          routerLink: urlTemp,
        };
      })
      .filter((item) => {
        return Object.keys(item).length > 0;
      });
  }
}
