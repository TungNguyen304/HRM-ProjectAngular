import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public member$ = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient) {}

  getMember(page:number, limit:number, keyword?:string):Observable<Object> {
    this.member$.next(`users/my-colleagues?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`)
    return this.member$.pipe(
      debounceTime(1500),
      switchMap((url) => this.http.get(url))
    )
  }

  
}
