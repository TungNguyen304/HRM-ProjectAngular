import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  constructor(private http: HttpClient) { }

  getEvaluate():Observable<Object> {
    return this.http.get("evaluate");
  }
}