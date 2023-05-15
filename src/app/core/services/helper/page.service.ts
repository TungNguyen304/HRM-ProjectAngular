import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface IFilter {
  keyword?: string;
  gender?: string;
  unit?: string;
  position?: string;
  code?: string;
  employee?: string;
  type?: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private router: Router) {}
  setPageThenSearchOrPaginatorChange(
    page: number,
    limit: number,
    total: number,
    searchText: string,
    urlRoot: string
  ): number {
    if (page * limit > total) {
      const pageTemp = total / limit;
      if (total % limit > 0) {
        page = Math.floor(pageTemp) + 1;
      } else {
        page = Math.floor(pageTemp);
      }
      this.saveUrl(urlRoot, page, searchText);
      return page;
    }
    return page;
  }

  saveUrl = (
    urlRoot: string,
    page: number,
    searchText: string = '',
    filter?: IFilter
  ) => {
    let url = `${urlRoot}?page=${page}`;
    if (searchText) {
      url += `&search=${searchText}`;
    }
    filter &&
      Object.keys(filter).forEach((key) => {
        if (filter[key as keyof typeof filter]) {
          url += `&${key}=${filter[key as keyof typeof filter]}`;
        }
      });
    this.router.navigateByUrl(url);
  };
}
