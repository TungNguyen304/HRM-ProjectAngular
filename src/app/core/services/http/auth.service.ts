import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ILogin {
    email: string,
    password: string
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  login(data:ILogin):Observable<Object> {
    return this.http.get("auth/login");
  }

}