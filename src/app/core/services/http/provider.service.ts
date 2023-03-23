import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getProvider():Observable<Object> {
    return this.http.get("provider")
  }

  getProviderById(id:number):Observable<Object> {
    return this.http.get(`provider/${id}`)
  }
}
