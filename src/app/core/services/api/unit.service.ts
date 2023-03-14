import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  getUnit():Observable<Object> {
    return this.http.get("http://localhost:3000/units")
  }
}
