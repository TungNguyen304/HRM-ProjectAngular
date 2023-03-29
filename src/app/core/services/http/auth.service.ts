import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, delay, Observable } from 'rxjs';

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: ILogin): Observable<Object> {
    return this.http.post('auth/login', data).pipe(delay(3000));
  }
  getMyInfo():Observable<Object> {
    return this.http.get("auth/my-info").pipe(
      map((data:any) => {
        if(data.statusCode === 200) {
          return data.response
        }
      })
    )
  }

}
