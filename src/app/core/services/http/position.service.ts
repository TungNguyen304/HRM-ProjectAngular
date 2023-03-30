import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosition } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getPosition(page:number, limit:number):Observable<Object> {
    return this.http.get(`job-positions?page=${page}&limit=${limit}`)
  }

  addPosition(data:IPosition):Observable<Object> {
    return this.http.post(`job-positions`, data);
  }

  updatePosition(data:IPosition, id:string):Observable<Object> {
    return this.http.patch(`job-positions/${id}`, data);
  }

  deletePosition(id:string[]):Observable<Object> {
    return this.http.post('job-positions/delete', {
      ids: id
    })
  }
}
