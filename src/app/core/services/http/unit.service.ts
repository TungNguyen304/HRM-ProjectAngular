import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  getUnit():Observable<Object> {
    return this.http.get("organization-units").pipe(
      delay(2000)
    )
  }

  getMemberByUnitId(id:string):Observable<Object> {
    return this.http.get(`organization-units/${id}/members`);
  }
}
