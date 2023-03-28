import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILanguage } from 'src/app/shared/interfaces/language';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public loading$ = new BehaviorSubject<boolean>(false);

  setloading(loading:boolean) {
    this.loading$.next(loading)
  }
}
