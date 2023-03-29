import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccount } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

  public account$ = new BehaviorSubject<IAccount | null>(null)

  setAccount(account:any) {
    this.account$.next(account)
  }
}
