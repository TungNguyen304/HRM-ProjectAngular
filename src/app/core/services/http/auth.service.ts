import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: ILogin): Observable<object> {
    return this.http.post('auth/login', data).pipe(delay(3000));
  }
  getMyInfo(): Observable<object> {
    return this.http.get('auth/my-info');
  }
}
