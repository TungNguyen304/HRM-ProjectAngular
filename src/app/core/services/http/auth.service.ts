import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface ILogin {
    email: string,
    password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data:ILogin):Observable<Object> {
    return this.http.get("auth/login");
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