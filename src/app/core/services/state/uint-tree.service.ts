import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  of,
  startWith,
  switchAll,
  switchMap,
} from 'rxjs';
import { handleFormatDataUnitTreeSelect } from '../helper/unit.service';

@Injectable({
  providedIn: 'root',
})
export class UnitTreeService {
  constructor(private http: HttpClient) {}
  public unitTree$ = new BehaviorSubject<any>(null);
  getUnitTreeByUnitId() {
    of('')
      .pipe(
        startWith('organization-units'),
        switchMap((url) => {
          return this.http.get(url);
        })
      )
      .subscribe((data: any) => {
        this.unitTree$.next(handleFormatDataUnitTreeSelect(data.response.data));
      });

    // way2 higher order observable
    // of(this.http.get('organization-units'))
    //   .pipe(switchAll())
    //   .subscribe((data: any) => {
    //     this.unitTree$.next(handleFormatDataUnitTreeSelect(data.response.data));
    //   });
  }
}
